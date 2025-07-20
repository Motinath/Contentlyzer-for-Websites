import React from 'react';
import { Shield, Smartphone, Code, Link, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { SEOAuditResult } from '../App';

interface TechnicalChecksProps {
  result: SEOAuditResult;
}

export const TechnicalChecks: React.FC<TechnicalChecksProps> = ({ result }) => {
  const checks = [
    {
      name: 'HTTPS Enabled',
      status: result.httpsEnabled,
      icon: Shield,
      description: 'Site uses secure HTTPS protocol'
    },
    {
      name: 'Mobile Optimized',
      status: result.mobileOptimized,
      icon: Smartphone,
      description: 'Site is optimized for mobile devices'
    },
    {
      name: 'Schema Markup',
      status: result.schemaMarkup,
      icon: Code,
      description: 'Structured data markup present'
    },
    {
      name: 'Canonical Tag',
      status: result.canonicalTag,
      icon: Link,
      description: 'Canonical URL specified'
    }
  ];

  const getStatusIcon = (status: boolean) => {
    return status ? CheckCircle : XCircle;
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBg = (status: boolean) => {
    return status ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900">Technical SEO Checks</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checks.map((check, index) => {
          const StatusIcon = getStatusIcon(check.status);
          
          return (
            <div key={index} className={`border rounded-xl p-6 ${getStatusBg(check.status)}`}>
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${check.status ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <check.icon className={`w-5 h-5 ${getStatusColor(check.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{check.name}</h4>
                    <StatusIcon className={`w-5 h-5 ${getStatusColor(check.status)}`} />
                  </div>
                  <p className="text-gray-600 text-sm">{check.description}</p>
                  
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      check.status 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {check.status ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Accessibility Section */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-semibold text-gray-900">Accessibility Issues</h4>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Accessibility Score</span>
            <span className="text-xl font-bold text-yellow-600">{result.accessibility.score}/100</span>
          </div>
          
          <div className="space-y-2">
            {result.accessibility.issues.map((issue, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="text-gray-700">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};