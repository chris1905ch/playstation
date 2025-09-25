import { useState } from 'react';
import CompassMenu from './components/CompassMenu';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import Dashboard from './pages/Dashboard';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import GameCatalog from './pages/GameCatalog';
import Cart from './components/Cart';
import MyGames from './components/MyGames';
import Notifications from './pages/Notifications';
import Login from './components/Login';
import { useFriends, useMessages } from './hooks/useFriends';
import { useNotifications } from './hooks/useNotifications';
import useCart from './hooks/useCart';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import './App.css';

function AuthenticatedApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAuth();
  const friendsHook = useFriends();
  const messagesHook = useMessages();
  const notificationsHook = useNotifications();
  const { getTotalItems } = useCart();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <GameCatalog />;
      case 'cart':
        return <Cart />;
      case 'friends':
        return <Friends {...friendsHook} />;
      case 'messages':
        return <Messages {...messagesHook} friends={friendsHook.friends} />;
      case 'profile':
        return <Profile />;
      case 'notifications':
        return <Notifications {...notificationsHook} />;
      case 'games':
        return <MyGames />; // Ahora usa el componente específico para juegos comprados
      case 'trophies':
        return <Profile />; // Por ahora usa Profile, se puede crear una sección de trofeos
      case 'store':
        return <GameCatalog />; // Store usando GameCatalog
      case 'community':
        return <Friends {...friendsHook} />; // Community usando Friends
      case 'admin':
        return <Dashboard />; // Admin panel usando Dashboard
      default:
        return <Dashboard />;
    }
  };

  const currentUser = {
    id: 1,
    username: 'LudereNet_User',
    displayName: 'LudereNet Gamer',
    email: 'user@luderenet.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: 42,
    trophies: 1337,
    role: 'user'
  };

  const handleLogout = () => {
    // Lógica de logout si es necesaria
  };

  return (
    <div className="app">
      <ParticleBackground />
      <Header 
        currentPage={currentPage} 
        unreadMessages={messagesHook.getTotalUnreadCount()}
        friendRequests={friendsHook.friendRequests.length}
        unreadNotifications={notificationsHook.unreadCount}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
      />
      <div className="app-content">
        {/* Sidebar for desktop */}
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          unreadMessages={messagesHook.getTotalUnreadCount()}
          friendRequests={friendsHook.friendRequests.length}
          unreadNotifications={notificationsHook.unreadCount}
          cartItemCount={getTotalItems()}
          isAdmin={false}
        />
        
        <main className="main-content">
          {renderPage()}
        </main>
        
        {/* CompassMenu for mobile */}
        <CompassMenu 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          unreadMessages={messagesHook.getTotalUnreadCount()}
          friendRequests={friendsHook.friendRequests.length}
          unreadNotifications={notificationsHook.unreadCount}
          cartItemCount={getTotalItems()}
          isAdmin={false}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando LudereNet...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <AuthenticatedApp />;
}

export default App;