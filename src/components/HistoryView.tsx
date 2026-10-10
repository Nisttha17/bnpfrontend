import React from 'react';
import { History, ShieldCheck, ArrowLeft, Filter, Download } from 'lucide-react';
import { AssessmentItem } from '../types';

interface HistoryViewProps {
  assessments: AssessmentItem[];
  onBackToDashboard: () => void;
  onSelectRequest: (requestId: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  assessments,
  onBackToDashboard,
  onSelectRequest,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#091438] tracking-tight">
              Regulatory Audit History
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Immutable ledger of change request assessments, approvals, and jurisdictional parity checks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Exporting full audit trail as CSV...')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Audit Log Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-[#0c1538]">Historical Ledger</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {assessments.length} assessment runs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-700 font-semibold bg-slate-50/50">
                <th className="py-3 px-5">Assessment ID</th>
                <th className="py-3 px-5">Date & Time</th>
                <th className="py-3 px-5">Target Request</th>
                <th className="py-3 px-5">Final Status</th>
                <th className="py-3 px-5">Finding Summary</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-slate-500">{a.id}</td>
                  <td className="py-3.5 px-5 text-slate-700">{a.dateTime}</td>
                  <td className="py-3.5 px-5 font-bold text-[#0c1538]">{a.requestId}</td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-medium text-xs ${
                        a.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : a.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700">{a.summary}</td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => {
                        onSelectRequest(a.requestId);
                        onBackToDashboard();
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Inspect in Matrix →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
