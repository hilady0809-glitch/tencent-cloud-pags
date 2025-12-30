import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, PlayCircle, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface SidebarProps {
  course: Course;
  currentLessonId: string;
  completedLessons: Set<string>;
  onSelectLesson: (lessonId: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  course, 
  currentLessonId, 
  completedLessons, 
  onSelectLesson,
  isOpen
}) => {
  // Calculate total progress
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  // State to track expanded modules (default all open)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(course.modules.map(m => m.id))
  );

  const toggleModule = (moduleId: string) => {
    const next = new Set(expandedModules);
    if (next.has(moduleId)) {
      next.delete(moduleId);
    } else {
      next.add(moduleId);
    }
    setExpandedModules(next);
  };

  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 transition-all duration-300 shadow-sm z-20">
      {/* Course Header in Sidebar */}
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">课程目录</h2>
        <div className="flex justify-between items-end mb-1">
          <span className="text-2xl font-bold text-slate-800">{progressPercentage}%</span>
          <span className="text-xs text-slate-500 mb-1">{completedCount}/{totalLessons} 已完成</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
        {course.modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          // Check if all lessons in module are complete
          const isModuleComplete = module.lessons.every(l => completedLessons.has(l.id));

          return (
            <div key={module.id} className="select-none">
              <button 
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded text-slate-400 group-hover:text-blue-600 transition-colors`}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <span className="font-semibold text-slate-700 text-sm text-left">{module.title}</span>
                </div>
                {isModuleComplete && <CheckCircle2 size={16} className="text-green-500" />}
              </button>

              {isExpanded && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-slate-100 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = currentLessonId === lesson.id;
                    const isCompleted = completedLessons.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-md text-sm transition-all
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700 font-medium border border-blue-100 shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {isActive ? (
                            <PlayCircle size={16} className="shrink-0 text-blue-600 animate-pulse" />
                          ) : isCompleted ? (
                            <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                          ) : (
                            <Circle size={16} className="shrink-0 text-slate-300" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0 ml-2">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
            <BookOpen size={16} />
            <span>课程资源</span>
        </button>
      </div>
    </aside>
  );
};