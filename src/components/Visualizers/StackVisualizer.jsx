import React, { useState } from 'react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';

export default function StackVisualizer({ pseudoCode }) {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('push');

  const push = () => {
    if (!inputValue.trim()) return;
    setStack([...stack, inputValue]);
    setMessage(`Pushed: ${inputValue}`);
    setInputValue('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Popped: ${popped}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && push()}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Enter value..."
          />
          <button onClick={push} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Push
          </button>
          <button onClick={pop} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Pop
          </button>
          <button onClick={() => setStack([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>
        {message && <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded p-2 text-blue-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg p-6 flex flex-col-reverse items-center gap-2 min-h-[400px]">
          {stack.length === 0 ? (
            <div className="text-slate-500 text-center">Stack is empty (LIFO)</div>
          ) : (
            stack.map((item, idx) => (
              <div
                key={idx}
                className="w-48 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-3 px-4 rounded-lg shadow-lg border-2 border-blue-400 font-semibold animate-[slideIn_0.3s_ease-out]"
              >
                {item}
              </div>
            ))
          )}
        </div>
        <div className="mt-4 text-sm text-slate-400">
          <strong>Size:</strong> {stack.length} | <strong>Top:</strong> {stack.length > 0 ? stack[stack.length - 1] : 'None'}
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="push">Push Operation</option>
            <option value="pop">Pop Operation</option>
            <option value="peek">Peek Operation</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
  );
}
