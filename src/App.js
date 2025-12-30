import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Search, Trash2, ArrowLeft, ChevronRight, Info, Zap, RefreshCw } from 'lucide-react';

// ============= BINARY SEARCH TREE =============
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const steps = [];
    this.root = this._insertRec(this.root, value, steps, []);
    return steps;
  }

  _insertRec(node, value, steps, path) {
    if (node === null) {
      steps.push({ action: 'create', value, path: [...path] });
      return new TreeNode(value);
    }
    steps.push({ action: 'compare', current: node.value, value, path: [...path] });
    if (value < node.value) {
      node.left = this._insertRec(node.left, value, steps, [...path, 'L']);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value, steps, [...path, 'R']);
    }
    return node;
  }
}

function BSTVisualizer() {
  const [bst, setBst] = useState(new BST());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const calculatePositions = (node, x, y, offset) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    if (node.left) calculatePositions(node.left, x - offset, y + 70, offset / 2);
    if (node.right) calculatePositions(node.right, x + offset, y + 70, offset / 2);
  };

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

  const copyTree = (node) => {
    if (!node) return null;
    const newNode = new TreeNode(node.value);
    newNode.left = copyTree(node.left);
    newNode.right = copyTree(node.right);
    return newNode;
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
    calculatePositions(bst.root, 300, 40, 120);
    return renderNode(bst.root);
  };

  return (
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
  );
}

// ============= SORTING VISUALIZER =============
function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(50);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
      setSorted(prev => [...prev, arr.length - 1 - i]);
    }
    setSorted(arr.map((_, i) => i));
    setComparing([]);
    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setSorted(arr.map((_, i) => i));
    setComparing([]);
    setSorting(false);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      await sleep(50);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  const startSort = () => {
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'quick') quickSort();
  };

  const maxValue = Math.max(...array, 1);

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-slate-700 text-white rounded px-3 py-2"
          disabled={sorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
        <button onClick={startSort} disabled={sorting} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Play size={18} /> Sort
        </button>
        <button onClick={generateArray} disabled={sorting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded">
          New Array
        </button>
      </div>
      <div className="bg-slate-900 rounded-lg p-4 flex items-end justify-center gap-1" style={{ height: '400px' }}>
        {array.map((value, idx) => (
          <div
            key={idx}
            className="transition-all duration-100"
            style={{
              height: `${(value / maxValue) * 320}px`,
              width: `${100 / array.length}%`,
              backgroundColor: sorted.includes(idx) ? '#10b981' : comparing.includes(idx) ? '#f59e0b' : '#3b82f6',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============= STACK VISUALIZER =============
function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

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
          <div className="text-slate-500 text-center">Stack is empty</div>
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
  );
}

// ============= QUEUE VISUALIZER =============
function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

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
            <div className="text-slate-500 text-center flex-1">Queue is empty</div>
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
  );
}

// ============= LINKED LIST VISUALIZER =============
function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const addHead = () => {
    if (!inputValue.trim()) return;
    setList([inputValue, ...list]);
    setMessage(`Added ${inputValue} at head`);
    setInputValue('');
  };

  const addTail = () => {
    if (!inputValue.trim()) return;
    setList([...list, inputValue]);
    setMessage(`Added ${inputValue} at tail`);
    setInputValue('');
  };

  const removeHead = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    setMessage(`Removed ${list[0]} from head`);
    setList(list.slice(1));
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
          placeholder="Enter value..."
        />
        <button onClick={addHead} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add Head
        </button>
        <button onClick={addTail} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add Tail
        </button>
        <button onClick={removeHead} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Remove Head
        </button>
        <button onClick={() => setList([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>
      {message && <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded p-2 text-blue-200 text-sm">{message}</div>}
      <div className="bg-slate-900 rounded-lg p-6 min-h-[400px]">
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          {list.length === 0 ? (
            <div className="text-slate-500 text-center w-full">Linked List is empty</div>
          ) : (
            list.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-4 rounded-lg shadow-lg border-2 border-teal-400 min-w-[100px] text-center font-semibold">
                    {item}
                  </div>
                  {idx < list.length - 1 && (
                    <ChevronRight className="text-slate-500" size={24} />
                  )}
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-400">
        <strong>Length:</strong> {list.length}
      </div>
    </div>
  );
}

// ============= GRAPH VISUALIZER =============
function GraphVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [startNode, setStartNode] = useState('');
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const [running, setRunning] = useState(false);

  const addNode = () => {
    const newNode = String.fromCharCode(65 + nodes.length);
    if (nodes.length < 8) {
      const angle = (nodes.length * 2 * Math.PI) / 8;
      setNodes([...nodes, { id: newNode, x: 300 + 150 * Math.cos(angle), y: 200 + 150 * Math.sin(angle) }]);
    }
  };

  const addEdge = (from, to) => {
    if (from !== to && !edges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))) {
      setEdges([...edges, { from, to }]);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bfs = async (start) => {
    setRunning(true);
    const queue = [start];
    const vis = [];
    
    while (queue.length > 0) {
      const node = queue.shift();
      if (vis.includes(node)) continue;
      
      setCurrent(node);
      await sleep(800);
      vis.push(node);
      setVisited([...vis]);
      
      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));
      
      queue.push(...neighbors);
    }
    
    setCurrent(null);
    setRunning(false);
  };

  const dfs = async (start) => {
    setRunning(true);
    const vis = [];
    
    const dfsHelper = async (node) => {
      if (vis.includes(node)) return;
      
      setCurrent(node);
      await sleep(800);
      vis.push(node);
      setVisited([...vis]);
      
      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));
      
      for (const neighbor of neighbors) {
        await dfsHelper(neighbor);
      }
    };
    
    await dfsHelper(start);
    setCurrent(null);
    setRunning(false);
  };

  const startTraversal = () => {
    if (!startNode || !nodes.find(n => n.id === startNode)) return;
    setVisited([]);
    setCurrent(null);
    if (algorithm === 'bfs') bfs(startNode);
    else if (algorithm === 'dfs') dfs(startNode);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <button onClick={addNode} disabled={nodes.length >= 8} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded">
          Add Node
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-slate-700 text-white rounded px-3 py-2"
          disabled={running}
        >
          <option value="bfs">BFS (Breadth First)</option>
          <option value="dfs">DFS (Depth First)</option>
        </select>
        <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value.toUpperCase())}
          className="bg-slate-700 text-white rounded px-3 py-2 w-20"
          placeholder="Start"
          maxLength={1}
        />
        <button onClick={startTraversal} disabled={running || !startNode} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Play size={18} /> Traverse
        </button>
        <button onClick={() => { setNodes([]); setEdges([]); setVisited([]); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>
      
      <div className="mb-4 bg-slate-900 rounded p-3">
        <p className="text-sm text-slate-400 mb-2">Click two nodes to connect them:</p>
        <div className="flex gap-2 flex-wrap">
          {nodes.map(node => (
            <button
              key={node.id}
              onClick={() => {
                const selected = document.querySelector('.node-selected');
                if (selected && selected.textContent !== node.id) {
                  addEdge(selected.textContent, node.id);
                  selected.classList.remove('node-selected', 'bg-yellow-600');
                  selected.classList.add('bg-slate-600');
                } else {
                  document.querySelectorAll('.node-btn').forEach(btn => {
                    btn.classList.remove('node-selected', 'bg-yellow-600');
                    btn.classList.add('bg-slate-600');
                  });
                  const btn = document.getElementById(`node-btn-${node.id}`);
                  btn.classList.add('node-selected', 'bg-yellow-600');
                  btn.classList.remove('bg-slate-600');
                }
              }}
              id={`node-btn-${node.id}`}
              className="node-btn bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded"
            >
              {node.id}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg">
        <svg width="600" height="400" className="w-full">
          {edges.map((edge, idx) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#64748b"
                strokeWidth="2"
              />
            );
          })}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={current === node.id ? '#f59e0b' : visited.includes(node.id) ? '#10b981' : '#3b82f6'}
                stroke="#60a5fa"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize="18"
                fontWeight="bold"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 text-sm text-slate-400">
        <strong>Visited Order:</strong> {visited.join(' → ') || 'None'}
      </div>
    </div>
  );
}

// ============= HEAP VISUALIZER =============
function HeapVisualizer() {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [heapType, setHeapType] = useState('min');
  const [message, setMessage] = useState('');

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newHeap = [...heap, value];
    heapifyUp(newHeap, newHeap.length - 1);
    setHeap(newHeap);
    setMessage(`Inserted ${value}`);
    setInputValue('');
  };

  const extractRoot = () => {
    if (heap.length === 0) {
      setMessage('Heap is empty!');
      return;
    }
    
    const root = heap[0];
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    
    if (newHeap.length > 0) {
      heapifyDown(newHeap, 0);
    }
    
    setHeap(newHeap);
    setMessage(`Extracted ${root}`);
  };

  const heapifyUp = (arr, idx) => {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const shouldSwap = heapType === 'min' 
        ? arr[idx] < arr[parentIdx]
        : arr[idx] > arr[parentIdx];
      
      if (shouldSwap) {
        [arr[idx], arr[parentIdx]] = [arr[parentIdx], arr[idx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (arr, idx) => {
    while (true) {
      let targetIdx = idx;
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      
      if (leftIdx < arr.length) {
        const shouldSwap = heapType === 'min'
          ? arr[leftIdx] < arr[targetIdx]
          : arr[leftIdx] > arr[targetIdx];
        if (shouldSwap) targetIdx = leftIdx;
      }
      
      if (rightIdx < arr.length) {
        const shouldSwap = heapType === 'min'
          ? arr[rightIdx] < arr[targetIdx]
          : arr[rightIdx] > arr[targetIdx];
        if (shouldSwap) targetIdx = rightIdx;
      }
      
      if (targetIdx !== idx) {
        [arr[idx], arr[targetIdx]] = [arr[targetIdx], arr[idx]];
        idx = targetIdx;
      } else {
        break;
      }
    }
  };

  const renderHeapTree = () => {
    if (heap.length === 0) return null;
    
    const levels = Math.ceil(Math.log2(heap.length + 1));
    const renderNode = (idx, level, position, maxPosition) => {
      if (idx >= heap.length) return null;
      
      const x = 300 + (position - maxPosition / 2) * (400 / Math.pow(2, level));
      const y = 50 + level * 70;
      
      return (
        <g key={idx}>
          {2 * idx + 1 < heap.length && (
            <line
              x1={x}
              y1={y}
              x2={300 + (position * 2 - maxPosition / 2) * (400 / Math.pow(2, level + 1))}
              y2={y + 70}
              stroke="#64748b"
              strokeWidth="2"
            />
          )}
          {2 * idx + 2 < heap.length && (
            <line
              x1={x}
              y1={y}
              x2={300 + (position * 2 + 1 - maxPosition / 2) * (400 / Math.pow(2, level + 1))}
              y2={y + 70}
              stroke="#64748b"
              strokeWidth="2"
            />
          )}
          <circle
            cx={x}
            cy={y}
            r="22"
            fill={idx === 0 ? '#f59e0b' : '#8b5cf6'}
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dy=".3em"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {heap[idx]}
          </text>
          {renderNode(2 * idx + 1, level + 1, position * 2, Math.pow(2, level + 1))}
          {renderNode(2 * idx + 2, level + 1, position * 2 + 1, Math.pow(2, level + 1))}
        </g>
      );
    };
    
    return renderNode(0, 0, 0, 1);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <select
          value={heapType}
          onChange={(e) => { setHeapType(e.target.value); setHeap([]); }}
          className="bg-slate-700 text-white rounded px-3 py-2"
        >
          <option value="min">Min Heap</option>
          <option value="max">Max Heap</option>
        </select>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && insert()}
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
          placeholder="Enter value..."
        />
        <button onClick={insert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Insert
        </button>
        <button onClick={extractRoot} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Extract Root
        </button>
        <button onClick={() => setHeap([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>
      {message && <div className="mb-4 bg-purple-900 bg-opacity-50 border border-purple-500 rounded p-2 text-purple-200 text-sm">{message}</div>}
      <div className="bg-slate-900 rounded-lg">
        <svg width="600" height="350" className="w-full">
          {heap.length > 0 ? renderHeapTree() : (
            <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="16">
              Insert values to build the heap
            </text>
          )}
        </svg>
      </div>
      <div className="mt-4 text-sm text-slate-400">
        <strong>Array:</strong> [{heap.join(', ')}]
      </div>
    </div>
  );
}

// ============= HASH TABLE VISUALIZER =============
function HashTableVisualizer() {
  const [table, setTable] = useState(Array(10).fill(null).map(() => []));
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const hashFunction = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % table.length;
    }
    return hash;
  };

  const insert = () => {
    if (!inputKey.trim() || !inputValue.trim()) return;
    
    const index = hashFunction(inputKey);
    const newTable = table.map(bucket => [...bucket]);
    
    const existingIdx = newTable[index].findIndex(item => item.key === inputKey);
    if (existingIdx !== -1) {
      newTable[index][existingIdx] = { key: inputKey, value: inputValue };
      setMessage(`Updated key "${inputKey}" at index ${index}`);
    } else {
      newTable[index].push({ key: inputKey, value: inputValue });
      setMessage(`Inserted key "${inputKey}" at index ${index}${newTable[index].length > 1 ? ' (collision handled)' : ''}`);
    }
    
    setTable(newTable);
    setInputKey('');
    setInputValue('');
  };

  const search = () => {
    if (!inputKey.trim()) return;
    
    const index = hashFunction(inputKey);
    const bucket = table[index];
    const item = bucket.find(item => item.key === inputKey);
    
    if (item) {
      setMessage(`Found "${inputKey}" = "${item.value}" at index ${index}`);
    } else {
      setMessage(`Key "${inputKey}" not found`);
    }
  };

  const remove = () => {
    if (!inputKey.trim()) return;
    
    const index = hashFunction(inputKey);
    const newTable = table.map(bucket => [...bucket]);
    const initialLength = newTable[index].length;
    
    newTable[index] = newTable[index].filter(item => item.key !== inputKey);
    
    if (newTable[index].length < initialLength) {
      setMessage(`Removed key "${inputKey}" from index ${index}`);
      setTable(newTable);
    } else {
      setMessage(`Key "${inputKey}" not found`);
    }
    
    setInputKey('');
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
          placeholder="Key..."
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
          placeholder="Value..."
        />
        <button onClick={insert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Insert
        </button>
        <button onClick={search} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          <Search size={18} />
        </button>
        <button onClick={remove} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Remove
        </button>
        <button onClick={() => setTable(Array(10).fill(null).map(() => []))} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>
      {message && <div className="mb-4 bg-amber-900 bg-opacity-50 border border-amber-500 rounded p-2 text-amber-200 text-sm">{message}</div>}
      <div className="bg-slate-900 rounded-lg p-4 space-y-2 max-h-[400px] overflow-y-auto">
        {table.map((bucket, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-12 text-slate-400 font-mono text-sm font-semibold">[{idx}]</div>
            <div className="flex-1 bg-slate-800 rounded p-2 min-h-[40px] flex items-center gap-2 flex-wrap">
              {bucket.length === 0 ? (
                <span className="text-slate-600 text-sm">empty</span>
              ) : (
                bucket.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1 rounded text-sm">
                    {item.key}: {item.value}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-slate-400">
        <strong>Hash Function:</strong> Sum of ASCII values % {table.length} | <strong>Collision Handling:</strong> Chaining
      </div>
    </div>
  );
}

// ============= AVL TREE VISUALIZER =============
class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.x = 0;
    this.y = 0;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  }

  getBalance(node) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}

function AVLTreeVisualizer() {
  const [avl, setAvl] = useState(new AVLTree());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const calculatePositions = (node, x, y, offset) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    if (node.left) calculatePositions(node.left, x - offset, y + 70, offset / 2);
    if (node.right) calculatePositions(node.right, x + offset, y + 70, offset / 2);
  };

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newAvl = new AVLTree();
    newAvl.root = copyTree(avl.root);
    newAvl.insert(value);
    setAvl(newAvl);
    setMessage(`Inserted ${value} - Tree auto-balanced!`);
    setInputValue('');
  };

  const copyTree = (node) => {
    if (!node) return null;
    const newNode = new AVLNode(node.value);
    newNode.height = node.height;
    newNode.left = copyTree(node.left);
    newNode.right = copyTree(node.right);
    return newNode;
  };

  const renderNode = (node) => {
    if (!node) return null;
    const balance = avl.getBalance(node);
    return (
      <g key={`${node.value}-${node.x}-${node.y}`}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#64748b" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#64748b" strokeWidth="2" />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={Math.abs(balance) > 1 ? '#ef4444' : '#10b981'}
          stroke="#60a5fa"
          strokeWidth="2"
        />
        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">
          {node.value}
        </text>
        <text x={node.x} y={node.y + 35} textAnchor="middle" fill="#94a3b8" fontSize="10">
          h:{node.height} b:{balance}
        </text>
        {node.left && renderNode(node.left)}
        {node.right && renderNode(node.right)}
      </g>
    );
  };

  const renderTree = () => {
    if (!avl.root) return null;
    calculatePositions(avl.root, 300, 40, 120);
    return renderNode(avl.root);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && insert()}
          className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
          placeholder="Enter value..."
        />
        <button onClick={insert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Insert
        </button>
        <button onClick={() => setAvl(new AVLTree())} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Clear
        </button>
      </div>
      {message && <div className="mb-4 bg-green-900 bg-opacity-50 border border-green-500 rounded p-2 text-green-200 text-sm">{message}</div>}
      <div className="bg-slate-900 rounded-lg">
        <svg width="600" height="350" className="w-full">
          {avl.root ? renderTree() : (
            <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="16">
              Insert values - AVL tree auto-balances!
            </text>
          )}
        </svg>
      </div>
      <div className="mt-4 text-sm text-slate-400">
        <strong>Info:</strong> h = height, b = balance factor | <strong className="text-green-400">Green</strong> = balanced | <strong className="text-red-400">Red</strong> = unbalanced
      </div>
    </div>
  );
}

// ============= DYNAMIC PROGRAMMING VISUALIZER =============
function DPVisualizer() {
  const [problem, setProblem] = useState('fibonacci');
  const [n, setN] = useState(10);
  const [running, setRunning] = useState(false);
  const [dpTable, setDpTable] = useState([]);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fibonacci = async () => {
    setRunning(true);
    const dp = Array(n + 1).fill(null);
    const stepLog = [];
    
    dp[0] = 0;
    dp[1] = 1;
    setDpTable([...dp]);
    await sleep(500);
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      stepLog.push(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
      setDpTable([...dp]);
      setSteps([...stepLog]);
      await sleep(300);
    }
    
    setResult(dp[n]);
    setRunning(false);
  };

  const coinChange = async () => {
    setRunning(true);
    const coins = [1, 2, 5];
    const dp = Array(n + 1).fill(Infinity);
    const stepLog = [];
    
    dp[0] = 0;
    setDpTable([...dp]);
    await sleep(500);
    
    for (let i = 1; i <= n; i++) {
      for (let coin of coins) {
        if (i >= coin && dp[i - coin] !== Infinity) {
          const newVal = dp[i - coin] + 1;
          if (newVal < dp[i]) {
            dp[i] = newVal;
            stepLog.push(`dp[${i}] = min(dp[${i}], dp[${i-coin}] + 1) = ${newVal} (using coin ${coin})`);
          }
        }
      }
      setDpTable([...dp]);
      setSteps([...stepLog]);
      await sleep(300);
    }
    
    setResult(dp[n] === Infinity ? 'Impossible' : dp[n]);
    setRunning(false);
  };

  const solve = () => {
    setDpTable([]);
    setSteps([]);
    setResult(null);
    if (problem === 'fibonacci') fibonacci();
    else if (problem === 'coinChange') coinChange();
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <select
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="bg-slate-700 text-white rounded px-3 py-2"
          disabled={running}
        >
          <option value="fibonacci">Fibonacci Number</option>
          <option value="coinChange">Coin Change (coins: 1,2,5)</option>
        </select>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          className="bg-slate-700 text-white rounded px-3 py-2 w-24"
          placeholder="n"
          min="1"
          max="20"
          disabled={running}
        />
        <button onClick={solve} disabled={running} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Zap size={18} /> Solve
        </button>
      </div>

      {result !== null && (
        <div className="mb-4 bg-green-900 bg-opacity-50 border border-green-500 rounded p-3 text-green-200">
          <strong>Result:</strong> {result}
        </div>
      )}

      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <h3 className="text-white font-semibold mb-2">DP Table:</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {dpTable.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-slate-400 text-xs mb-1">[{idx}]</div>
              <div className={`w-12 h-12 flex items-center justify-center rounded font-semibold text-sm ${
                val === null ? 'bg-slate-700 text-slate-500' : 
                val === Infinity ? 'bg-red-900 text-red-200' :
                'bg-blue-600 text-white'
              }`}>
                {val === null ? '?' : val === Infinity ? '∞' : val}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 max-h-[200px] overflow-y-auto">
        <h3 className="text-white font-semibold mb-2">Steps:</h3>
        {steps.length === 0 ? (
          <p className="text-slate-500 text-sm">Click Solve to see steps...</p>
        ) : (
          <div className="space-y-1">
            {steps.map((step, idx) => (
              <div key={idx} className="text-slate-300 text-sm font-mono">
                {idx + 1}. {step}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function DSAVisualizer() {
  const [currentTopic, setCurrentTopic] = useState('home');

  const topics = [
    { id: 'bst', name: 'Binary Search Tree', description: 'Visualize BST operations', icon: '🌳', color: 'from-blue-600 to-blue-500' },
    { id: 'sorting', name: 'Sorting Algorithms', description: 'Watch sorting in action', icon: '📊', color: 'from-green-600 to-green-500' },
    { id: 'stack', name: 'Stack', description: 'LIFO data structure', icon: '📚', color: 'from-purple-600 to-purple-500' },
    { id: 'queue', name: 'Queue', description: 'FIFO data structure', icon: '🚶', color: 'from-pink-600 to-pink-500' },
    { id: 'linkedlist', name: 'Linked List', description: 'Dynamic linear structure', icon: '🔗', color: 'from-teal-600 to-teal-500' },
    { id: 'graph', name: 'Graph Algorithms', description: 'BFS, DFS traversals', icon: '🕸️', color: 'from-orange-600 to-orange-500' },
    { id: 'heap', name: 'Heap', description: 'Min/Max heap operations', icon: '⛰️', color: 'from-violet-600 to-violet-500' },
    { id: 'hashtable', name: 'Hash Table', description: 'Collision handling with chaining', icon: '🗂️', color: 'from-amber-600 to-amber-500' },
    { id: 'avl', name: 'AVL Tree', description: 'Self-balancing BST', icon: '⚖️', color: 'from-emerald-600 to-emerald-500' },
    { id: 'dp', name: 'Dynamic Programming', description: 'Visualize DP solutions', icon: '🧮', color: 'from-indigo-600 to-indigo-500' },
  ];

  const renderContent = () => {
    switch (currentTopic) {
      case 'bst': return <BSTVisualizer />;
      case 'sorting': return <SortingVisualizer />;
      case 'stack': return <StackVisualizer />;
      case 'queue': return <QueueVisualizer />;
      case 'linkedlist': return <LinkedListVisualizer />;
      case 'graph': return <GraphVisualizer />;
      case 'heap': return <HeapVisualizer />;
      case 'hashtable': return <HashTableVisualizer />;
      case 'avl': return <AVLTreeVisualizer />;
      case 'dp': return <DPVisualizer />;
      default: return null;
    }
  };

  if (currentTopic === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">DSA Visualizer</h1>
            <p className="text-xl text-purple-200">Interactive Data Structures & Algorithms Platform</p>
            <p className="text-slate-400 mt-2">Learn through visualization and animation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setCurrentTopic(topic.id)}
                className="bg-slate-800 rounded-xl p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl border border-slate-700 hover:border-purple-500"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {topic.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{topic.name}</h3>
                <p className="text-slate-400 mb-4">{topic.description}</p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
                  Explore →
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
            <div className="flex items-start gap-4">
              <Info className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">How to Use</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Click on any topic card to start visualizing</li>
                  <li>• Follow the interactive controls to perform operations</li>
                  <li>• Watch animations to understand how algorithms work</li>
                  <li>• Perfect for students, teachers, and interview preparation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTopicData = topics.find(t => t.id === currentTopic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setCurrentTopic('home')}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentTopicData.color} rounded-lg flex items-center justify-center text-2xl`}>
              {currentTopicData.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{currentTopicData.name}</h2>
              <p className="text-slate-400">{currentTopicData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}