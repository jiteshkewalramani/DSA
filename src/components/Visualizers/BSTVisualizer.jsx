import React, { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { BST, copyTree, calculateTreePositions } from '../../utils/dataStructures';
import PseudoCodePanel from '../Shared/PseudoCodePanel';

export default function BSTVisualizer({ pseudoCode }) {
  const [bst, setBst] = useState(new BST());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('insert');

  const executeInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    const newBst = new BST();
    newBst.root = copyTree(bst.root);
    newBst.insert(value);
    setBst(newBst);
    setMessage(`Inserted ${value}`);
    setInputValue('');
  };

  const renderNode = (node) => {
    if (!node) return null;
    return (
      <g key={`${node.value}-${node.x}-${node.y}`}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#64748b" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#64748b" strokeWidth="2" />
        )}
        <circle cx={node.x} cy={node.y} r="22" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">
          {node.value}
        </text>
        {node.left && renderNode(node.left)}
        {node.right && renderNode(node.right)}
      </g>
    );
  };

  const renderTree = () => {
    if (!bst.root) return null;
    calculateTreePositions(bst.root, 300, 40, 120);
    return renderNode(bst.root);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeInsert()}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Enter value..."
          />
          <button onClick={executeInsert} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <Plus size={20} />
          </button>
          <button onClick={() => setBst(new BST())} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            <RotateCcw size={20} />
          </button>
        </div>
        {message && <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded p-2 text-blue-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg">
          <svg width="600" height="350" className="w-full">
            {bst.root ? renderTree() : (
              <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="16">
                Insert values to build the tree
              </text>
            )}
          </svg>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="insert">Insert Operation</option>
            <option value="search">Search Operation</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
  );
}