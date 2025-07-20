import React from 'react';
import { SEOAuditResult } from '../App';
import { BarChart3, PieChart, Activity } from 'lucide-react';

interface MetricsChartProps {
  result: SEOAuditResult;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ result }) => {
  const metrics = [
    { 
      name: 'Content', 
      score: Math.min(100, (result.title.length > 0 ? 25 : 0) + (result.metaDescription.length > 0 ? 25 : 0) + (result.h1Count > 0 ? 25 : 0) + (result.keywords.length > 0 ? 25 : 0)), 
      color: 'bg-blue-500' 
    },
    { 
      name: 'Performance', 
      score: Math.max(0, 100 - (result.loadTime * 20)), 
      color: 'bg-green-500' 
    },
    { 
      name: 'Accessibility', 
      score: result.accessibility.score, 
      color: 'bg-purple-500' 
    },
    { 
      name: 'Technical', 
      score: (result.httpsEnabled ? 25 : 0) + (result.mobileOptimized ? 25 : 0) + (result.schemaMarkup ? 25 : 0) + (result.canonicalTag ? 25 : 0), 
      color: 'bg-yellow-500' 
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">SEO Metrics Breakdown</h3>
      </div>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{metric.name}</span>
              <span className="text-gray-900 font-semibold">{metric.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${metric.color} transition-all duration-1000 ease-out rounded-full`}
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <PieChart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length)}</div>
          <div className="text-xs text-gray-600">Average Score</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{metrics.filter(m => m.score >= 80).length}/{metrics.length}</div>
          <div className="text-xs text-gray-600">Passing Metrics</div>
        </div>
      </div>
    </div>
  );
};