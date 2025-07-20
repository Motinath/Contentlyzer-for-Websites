import React from 'react';
import { SEOAuditResult } from '../App';
import { ScoreCard } from './ScoreCard';
import { MetricsChart } from './MetricsChart';
import { SuggestionsPanel } from './SuggestionsPanel';
import { TechnicalChecks } from './TechnicalChecks';
import { PerformanceMetrics } from './PerformanceMetrics';

import { 
  Globe, 
  Clock, 
  FileText, 
  Image, 
  Link, 
  Hash,
  Download,
  Mail,
  Share2
} from 'lucide-react';

interface AuditResultsProps {
  result: SEOAuditResult;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ result }) => {
  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const handleEmailReport = () => {
    alert('Email report functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SEO Audit Report',
        text: `SEO Score: ${result.seoScore}/100 for ${result.url}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8 mt-12">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">SEO Audit Results</h2>
            </div>
            <p className="text-gray-600 break-all">{result.url}</p>
            <p className="text-sm text-gray-500 mt-1">
              Analyzed on {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleEmailReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Email Report</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ScoreCard score={result.seoScore} title="Overall SEO Score" />
        </div>
        <div className="lg:col-span-2">
          <MetricsChart result={result} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{result.loadTime.toFixed(2)}s</div>
          <div className="text-xs text-gray-500">Load Time</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{(result.pageSize / 1024).toFixed(1)}KB</div>
          <div className="text-xs text-gray-500">Page Size</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Image className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{result.images}</div>
          <div className="text-xs text-gray-500">Images</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Link className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{result.internalLinks}</div>
          <div className="text-xs text-gray-500">Internal Links</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Hash className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{result.h1Count}</div>
          <div className="text-xs text-gray-500">H1 Tags</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Hash className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">{result.keywords.length}</div>
          <div className="text-xs text-gray-500">Keywords</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics performance={result.performance} />

      {/* Technical Checks */}
      <TechnicalChecks result={result} />

      {/* Suggestions */}
      <SuggestionsPanel suggestions={result.suggestions} />

      
    </div>
  );
};   