import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Layout/HomePage';
import TopicLayout from './components/Layout/TopicLayout';
import NotFoundPage from './components/Layout/NotFoundPage';
import { topics } from './data/topicsData';
import { ROUTES } from './config/routes';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router basename="/DSA">
        <Routes>
          {/* Home Route */}
          <Route path={ROUTES.HOME} element={<HomePage topics={topics} />} />

          {/* Topic Routes */}
          <Route path={ROUTES.BST} element={<TopicLayout topic={topics.find(t => t.id === 'bst')} />} />
          <Route path={ROUTES.SORTING} element={<TopicLayout topic={topics.find(t => t.id === 'sorting')} />} />
          <Route path={ROUTES.STACK} element={<TopicLayout topic={topics.find(t => t.id === 'stack')} />} />
          <Route path={ROUTES.QUEUE} element={<TopicLayout topic={topics.find(t => t.id === 'queue')} />} />
          <Route path={ROUTES.LINKED_LIST} element={<TopicLayout topic={topics.find(t => t.id === 'linkedlist')} />} />
          <Route path={ROUTES.GRAPH} element={<TopicLayout topic={topics.find(t => t.id === 'graph')} />} />
          <Route path={ROUTES.HEAP} element={<TopicLayout topic={topics.find(t => t.id === 'heap')} />} />
          <Route path={ROUTES.HASH_TABLE} element={<TopicLayout topic={topics.find(t => t.id === 'hashtable')} />} />
          <Route path={ROUTES.AVL} element={<TopicLayout topic={topics.find(t => t.id === 'avl')} />} />
          <Route path={ROUTES.DP} element={<TopicLayout topic={topics.find(t => t.id === 'dp')} />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

