import React, { useState } from 'react';
import HomePage from './components/Layout/HomePage';
import TopicLayout from './components/Layout/TopicLayout';
import { topics } from './data/topicsData';

export default function App() {
  const [currentTopic, setCurrentTopic] = useState('home');

  if (currentTopic === 'home') {
    return <HomePage topics={topics} setCurrentTopic={setCurrentTopic} />;
  }

  const currentTopicData = topics.find(t => t.id === currentTopic);

  return (
    <TopicLayout
      topic={currentTopicData}
      setCurrentTopic={setCurrentTopic}
    />
  );
}