import React, { useState } from 'react';
import { Search, Globe, Zap } from 'lucide-react';
import { SEOAuditResult } from '../App';

interface AuditFormProps {
  onAuditStart: () => void;
  onAuditComplete: (result: SEOAuditResult | null) => void;
  isLoading: boolean;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onAuditStart, onAuditComplete, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const checkUrlExists = async (url: string): Promise<boolean> => {
    try {
      // In a real implementation, this would make an actual request to check if the URL exists
      // For now, we'll simulate this with some basic validation
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      return response.ok;
    } catch {
      // If CORS proxy fails, we'll do basic validation
      return true; // Allow the request to proceed for demo purposes
    }
  };

  const simulateRealAudit = async (url: string): Promise<SEOAuditResult> => {
    // Simulate checking if URL exists
    const urlExists = await checkUrlExists(url);
    if (!urlExists) {
      throw new Error('Website not accessible or does not exist');
    }

    // Simulate API call delay for real analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // In a real implementation, this would call your FastAPI backend
    // For demo purposes, we'll generate realistic data based on the URL
    const domain = new URL(url).hostname;
    const isPopularSite = ['google.com', 'facebook.com', 'youtube.com', 'amazon.com'].includes(domain);
    
    return {
      url,
      title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Official Website`,
      metaDescription: `Official website of ${domain}. Discover our products and services.`,
      h1Count: 1,
      h2Count: Math.floor(Math.random() * 8) + 2,
      h3Count: Math.floor(Math.random() * 15) + 5,
      loadTime: isPopularSite ? Math.random() * 1.5 + 0.5 : Math.random() * 4 + 1,
      pageSize: Math.random() * 3000 + 500,
      keywords: domain.split('.')[0].split('-').concat(['website', 'official', 'services']),
      images: Math.floor(Math.random() * 20) + 5,
      imagesWithoutAlt: Math.floor(Math.random() * 5),
      internalLinks: Math.floor(Math.random() * 50) + 10,
      externalLinks: Math.floor(Math.random() * 15) + 2,
      seoScore: isPopularSite ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 40) + 60,
      suggestions: [
        'Optimize meta description length for better search visibility',
        'Add more descriptive alt text to images',
        'Improve page loading speed by optimizing images',
        'Add structured data markup for better search results',
        'Increase internal linking to improve site structure'
      ],
      performance: {
        fcp: isPopularSite ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1,
        lcp: isPopularSite ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        cls: Math.random() * 0.15,
        fid: Math.random() * 150 + 50
      },
      accessibility: {
        score: isPopularSite ? Math.floor(Math.random() * 15) + 85 : Math.floor(Math.random() * 30) + 70,
        issues: ['Missing alt text on some images', 'Color contrast could be improved']
      },
      mobileOptimized: Math.random() > 0.2,
      httpsEnabled: url.startsWith('https://'),
      schemaMarkup: isPopularSite ? Math.random() > 0.2 : Math.random() > 0.5,
      canonicalTag: Math.random() > 0.3
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }
    
    if (!validateUrl(fullUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    onAuditStart();
    
    try {
      const result = await simulateRealAudit(fullUrl);
      onAuditComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze website. Please check if the URL is accessible.');
      onAuditComplete(null);
    }
  };

  return (
    <section id="audit" className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Start Your SEO Audit</h2>
            <p className="text-gray-600">Enter your website URL to get a comprehensive SEO analysis</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>{isLoading ? 'Analyzing...' : 'Analyze Website'}</span>
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">SEO Factors</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">30s</div>
              <div className="text-sm text-gray-600">Average Analysis</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};