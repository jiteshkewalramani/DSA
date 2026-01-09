import { useState } from 'react';
import { Info, ChevronRight, ChevronLeft } from 'lucide-react';

export default function VisualizerLayout({ topic, children, hideConceptsButton = false }) {
  const [showConcepts, setShowConcepts] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 px-4 md:px-6 lg:px-8 py-4 md:py-6 mb-6 md:mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${topic.color} rounded-lg md:rounded-xl flex items-center justify-center text-2xl md:text-3xl shadow-lg`}>
                {topic.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 md:mb-1">{topic.name}</h1>
                <p className="text-slate-400 text-sm md:text-base lg:text-lg">{topic.description}</p>
              </div>
            </div>
            {!hideConceptsButton && (
              <button
                onClick={() => setShowConcepts(!showConcepts)}
                className="flex items-center gap-1.5 md:gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg transition-colors shadow-md text-sm md:text-base"
              >
                <Info size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline">{showConcepts ? 'Hide' : 'Show'} Concepts</span>
                <span className="sm:hidden">{showConcepts ? 'Hide' : 'Show'}</span>
                {showConcepts ? <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" /> : <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Concepts Panel - Collapsible */}
      {showConcepts && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-700 animate-[slideDown_0.3s_ease-out]">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Info className="text-green-400 w-5 md:w-[22px] h-5 md:h-[22px]" />
              Key Concepts & Complexity
            </h3>
            <div className="bg-slate-900 rounded-lg p-3 md:p-5 overflow-auto max-h-80 md:max-h-96">
              <pre className="text-xs md:text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {topic.concept}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
        {children}
      </div>
    </div>
  );
}
