import React from 'react';
import { 
  Search, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  FileText, 
  Mail, 
  Users,
  Smartphone,
  Eye,
  Link,
  Award
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Real-time SEO Analysis',
    description: 'Comprehensive analysis of title tags, meta descriptions, headings, and content structure.',
    color: 'text-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Performance Metrics',
    description: 'Core Web Vitals, page speed insights, and loading performance analysis.',
    color: 'text-green-600'
  },
  {
    icon: Users,
    title: 'Competitor Comparison',
    description: 'Side-by-side analysis with competitors to identify opportunities.',
    color: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Suggestions',
    description: 'Intelligent recommendations for improving your SEO performance.',
    color: 'text-yellow-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimization',
    description: 'Mobile-first analysis including viewport, touch targets, and responsiveness.',
    color: 'text-indigo-600'
  },
  {
    icon: Eye,
    title: 'Accessibility Audit',
    description: 'WCAG compliance checks, alt text validation, and color contrast analysis.',
    color: 'text-pink-600'
  },
  {
    icon: Shield,
    title: 'Security Checks',
    description: 'HTTPS validation, mixed content detection, and security headers analysis.',
    color: 'text-red-600'
  },
  {
    icon: Link,
    title: 'Technical SEO',
    description: 'Schema markup, canonical tags, robots.txt, and sitemap validation.',
    color: 'text-cyan-600'
  },
  {
    icon: FileText,
    title: 'PDF Export',
    description: 'Professional audit reports with custom branding and detailed insights.',
    color: 'text-orange-600'
  },
  {
    icon: Mail,
    title: 'Email Reports',
    description: 'Share audit results via email with stakeholders and team members.',
    color: 'text-teal-600'
  },
  {
    icon: Globe,
    title: 'Global Analysis',
    description: 'Multi-region performance testing and international SEO optimization.',
    color: 'text-emerald-600'
  },
  {
    icon: Award,
    title: 'SEO Score',
    description: 'Comprehensive scoring system with detailed breakdown and improvement tracking.',
    color: 'text-amber-600'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to analyze, optimize, and monitor your website's SEO performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
            >
              <div className={`w-12 h-12 ${feature.color} bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};