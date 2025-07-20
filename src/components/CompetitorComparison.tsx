import React, { useState } from 'react';
import { SEOAuditResult } from '../App';
import { Users, Search, TrendingUp, BarChart3 } from 'lucide-react';

interface CompetitorComparisonProps {
  baseResult: SEOAuditResult;
}

export const CompetitorComparison: React.FC<CompetitorComparisonProps> = ({ baseResult }) => {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorResult, setCompetitorResult] = useState<SEOAuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateCompetitorAudit = async (url: string): Promise<SEOAuditResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      url,
      title: 'Competitor Website - Premium Solutions',
      metaDescription: 'Leading provider of premium solutions with excellent customer service and fast delivery.',
      h1Count: 1,
      h2Count: 6,
      h3Count: 12,
      loadTime: Math.random() * 3 + 1,
      pageSize: Math.random() * 2000 + 500,
      keywords: ['premium', 'solutions', 'customer', 'service', 'delivery'],
      images: 18,
      imagesWithoutAlt: 1,
      internalLinks: 35,
      externalLinks: 12,
      seoScore: Math.floor(Math.random() * 30) + 70,
      suggestions: [],
      performance: {
        fcp: Math.random() * 2 + 1,
        lcp: Math.random() * 3 + 2,
        cls: Math.random() * 0.1,
        fid: Math.random() * 100 + 50
      },
      accessibility: {
        score: Math.floor(Math.random() * 20) + 80,
        issues: []
      },
      mobileOptimized: Math.random() > 0.3,
      httpsEnabled: Math.random() > 0.1,
      schemaMarkup: Math.random() > 0.4,
      canonicalTag: Math.random() > 0.2
    };
  };

  const handleCompare = async () => {
    if (!competitorUrl.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await simulateCompetitorAudit(competitorUrl);
      setCompetitorResult(result);
    } catch (error) {
      console.error('Failed to analyze competitor:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const metrics = [
    { name: 'SEO Score', yourValue: baseResult.seoScore, competitorValue: competitorResult?.seoScore || 0 },
    { name: 'Load Time', yourValue: baseResult.loadTime, competitorValue: competitorResult?.loadTime || 0, unit: 's', reverse: true },
    { name: 'Page Size', yourValue: baseResult.pageSize / 1024, competitorValue: (competitorResult?.pageSize || 0) / 1024, unit: 'KB', reverse: true },
    { name: 'Images', yourValue: baseResult.images, competitorValue: competitorResult?.images || 0 },
    { name: 'Internal Links', yourValue: baseResult.internalLinks, competitorValue: competitorResult?.internalLinks || 0 },
    { name: 'Accessibility', yourValue: baseResult.accessibility.score, competitorValue: competitorResult?.accessibility.score || 0 },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Competitor Comparison</h3>
      </div>

      {!competitorResult && (
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              placeholder="Enter competitor URL"
              className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isLoading}
            />
            <button
              onClick={handleCompare}
              disabled={isLoading || !competitorUrl.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? 'Analyzing...' : 'Compare'}</span>
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Analyzing competitor...</p>
        </div>
      )}

      {competitorResult && (
        <div className="space-y-6">
          {/* Header Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Your Website</h4>
              <p className="text-gray-300 text-sm break-all">{baseResult.url}</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{baseResult.seoScore}</div>
                  <div className="text-xs text-gray-400">SEO Score</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-2">Competitor</h4>
              <p className="text-gray-300 text-sm break-all">{competitorResult.url}</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{competitorResult.seoScore}</div>
                  <div className="text-xs text-gray-400">SEO Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Comparison */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white">Detailed Comparison</h4>
            </div>
            
            {metrics.map((metric, index) => {
              const yourScore = metric.yourValue;
              const competitorScore = metric.competitorValue;
              const isYoursBetter = metric.reverse ? yourScore < competitorScore : yourScore > competitorScore;
              
              return (
                <div key={index} className="bg-slate-700/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium">{metric.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className={`font-semibold ${isYoursBetter ? 'text-green-400' : 'text-red-400'}`}>
                        {typeof yourScore === 'number' ? yourScore.toFixed(metric.unit ? 1 : 0) : yourScore}{metric.unit || ''}
                      </span>
                      <span className="text-gray-500">vs</span>
                      <span className={`font-semibold ${!isYoursBetter ? 'text-green-400' : 'text-red-400'}`}>
                        {typeof competitorScore === 'number' ? competitorScore.toFixed(metric.unit ? 1 : 0) : competitorScore}{metric.unit || ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-slate-600 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${isYoursBetter ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, (yourScore / Math.max(yourScore, competitorScore)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-slate-600 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${!isYoursBetter ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, (competitorScore / Math.max(yourScore, competitorScore)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg p-6 border border-purple-800/30">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-white">Competitive Analysis Summary</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {metrics.filter(m => m.reverse ? m.yourValue < m.competitorValue : m.yourValue > m.competitorValue).length}
                </div>
                <div className="text-sm text-gray-400">Metrics You Win</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {metrics.filter(m => m.reverse ? m.yourValue > m.competitorValue : m.yourValue < m.competitorValue).length}
                </div>
                <div className="text-sm text-gray-400">Areas to Improve</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {metrics.filter(m => m.yourValue === m.competitorValue).length}
                </div>
                <div className="text-sm text-gray-400">Tied Metrics</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};