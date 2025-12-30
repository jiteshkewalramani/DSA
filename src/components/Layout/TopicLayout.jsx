import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ConceptPanel from '../Shared/ConceptPanel';
import BSTVisualizer from '../Visualizers/BSTVisualizer';
import SortingVisualizer from '../Visualizers/SortingVisualizer';
import StackVisualizer from '../Visualizers/StackVisualizer';
import QueueVisualizer from '../Visualizers/QueueVisualizer';
import LinkedListVisualizer from '../Visualizers/LinkedListVisualizer';
import GraphVisualizer from '../Visualizers/GraphVisualizer';
import HeapVisualizer from '../Visualizers/HeapVisualizer';
import HashTableVisualizer from '../Visualizers/HashTableVisualizer';
import AVLTreeVisualizer from '../Visualizers/AVLTreeVisualizer';
import DPVisualizer from '../Visualizers/DPVisualizer';

export default function TopicLayout({ topic, setCurrentTopic }) {
  const renderVisualizer = () => {
    switch (topic.id) {
      case 'bst': return <BSTVisualizer pseudoCode={topic.pseudoCode} />;
      case 'sorting': return <SortingVisualizer pseudoCode={topic.pseudoCode} />;
      case 'stack': return <StackVisualizer pseudoCode={topic.pseudoCode} />;
      case 'queue': return <QueueVisualizer pseudoCode={topic.pseudoCode} />;
      case 'linkedlist': return <LinkedListVisualizer pseudoCode={topic.pseudoCode} />;
      case 'graph': return <GraphVisualizer pseudoCode={topic.pseudoCode} />;
      case 'heap': return <HeapVisualizer pseudoCode={topic.pseudoCode} />;
      case 'hashtable': return <HashTableVisualizer pseudoCode={topic.pseudoCode} />;
      case 'avl': return <AVLTreeVisualizer pseudoCode={topic.pseudoCode} />;
      case 'dp': return <DPVisualizer pseudoCode={topic.pseudoCode} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
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
            <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center text-2xl`}>
              {topic.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{topic.name}</h2>
              <p className="text-slate-400">{topic.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ConceptPanel concept={topic.concept} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          {renderVisualizer()}
        </div>
      </div>
    </div>
  );
}
