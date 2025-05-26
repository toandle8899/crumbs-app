import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { Learn } from './pages/Learn';
import { Quiz } from './components/Quiz';
import { Navigation } from './components/Navigation';
import { Chat } from './pages/Chat';
export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoCount, setVideoCount] = useState(0);
  // Handle video view count and trigger quiz after every 5 videos
  const handleVideoViewed = () => {
    const newCount = videoCount + 1;
    setVideoCount(newCount);
    if (newCount % 5 === 0) {
      setShowQuiz(true);
    }
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'upload':
        return <Upload onNavigate={setCurrentPage} />;
      case 'learn':
        return <Learn onVideoViewed={handleVideoViewed} />;
      case 'chat':
        return <Chat />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };
  return <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>;
}