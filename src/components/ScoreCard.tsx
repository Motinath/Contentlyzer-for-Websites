import React from 'react';
import { Award, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  title: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, title }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return Award;
    if (score >= 70) return TrendingUp;
    if (score >= 50) return AlertTriangle;
    return XCircle;
  };

  const ScoreIcon = getScoreIcon(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <ScoreIcon className={`w-8 h-8 ${getScoreColor(score)}`} />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Background circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-500">/ 100</div>
          </div>
        </div>
      </div>
      
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${
        score >= 90 ? 'bg-green-100 text-green-800' :
        score >= 70 ? 'bg-yellow-100 text-yellow-800' :
        score >= 50 ? 'bg-orange-100 text-orange-800' :
        'bg-red-100 text-red-800'
      }`}>
        <span className="text-sm font-medium">
          {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Needs Work' : 'Poor'}
        </span>
      </div>
    </div>
  );
};