import React from 'react';

export default function PseudoCodePanel({ title, code, currentLine }) {
  if (!code) return null;
  
  const lines = code.split('\n');

  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <span className="text-blue-400">💻</span> {title}
      </h3>
      <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
        <pre className="text-sm font-mono">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`py-1 px-2 transition-colors ${
                currentLine === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200'
              }`}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
