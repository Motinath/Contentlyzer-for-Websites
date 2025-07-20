import React from 'react';
import { Lightbulb, CheckCircle, ArrowRight, Zap } from 'lucide-react';

interface SuggestionsPanelProps {
  suggestions: string[];
}

export const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions }) => {
  const [completedSuggestions, setCompletedSuggestions] = React.useState<Set<number>>(new Set());

  const toggleSuggestion = (index: number) => {
    const newCompleted = new Set(completedSuggestions);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSuggestions(newCompleted);
  };

  const getPriorityColor = (index: number) => {
    if (index < 2) return 'border-red-200 bg-red-50';
    if (index < 4) return 'border-yellow-200 bg-yellow-50';
    return 'border-green-200 bg-green-50';
  };

  const getPriorityLabel = (index: number) => {
    if (index < 2) return { label: 'High Priority', color: 'text-red-600 bg-red-100' };
    if (index < 4) return { label: 'Medium Priority', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Low Priority', color: 'text-green-600 bg-green-100' };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-semibold text-gray-900">AI-Powered Suggestions</h3>
        <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-blue-600 font-medium">AI Generated</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const isCompleted = completedSuggestions.has(index);
          const priority = getPriorityLabel(index);
          
          return (
            <div
              key={index}
              className={`border rounded-xl p-6 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200 opacity-75' 
                  : getPriorityColor(index)
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleSuggestion(index)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                      {priority.label}
                    </span>
                  </div>
                  
                  <p className={`text-gray-700 leading-relaxed ${isCompleted ? 'line-through' : ''}`}>
                    {suggestion}
                  </p>
                  
                  {!isCompleted && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600">
                      <ArrowRight className="w-4 h-4" />
                      <span>Click to mark as completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Progress</span>
          <span className="text-gray-900 font-semibold">
            {completedSuggestions.size}/{suggestions.length} completed
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedSuggestions.size / suggestions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};