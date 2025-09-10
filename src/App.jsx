import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompassMenu from './components/CompassMenu';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './pages/Dashboard';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import GameCatalog from './pages/GameCatalog';
import { useFriends, useMessages } from './hooks/useFriends';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const friendsHook = useFriends();
  const messagesHook = useMessages();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <GameCatalog />;
      case 'friends':
        return <Friends {...friendsHook} />;
      case 'messages':
        return <Messages {...messagesHook} friends={friendsHook.friends} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <ParticleBackground />
      <Header 
        currentPage={currentPage}
        unreadMessages={messagesHook.getTotalUnreadCount()}
        friendRequests={friendsHook.friendRequests.length}
      />
      <div className="app-content">
        <main className="main-content full-width animate-fadeInUp">
          {renderPage()}
        </main>
        <CompassMenu 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          unreadMessages={messagesHook.getTotalUnreadCount()}
          friendRequests={friendsHook.friendRequests.length}
        />
      </div>
    </div>
  );
}

export default App;
