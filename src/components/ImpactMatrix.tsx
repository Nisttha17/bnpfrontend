import React, { useState } from 'react';
import { LayoutGrid, Info } from 'lucide-react';
import { ComplianceStatus, JurisdictionMatrixRow } from '../types';

interface ImpactMatrixProps {
  rows: JurisdictionMatrixRow[];
  selectedRequestSrNo: string;
}

export const ImpactMatrix: React.FC<ImpactMatrixProps> = ({
  rows,
  selectedRequestSrNo,
}) => {
  const [activeCellInfo, setActiveCellInfo] = useState<{
    jurisdiction: string;
    regulation: string;
    status: ComplianceStatus;
  } | null>(null);

  const renderBadge = (status: ComplianceStatus, jurisdiction: string, regulation: string) => {
    let classes = '';
    let label = status;

    switch (status) {
      case 'Conflict':
        classes = 'bg-red-100 text-red-700 border-red-200';
        break;
      case 'Review':
        classes = 'bg-amber-100 text-amber-700 border-amber-200';
        break;
      case 'Clear':
        classes = 'bg-emerald-100 text-emerald-700 border-emerald-200';
        break;
    }

    return (
      <button
        onClick={() => setActiveCellInfo({ jurisdiction, regulation, status })}
        className={`w-full py-1.5 px-2 rounded-md font-medium text-xs text-center transition-all hover:scale-[1.02] cursor-pointer ${classes}`}
        title={`Click to inspect ${jurisdiction} - ${regulation} (${status})`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs mb-6 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0c1538]">
              Regulatory Impact Matrix
            </h2>
            <p className="text-xs text-slate-500">
              View compliance status across jurisdictions for the selected change request ({selectedRequestSrNo}).
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Conflict</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Needs Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Clear</span>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto p-2 sm:p-4">
        <table className="w-full text-left border-separate border-spacing-2">
          <thead>
            <tr className="text-xs font-semibold text-slate-800">
              <th className="py-2 px-3 text-slate-800 font-bold w-28">Jurisdiction</th>
              <th className="py-2 px-2 text-center font-bold">MiFID II</th>
              <th className="py-2 px-2 text-center font-bold">EMIR</th>
              <th className="py-2 px-2 text-center font-bold">SFTR</th>
              <th className="py-2 px-2 text-center font-bold">Dodd-Frank</th>
              <th className="py-2 px-2 text-center font-bold">UK FCA</th>
              <th className="py-2 px-2 text-center font-bold">MAS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.jurisdiction}>
                <td className="py-2 px-3 text-xs font-semibold text-[#0c1538]">
                  {row.jurisdiction}
                </td>
                <td className="p-1">
                  {renderBadge(row.mifid, row.jurisdiction, 'MiFID II')}
                </td>
                <td className="p-1">
                  {renderBadge(row.emir, row.jurisdiction, 'EMIR')}
                </td>
                <td className="p-1">
                  {renderBadge(row.sftr, row.jurisdiction, 'SFTR')}
                </td>
                <td className="p-1">
                  {renderBadge(row.doddFrank, row.jurisdiction, 'Dodd-Frank')}
                </td>
                <td className="p-1">
                  {renderBadge(row.ukFca, row.jurisdiction, 'UK FCA')}
                </td>
                <td className="p-1">
                  {renderBadge(row.mas, row.jurisdiction, 'MAS')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Cell Inspector Banner (When Analyst Clicks a Cell) */}
      {activeCellInfo && (
        <div className="mx-4 mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-700">
              <strong>{activeCellInfo.jurisdiction} · {activeCellInfo.regulation}</strong> evaluated as{' '}
              <span className={`font-semibold ${
                activeCellInfo.status === 'Conflict'
                  ? 'text-red-600'
                  : activeCellInfo.status === 'Review'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}>
                {activeCellInfo.status}
              </span>{' '}
              under cross-border rule parity algorithms.
            </span>
          </div>
          <button
            onClick={() => setActiveCellInfo(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-0.5"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
