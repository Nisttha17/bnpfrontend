import React from 'react';
import { FileText, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { MetricSummary } from '../types';

interface SummaryCardsProps {
  metrics: MetricSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Change Requests */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-100 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Change Requests</p>
            <h3 className="text-2xl font-bold text-[#0c1538] mt-0.5">
              {metrics.totalChangeRequests.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>↑</span>
              <span>{metrics.totalChangeRequestsTrend}</span>
            </p>
          </div>
        </div>

        {/* Blue Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 40" fill="none" className="w-full h-full">
            <path
              d="M2,30 C20,32 30,12 45,22 C60,32 68,14 78,8"
              stroke="#3b82f6"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M2,30 C20,32 30,12 45,22 C60,32 68,14 78,8 L78,40 L2,40 Z"
              fill="url(#blue-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. Conflicts Detected */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-100 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Conflicts Detected</p>
            <h3 className="text-2xl font-bold text-[#0c1538] mt-0.5">
              {metrics.conflictsDetected.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>↑</span>
              <span>{metrics.conflictsTrend}</span>
            </p>
          </div>
        </div>

        {/* Red Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 40" fill="none" className="w-full h-full">
            <path
              d="M2,34 C18,36 30,22 46,26 C58,30 68,12 78,10"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M2,34 C18,36 30,22 46,26 C58,30 68,12 78,10 L78,40 L2,40 Z"
              fill="url(#red-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="red-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 3. Needs Human Review */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-100 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Needs Human Review</p>
            <h3 className="text-2xl font-bold text-[#0c1538] mt-0.5">
              {metrics.needsHumanReview.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>↓</span>
              <span>{metrics.reviewTrend}</span>
            </p>
          </div>
        </div>

        {/* Amber Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 40" fill="none" className="w-full h-full">
            <path
              d="M2,36 C18,34 34,28 50,32 C62,34 68,14 78,10"
              stroke="#f59e0b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M2,36 C18,34 34,28 50,32 C62,34 68,14 78,10 L78,40 L2,40 Z"
              fill="url(#amber-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="amber-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 4. Regulations Checked */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-100 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Regulations Checked</p>
            <h3 className="text-2xl font-bold text-[#0c1538] mt-0.5">
              {metrics.regulationsChecked.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span>↑</span>
              <span>{metrics.regulationsTrend}</span>
            </p>
          </div>
        </div>

        {/* Emerald Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 40" fill="none" className="w-full h-full">
            <path
              d="M2,32 C20,34 32,18 48,24 C62,28 66,16 78,8"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M2,32 C20,34 32,18 48,24 C62,28 66,16 78,8 L78,40 L2,40 Z"
              fill="url(#green-gradient)"
              opacity="0.15"
            />
            <defs>
              <linearGradient id="green-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
