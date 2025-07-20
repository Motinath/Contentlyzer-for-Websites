import React from 'react';
import { TrendingUp, Zap, Shield, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-20 pb-6 bg-gradient-to-b from-gray-50 to-white"> {/* 🔽 Reduced bottom padding from py-20 to pb-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced SEO Audit Platform
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Analyze any website with AI-powered insights, competitor comparison, 
            and actionable recommendations to boost your search rankings.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6"> {/* 🔽 Reduced mb-12 to mb-8 */}
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Real-time Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-gray-700">AI-Powered Suggestions</span>
            </div> 
             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Security Checks</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Global Performance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
