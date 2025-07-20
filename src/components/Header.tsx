import React from 'react';
import { BarChart3, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/app.png" 
              alt="Contentlyzer Pro" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-950">
                Contentlyzer Pro
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};