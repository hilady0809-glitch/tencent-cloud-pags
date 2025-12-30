import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_COURSE } from './constants';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { CourseContent } from './components/CourseContent';
import { RightPanel } from './components/RightPanel';
import { Lesson, Module } from './types';

export default function App() {
  const [currentLessonId, setCurrentLessonId] = useState<string>('l-1-1');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Flatten logic to help with next/prev navigation
  const flatLessons = useMemo(() => {
    const lessons: { lesson: Lesson; module: Module }[] = [];
    MOCK_COURSE.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        lessons.push({ lesson, module });
      });
    });
    return lessons;
  }, []);

  const currentIndex = flatLessons.findIndex(item => item.lesson.id === currentLessonId);
  const currentItem = flatLessons[currentIndex];

  const handleComplete = () => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.add(currentLessonId);
      return next;
    });
    
    // Auto-advance logic could go here, but let's just mark it done for now
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentLessonId(flatLessons[currentIndex - 1].lesson.id);
    } else if (direction === 'next' && currentIndex < flatLessons.length - 1) {
      setCurrentLessonId(flatLessons[currentIndex + 1].lesson.id);
    }
    // Scroll to top
    const mainContent = document.getElementById('main-content-scroll');
    if (mainContent) mainContent.scrollTop = 0;
  };

  // Scroll logic for sticky top bar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      
      {/* Top Header */}
      <TopNav 
        toggleSidebar={toggleSidebar} 
        courseTitle={MOCK_COURSE.title}
        moduleTitle={currentItem?.module.title || ''}
        lessonTitle={currentItem?.lesson.title || ''}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Directory) */}
        <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
           <Sidebar 
             course={MOCK_COURSE}
             currentLessonId={currentLessonId}
             completedLessons={completedLessons}
             onSelectLesson={setCurrentLessonId}
             isOpen={isSidebarOpen}
           />
        </div>

        {/* Center Content Area */}
        <main 
            id="main-content-scroll" 
            className="flex-1 overflow-y-auto scroll-smooth relative bg-white"
        >
            {currentItem && (
                <CourseContent 
                    lesson={currentItem.lesson}
                    course={MOCK_COURSE}
                    onComplete={handleComplete}
                    onNavigate={handleNavigate}
                    isCompleted={completedLessons.has(currentLessonId)}
                    hasPrev={currentIndex > 0}
                    hasNext={currentIndex < flatLessons.length - 1}
                />
            )}

            {/* Footer Area for Main Content */}
            <footer className="bg-slate-50 border-t border-slate-200 py-10 text-center">
                <p className="text-slate-500 text-sm">© 2024 CloudLearn Pro. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-blue-600">
                    <a href="#" className="hover:underline">隐私政策</a>
                    <a href="#" className="hover:underline">服务条款</a>
                    <a href="#" className="hover:underline">帮助中心</a>
                </div>
            </footer>
        </main>

        {/* Right Sidebar (Recommendations & Tools) */}
        <RightPanel 
            recommendations={MOCK_COURSE.recommendations} 
            activities={MOCK_COURSE.activities}
        />
        
      </div>
    </div>
  );
}