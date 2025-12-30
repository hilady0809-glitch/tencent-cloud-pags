import React from 'react';
import { Menu, Search, Bell, ChevronRight } from 'lucide-react';

interface TopNavProps {
  toggleSidebar: () => void;
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
}

export const TopNav: React.FC<TopNavProps> = ({ toggleSidebar, courseTitle, moduleTitle, lessonTitle }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          <Menu size={20} />
        </button>
        
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center text-sm text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="hover:text-slate-900 cursor-pointer transition-colors">课程中心</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className="hover:text-slate-900 cursor-pointer transition-colors truncate max-w-[150px]">{courseTitle}</span>
          <ChevronRight size={14} className="mx-2 shrink-0" />
          <span className="text-slate-900 font-medium truncate">{lessonTitle}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
                type="text" 
                placeholder="搜索课程内容..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border rounded-full text-sm w-64 transition-all"
            />
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-1 rounded-full border border-slate-200 ml-2">
            <img src="https://picsum.photos/40/40" alt="User" className="w-8 h-8 rounded-full" />
        </button>
      </div>
    </header>
  );
};