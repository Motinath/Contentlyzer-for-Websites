import React from 'react';
import { Zap, Clock, Eye, MousePointer } from 'lucide-react';

interface PerformanceMetricsProps {
  performance: {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
  };
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ performance }) => {
  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600';
    if (value <= thresholds[1]) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBg = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'bg-green-100';
    if (value <= thresholds[1]) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const metrics = [
    {
      name: 'First Contentful Paint',
      value: performance.fcp,
      unit: 's',
      icon: Eye,
      thresholds: [1.8, 3.0] as [number, number],
      description: 'Time until first content appears'
    },
    {
      name: 'Largest Contentful Paint',
      value: performance.lcp,
      unit: 's',
      icon: Clock,
      thresholds: [2.5, 4.0] as [number, number],
      description: 'Time until largest content loads'
    },
    {
      name: 'Cumulative Layout Shift',
      value: performance.cls,
      unit: '',
      icon: Zap,
      thresholds: [0.1, 0.25] as [number, number],
      description: 'Visual stability of the page'
    },
    {
      name: 'First Input Delay',
      value: performance.fid,
      unit: 'ms',
      icon: MousePointer,
      thresholds: [100, 300] as [number, number],
      description: 'Responsiveness to user input'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Core Web Vitals</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className={`${getPerformanceBg(metric.value, metric.thresholds)} rounded-xl p-6 text-center`}>
            <div className={`w-12 h-12 ${getPerformanceBg(metric.value, metric.thresholds)} rounded-lg flex items-center justify-center mx-auto mb-4 border-2 ${
              metric.value <= metric.thresholds[0] ? 'border-green-200' :
              metric.value <= metric.thresholds[1] ? 'border-yellow-200' : 'border-red-200'
            }`}>
              <metric.icon className={`w-6 h-6 ${getPerformanceColor(metric.value, metric.thresholds)}`} />
            </div>
            
            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(metric.value, metric.thresholds)}`}>
              {metric.value.toFixed(metric.unit === 'ms' ? 0 : metric.unit === '' ? 3 : 2)}{metric.unit}
            </div>
            
            <div className="text-sm font-medium text-gray-900 mb-2">{metric.name}</div>
            <div className="text-xs text-gray-600">{metric.description}</div>
            
            <div className="mt-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                metric.value <= metric.thresholds[0] 
                  ? 'bg-green-200 text-green-800' 
                  : metric.value <= metric.thresholds[1]
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
              }`}>
                {metric.value <= metric.thresholds[0] ? 'Good' : metric.value <= metric.thresholds[1] ? 'Needs Improvement' : 'Poor'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};