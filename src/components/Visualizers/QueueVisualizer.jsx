import React, { useState } from 'react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';

export default function QueueVisualizer({ pseudoCode }) {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('enqueue');

  const enqueue = () => {
    if (!inputValue.trim()) return;
    setQueue([...queue, inputValue]);
    setMessage(`Enqueued: ${inputValue}`);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty!');
      return;
    }
    const removed = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeued: ${removed}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Enter value..."
          />
          <button onClick={enqueue} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Enqueue
          </button>
          <button onClick={dequeue} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Dequeue
          </button>
          <button onClick={() => setQueue([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>
        {message && <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded p-2 text-blue-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg p-6 min-h-[400px]">
          <div className="flex items-center gap-3 overflow-x-auto pb-4">
            <div className="text-slate-500 text-sm font-semibold">FRONT →</div>
            {queue.length === 0 ? (
              <div className="text-slate-500 text-center flex-1">Queue is empty (FIFO)</div>
            ) : (
              queue.map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[120px] bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center py-3 px-4 rounded-lg shadow-lg border-2 border-purple-400 font-semibold"
                >
                  {item}
                </div>
              ))
            )}
            <div className="text-slate-500 text-sm font-semibold">← REAR</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-400">
          <strong>Size:</strong> {queue.length} | <strong>Front:</strong> {queue.length > 0 ? queue[0] : 'None'}
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="enqueue">Enqueue Operation</option>
            <option value="dequeue">Dequeue Operation</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
  );
}