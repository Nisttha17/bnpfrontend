import React from 'react';
import {
  Home,
  FileText,
  LayoutGrid,
  History,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'requests', label: 'Change Requests', icon: FileText },
    { id: 'matrix', label: 'Impact Matrix', icon: LayoutGrid },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <aside className="w-64 bg-[#0a122e] text-white flex flex-col justify-between shrink-0 relative overflow-hidden min-h-screen border-r border-[#15224d] select-none">
      {/* Decorative Wave Lines in Background (Lower section) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-35 h-96 overflow-hidden">
        <svg
          viewBox="0 0 300 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover text-blue-500"
        >
          <path
            d="M-50,220 C40,160 120,290 220,200 C270,160 300,240 350,190"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <path
            d="M-40,240 C50,180 130,310 230,220 C280,180 310,260 360,210"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <path
            d="M-30,260 C60,200 140,330 240,240 C290,200 320,280 370,230"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <path
            d="M-20,280 C70,220 150,350 250,260 C300,220 330,300 380,250"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <path
            d="M-10,300 C80,240 160,370 260,280 C310,240 340,320 390,270"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <path
            d="M0,320 C90,260 170,390 270,300 C320,260 350,340 400,290"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </div>

      {/* Top Header & Navigation */}
      <div className="p-6 relative z-10">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-2">
          {/* Hexagonal Shield Logo Icon */}
          <div className="w-8 h-9 text-blue-400 shrink-0">
            <svg viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M16 2L30 8.5V20C30 28 16 34 16 34C16 34 2 28 2 20V8.5L16 2Z"
                stroke="#60a5fa"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M16 7L24 11.5V19C24 24 16 28 16 28C16 28 8 24 8 19V11.5L16 7Z"
                stroke="#93c5fd"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M16 12L20 15V18.5C20 21 16 23.5 16 23.5C16 23.5 12 21 12 18.5V15L16 12Z"
                fill="#3b82f6"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider text-white">IMPART</span>
        </div>

        <p className="text-[12px] leading-tight text-[#8ba2cb] mb-8 font-normal">
          Regulatory Intelligence<br />Platform
        </p>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#1a2958] text-white shadow-sm font-semibold'
                    : 'text-[#8ba2cb] hover:text-white hover:bg-[#131f45]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#8ba2cb]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom AI-Assisted Analysis Card */}
      <div className="p-5 relative z-10">
        <div className="bg-[#121f45]/90 border border-blue-900/40 rounded-xl p-3.5 backdrop-blur-xs text-left shadow-lg">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-200 leading-snug font-normal">
              AI-assisted analysis with human oversight.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
