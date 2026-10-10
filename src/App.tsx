/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { ChangeRequestsTable } from './components/ChangeRequestsTable';
import { ImpactMatrix } from './components/ImpactMatrix';
import { RecentAssessments } from './components/RecentAssessments';
import { EvidencePanel } from './components/EvidencePanel';
import { NewRequestModal } from './components/NewRequestModal';
import { RunAssessmentModal } from './components/RunAssessmentModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { HistoryView } from './components/HistoryView';
import {
  initialMetrics,
  initialChangeRequests,
  initialAssessments,
  mockNotifications,
  REGULATIONS,
} from './data/mockData';
import { ChangeRequest, MetricSummary, AssessmentItem, Regulation } from './types';
import { Menu, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Data States
  const [metrics, setMetrics] = useState<MetricSummary>(initialMetrics);
  const [requests, setRequests] = useState<ChangeRequest[]>(initialChangeRequests);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(initialAssessments);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Minimal CR Selection & Active Violation States (Initial state: no CR selected)
  const [selectedCrId, setSelectedCrId] = useState<string | null>(null);
  const [activeViolation, setActiveViolation] = useState<Regulation | null>(null);
  const [isPanelDismissed, setIsPanelDismissed] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals States
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [pdfDocData, setPdfDocData] = useState<{ title: string; page: number }>({
    title: 'ESMA RTS 22 / EMIR Refit – Article 9.1',
    page: 24,
  });

  // Action Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Derive selected CR object
  const selectedCr = useMemo(() => {
    if (!selectedCrId) return null;
    return requests.find((r) => r.id === selectedCrId) || null;
  }, [requests, selectedCrId]);

  // Derive violations for selected CR (cells whose status is "NO")
  const violations = useMemo<Regulation[]>(() => {
    if (!selectedCr || !selectedCr.regulatoryImpacts) return [];
    return REGULATIONS.filter((reg) => selectedCr.regulatoryImpacts?.[reg] === 'NO');
  }, [selectedCr]);

  // Derive whether Evidence panel should be rendered
  const showPanel = Boolean(selectedCr && violations.length > 0 && !isPanelDismissed);

  // Derive effective active violation regulation (defaults to first violated regulation)
  const effectiveActiveViolation: Regulation = useMemo(() => {
    if (activeViolation && violations.includes(activeViolation)) {
      return activeViolation;
    }
    return violations[0] || 'EMIR';
  }, [activeViolation, violations]);

  // Filter requests based on search
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      return (
        r.srNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [requests, searchTerm]);

  // Handler: Selecting a Change Request row
  const handleSelectRequest = (request: ChangeRequest) => {
    setSelectedCrId(request.id);
    setIsPanelDismissed(false);

    // Reset active violation to this CR's first violated regulation
    const reqViolations = REGULATIONS.filter(
      (reg) => request.regulatoryImpacts?.[reg] === 'NO'
    );
    setActiveViolation(reqViolations[0] || null);
  };

  // Handler: Clicking a red (NO) cell in a row
  const handleSelectViolationCell = (request: ChangeRequest, regulation: Regulation) => {
    setSelectedCrId(request.id);
    setIsPanelDismissed(false);
    setActiveViolation(regulation);
  };

  // Handler: Approve Request
  const handleApproveRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'Completed',
              recommendation: 'Analyst override recorded. Implementation proceeding.',
            }
          : r
      )
    );

    setAssessments((prev) => [
      {
        id: `ASM-${Math.floor(100 + Math.random() * 900)}`,
        dateTime: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        requestId: reqId,
        status: 'Completed',
        summary: 'Analyst manual override recorded.',
      },
      ...prev,
    ]);

    setMetrics((prev) => ({
      ...prev,
      needsHumanReview: Math.max(0, prev.needsHumanReview - 1),
    }));

    showToast(`✓ Request ${reqId} has been manually approved.`);
  };

  // Handler: Reject / Do Not Proceed
  const handleRejectRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'Needs Review',
              recommendation: 'Do Not Proceed: Violations flagged across target regulations.',
            }
          : r
      )
    );

    showToast(`Status updated: ${reqId} marked as Do Not Proceed.`);
  };

  // Handler: Add New Request
  const handleAddRequest = (newReq: ChangeRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setSelectedCrId(newReq.id);
    setIsPanelDismissed(false);

    const reqViolations = REGULATIONS.filter(
      (reg) => newReq.regulatoryImpacts?.[reg] === 'NO'
    );
    setActiveViolation(reqViolations[0] || null);

    setMetrics((prev) => ({
      ...prev,
      totalChangeRequests: prev.totalChangeRequests + 1,
      needsHumanReview: prev.needsHumanReview + 1,
    }));
    showToast(`New change request ${newReq.id} created and evaluated.`);
  };

  // Handler: Run Assessment Complete
  const handleAssessmentComplete = (reqId: string) => {
    setAssessments((prev) => [
      {
        id: `ASM-${Math.floor(200 + Math.random() * 800)}`,
        dateTime: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        requestId: reqId,
        status: 'Needs Review',
        summary: 'Automated 5-regime scan completed. Heatmap violations mapped.',
      },
      ...prev,
    ]);

    setMetrics((prev) => ({
      ...prev,
      regulationsChecked: prev.regulationsChecked + 1,
    }));

    showToast(`Regulatory scan completed for ${reqId}. Heatmap updated.`);
  };

  // Open PDF Modal
  const handleOpenPdf = (title: string, page: number) => {
    setPdfDocData({ title, page });
    setIsPdfModalOpen(true);
  };

  const nextReqId = `CR-${(requests.length + 1).toString().padStart(3, '0')}`;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 flex flex-col md:flex-row antialiased font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#0a122e] text-white px-4 py-3 flex items-center justify-between border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 text-blue-400">
            <svg viewBox="0 0 32 36" fill="none" className="w-full h-full">
              <path
                d="M16 2L30 8.5V20C30 28 16 34 16 34C16 34 2 28 2 20V8.5L16 2Z"
                stroke="#60a5fa"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wider">IMPART</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg bg-blue-900/50 text-slate-200 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 md:static md:block transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
        />
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-7">
          {/* Main Top Header */}
          <Header
            onRunAssessment={() => setIsAssessmentModalOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadCount={unreadCount}
          />

          {/* Conditional Views based on Sidebar Selection */}
          {activeTab === 'history' ? (
            <HistoryView
              assessments={assessments}
              onBackToDashboard={() => setActiveTab('dashboard')}
              onSelectRequest={(reqId) => {
                const found = requests.find((r) => r.id === reqId);
                if (found) handleSelectRequest(found);
                setActiveTab('dashboard');
              }}
            />
          ) : activeTab === 'matrix' ? (
            /* Dedicated Full-Width Regulatory Impact Heatmap View */
            <div className="space-y-6 animate-fadeIn">
              <ImpactMatrix
                requests={requests}
                selectedRequestId={selectedCrId}
                activeViolation={effectiveActiveViolation}
                onSelectRequest={handleSelectRequest}
                onSelectViolationCell={handleSelectViolationCell}
              />
              {/* Evidence Panel below if there are violations */}
              {showPanel && selectedCr && (
                <div className="max-w-2xl">
                  <EvidencePanel
                    request={selectedCr}
                    violations={violations}
                    activeViolation={effectiveActiveViolation}
                    onSelectViolation={(reg) => setActiveViolation(reg)}
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                    onOpenPdf={handleOpenPdf}
                    onClose={() => setIsPanelDismissed(true)}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              {/* 1. Summary Metric Cards Row */}
              <SummaryCards metrics={metrics} />

              {/* 2. Change Requests Table */}
              <ChangeRequestsTable
                requests={filteredRequests}
                selectedRequestId={selectedCrId}
                onSelectRequest={handleSelectRequest}
                onOpenNewModal={() => setIsNewModalOpen(true)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              {/* 3. Bottom Section: Regulatory Impact Heatmap + Recent Assessments + Evidence Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (dynamically full-width if panel not shown) */}
                <div
                  className={`${
                    showPanel ? 'lg:col-span-8' : 'lg:col-span-12'
                  } space-y-6`}
                >
                  {/* Regulatory Impact Heatmap */}
                  <ImpactMatrix
                    requests={requests}
                    selectedRequestId={selectedCrId}
                    activeViolation={effectiveActiveViolation}
                    onSelectRequest={handleSelectRequest}
                    onSelectViolationCell={handleSelectViolationCell}
                  />

                  {/* Recent Assessments */}
                  <RecentAssessments
                    assessments={assessments}
                    onSelectRequestId={(reqId) => {
                      const req = requests.find((r) => r.id === reqId);
                      if (req) handleSelectRequest(req);
                    }}
                    onViewAll={() => setActiveTab('history')}
                  />
                </div>

                {/* Right Column: Evidence & Recommendations Panel (rendered ONLY when showPanel is true) */}
                {showPanel && selectedCr && (
                  <div className="lg:col-span-4 h-full sticky top-4">
                    <EvidencePanel
                      request={selectedCr}
                      violations={violations}
                      activeViolation={effectiveActiveViolation}
                      onSelectViolation={(reg) => setActiveViolation(reg)}
                      onApprove={handleApproveRequest}
                      onReject={handleRejectRequest}
                      onOpenPdf={handleOpenPdf}
                      onClose={() => setIsPanelDismissed(true)}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Interactive Modals */}
      <NewRequestModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleAddRequest}
        nextId={nextReqId}
      />

      <RunAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        selectedRequest={selectedCr || requests[0]}
        onAssessmentComplete={handleAssessmentComplete}
      />

      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        docTitle={pdfDocData.title}
        pageNumber={pdfDocData.page}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
        }
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1538] text-white px-4 py-3 rounded-xl shadow-xl border border-blue-900/60 flex items-center gap-3 animate-slideUp text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
