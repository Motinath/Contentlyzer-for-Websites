import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AuditForm } from "./components/AuditForm";
import { AuditResults } from "./components/AuditResults";
import { Footer } from "./components/Footer";

export interface SEOAuditResult {
  competitors: SEOAuditResult;
  url: string;
  title: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  loadTime: number;
  pageSize: number;
  keywords: string[];
  images: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  seoScore: number;
  suggestions: string[];
  performance: {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
  };
  accessibility: {
    score: number;
    issues: string[];
  };
  mobileOptimized: boolean;
  httpsEnabled: boolean;
  schemaMarkup: boolean;
  canonicalTag: boolean;
}


function App() {
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuditComplete = (result: SEOAuditResult | null) => {
    setAuditResult(result);
    setIsLoading(false);
  };

  const handleStartAudit = () => {
    setIsLoading(true);
    setAuditResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {!auditResult && !isLoading && (
          <>
            <Hero />
            
          </>
        )}
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <AuditForm 
            onAuditStart={handleStartAudit}
            onAuditComplete={handleAuditComplete}
            isLoading={isLoading}
          />
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-lg text-gray-600">Analyzing your website...</p>
              <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
            </div>
          )}
          
          {auditResult && <AuditResults result={auditResult} />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;