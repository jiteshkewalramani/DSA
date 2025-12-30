import React from 'react';
import { Info } from 'lucide-react';

export default function ConceptPanel({ concept }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <Info className="text-green-400" size={20} />
        Key Concepts & Complexity
      </h3>
      <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
          {concept}
        </pre>
      </div>
    </div>
  );
}