import React from 'react';
import { CourseRecommendation, Activity } from '../types';
import { Star, QrCode, Calendar, Tag } from 'lucide-react';

interface RightPanelProps {
  recommendations: CourseRecommendation[];
  activities: Activity[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ recommendations, activities }) => {
  return (
    <aside className="w-[320px] bg-gray-50 border-l border-slate-200 hidden xl:flex flex-col shrink-0 h-full overflow-y-auto p-4 gap-4 scrollbar-thin">
      
      {/* 1. QR Code / Community Section */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="border border-slate-200 p-1 shrink-0">
             {/* Simulating a QR Code */}
             <div className="w-16 h-16 bg-slate-100 flex items-center justify-center">
                <QrCode size={32} className="text-slate-800" />
             </div>
        </div>
        <div>
            <h4 className="font-medium text-slate-800 text-sm mb-1">课程学习交流</h4>
            <p className="text-xs text-slate-500 leading-relaxed">请扫码关注腾讯产业互联网学堂微信公众号</p>
        </div>
      </div>

      {/* 2. Content Recommendations */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
             <h3 className="font-bold text-slate-800 text-sm">相关课程推荐</h3>
        </div>
        <div className="p-3 space-y-3">
            {recommendations.map(rec => (
                <div key={rec.id} className="group cursor-pointer flex gap-3">
                    <div className="relative shrink-0 w-24 h-16 rounded overflow-hidden bg-slate-200">
                        <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-slate-800 mb-1 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{rec.title}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{rec.category}</span>
                            <div className="flex items-center gap-0.5 text-[10px] text-orange-400 font-medium">
                                <Star size={10} fill="currentColor" />
                                {rec.rating}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 3. Activity Recommendations (New Module) */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
             <h3 className="font-bold text-slate-800 text-sm">热门活动推荐</h3>
        </div>
        <div className="divide-y divide-slate-100">
            {activities.map(activity => (
                <div key={activity.id} className="group cursor-pointer block hover:bg-slate-50 transition-colors">
                    <div className="relative h-28 w-full overflow-hidden">
                         <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded shadow-sm">
                            {activity.tag}
                         </div>
                    </div>
                    <div className="p-3">
                        <h4 className="text-sm font-medium text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{activity.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar size={12} />
                            <span>{activity.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </aside>
  );
};