import React from 'react';
import { Lesson, Course } from '../types';
import { Share2, Flag, ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface CourseContentProps {
  lesson: Lesson;
  course: Course;
  onComplete: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  isCompleted: boolean;
  hasPrev: boolean;
  hasNext: boolean;
}

export const CourseContent: React.FC<CourseContentProps> = ({ 
  lesson, 
  course,
  onComplete, 
  onNavigate,
  isCompleted,
  hasPrev,
  hasNext
}) => {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Lesson Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-3">
            <span className="bg-blue-50 px-2 py-1 rounded text-xs uppercase tracking-wide">文档</span>
            <span>•</span>
            <span>阅读时长 {lesson.duration}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{lesson.title}</h1>
        
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                         <img key={i} src={`https://picsum.photos/30/30?random=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Learner" />
                    ))}
                </div>
                <span className="text-sm text-slate-500">1200+ 学员近期已完成</span>
            </div>
            <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"><Share2 size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"><Flag size={18} /></button>
            </div>
        </div>
      </div>

      {/* Main Content Body */}
      {/* In a real app, this would be a proper Markdown renderer or RTE output */}
      <article 
        className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />

      {/* Action Buttons */}
      <div className="mt-16 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">已阅读完毕？</h3>
        <p className="text-slate-500 mb-6">将此课程标记为完成以追踪您的学习进度。</p>
        
        <div className="flex items-center gap-4 w-full justify-center">
            {hasPrev && (
                <button 
                    onClick={() => onNavigate('prev')}
                    className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-white hover:border-slate-400 transition-all flex items-center gap-2"
                >
                    <ArrowLeft size={18} /> 上一节
                </button>
            )}

            <button 
                onClick={onComplete}
                className={`
                    px-8 py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center gap-2
                    ${isCompleted 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md hover:-translate-y-0.5'
                    }
                `}
            >
                {isCompleted ? '已完成' : '标记为完成'}
                {isCompleted && <span className="ml-1 text-lg">✓</span>}
            </button>

            {hasNext && (
                <button 
                    onClick={() => onNavigate('next')}
                    className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-white hover:border-slate-400 transition-all flex items-center gap-2"
                >
                    下一节 <ArrowRight size={18} />
                </button>
            )}
        </div>
      </div>

      {/* Product Recommendations Moved to Right Panel as requested */}

      {/* Course Reviews Section */}
      <div className="mt-16 border-t border-slate-200 pt-10">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">学员评价</h3>
            <button className="text-blue-600 font-medium text-sm hover:underline">写评价</button>
        </div>
        <div className="space-y-6">
            {course.reviews.map(review => (
                <div key={review.id} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-slate-900">{review.user}</h4>
                            <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-400 my-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-300"} />
                            ))}
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{review.comment}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};