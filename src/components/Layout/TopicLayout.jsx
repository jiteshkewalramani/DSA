import SEOHead from '../SEO/SEOHead';
import { TOPIC_ROUTES, SEO_DATA } from '../../config/routes';
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

export default function TopicLayout({ topic }) {
  const route = TOPIC_ROUTES[topic.id];
  const seoData = SEO_DATA[route];

  const renderVisualizer = () => {
    switch (topic.id) {
      case 'bst': return <BSTVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'sorting': return <SortingVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'stack': return <StackVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'queue': return <QueueVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'linkedlist': return <LinkedListVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'graph': return <GraphVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'heap': return <HeapVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'hashtable': return <HashTableVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'avl': return <AVLTreeVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      case 'dp': return <DPVisualizer pseudoCode={topic.pseudoCode} topic={topic} />;
      default: return null;
    }
  };

  return (
    <>
      <SEOHead {...seoData} canonicalUrl={route} />
      {renderVisualizer()}
    </>
  );
}
