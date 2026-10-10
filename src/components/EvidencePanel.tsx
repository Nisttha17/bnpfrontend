import React from 'react';
import {
  FileText,
  X,
  ExternalLink,
  CheckCircle2,
  FileCode,
} from 'lucide-react';
import { ChangeRequest } from '../types';

interface EvidencePanelProps {
  request: ChangeRequest;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onOpenPdf: (docName: string, page: number) => void;
  onClose?: () => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  request,
  onApprove,
  onReject,
  onOpenPdf,
  onClose,
}) => {
  const isApproved = request.status === 'Completed';
  const isRejected = request.status === 'Rejected';

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#0c1538]">
              Evidence & Recommendations
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Source Document Card */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Red PDF Icon badge */}
            <div className="w-7 h-8 bg-red-500 rounded-xs flex flex-col items-center justify-center text-white shrink-0 shadow-2xs">
              <FileCode className="w-3.5 h-3.5" />
              <span className="text-[7px] font-extrabold uppercase tracking-wider -mt-0.5">pdf</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Source Document</p>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {request.sourceDoc || 'ESMA Guidelines – Article 12.3'}
              </p>
              <button
                onClick={() =>
                  onOpenPdf(
                    request.sourceDoc || 'ESMA Guidelines – Article 12.3',
                    request.page || 24
                  )
                }
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-0.5 cursor-pointer hover:underline"
              >
                <span>View PDF</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-500">Page</p>
            <p className="text-xs font-bold text-slate-800">{request.page || 24}</p>
          </div>
        </div>

        {/* Relevant Clause */}
        <div className="mb-4.5">
          <h3 className="text-xs font-bold text-slate-800 mb-1.5 tracking-tight">
            Relevant Clause
          </h3>
          <div className="bg-blue-50/60 border border-blue-100/70 rounded-lg p-3 text-xs text-slate-700 italic leading-relaxed">
            {request.relevantClause ||
              '“The trading venue shall ensure accurate ... timestamp of each trade lifecycle event.”'}
          </div>
        </div>

        {/* Impact Explanation */}
        <div className="mb-4.5">
          <h3 className="text-xs font-bold text-slate-800 mb-1.5 tracking-tight">
            Impact Explanation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {request.impactExplanation ||
              'The proposed change to event timestamp field aligns with the requirement. No conflict detected.'}
          </p>
        </div>

        {/* Recommendation Box */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3 flex items-start gap-2.5 mb-6">
          <div className="text-emerald-600 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-800">Recommendation</h4>
            <p className="text-xs text-emerald-700 font-normal mt-0.5">
              {request.recommendation || 'Proceed with the change.'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprove(request.id)}
            disabled={isApproved}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] text-center ${
              isApproved
                ? 'bg-emerald-700 text-white cursor-default'
                : 'bg-[#0b1b4f] hover:bg-[#14296c] text-white'
            }`}
          >
            {isApproved ? '✓ Approved' : 'Approve'}
          </button>
          <button
            onClick={() => onReject(request.id)}
            disabled={isRejected}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border transition-all cursor-pointer active:scale-[0.98] text-center ${
              isRejected
                ? 'bg-red-50 text-red-700 border-red-300 cursor-default'
                : 'border-[#0b1b4f] text-[#0b1b4f] hover:bg-slate-50'
            }`}
          >
            {isRejected ? 'Declined' : 'Do Not Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};
