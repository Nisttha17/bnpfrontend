import React from 'react';
import { Plus, Bell } from 'lucide-react';

interface HeaderProps {
  onRunAssessment: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onToggleUserMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRunAssessment,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold text-[#091438] tracking-tight">
          Welcome back, Analyst!
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track and analyse regulatory impact for proposed changes.
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Run Assessment Button */}
        <button
          onClick={onRunAssessment}
          className="bg-[#0b1b4f] hover:bg-[#14296c] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Run Assessment</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="relative p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* User Avatar Initials */}
        <div
          title="Analyst: N. Mishra (Compliance)"
          className="w-9 h-9 rounded-full bg-[#bfdbfe] text-[#1e3a8a] font-semibold text-xs flex items-center justify-center border border-blue-200 shadow-xs cursor-pointer select-none hover:ring-2 hover:ring-blue-300 transition-all"
        >
          NM
        </div>
      </div>
    </header>
  );
};
