import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        
        

        {/* Creator credit */}
        <p className="text-sm text-gray-600 mb-1">
          Created by{" "}
          <a 
            href="https://motinathportfolio.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline font-medium"
          >
            Motinath
          </a>
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Contentlyzer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
