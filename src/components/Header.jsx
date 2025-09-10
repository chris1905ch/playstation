import { Search, Bell, Settings, User } from 'lucide-react';
import { mockUser } from '../data/mockData';

const Header = ({ currentPage, unreadMessages, friendRequests }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'PlayStation Plus';
      case 'friends':
        return 'Amigos';
      case 'messages':
        return 'Mensajes';
      case 'profile':
        return 'Perfil';
      case 'catalog':
        return 'Catálogo de Juegos';
      default:
        return 'PlayStation Plus';
    }
  };

  const totalNotifications = unreadMessages + friendRequests;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">PlayStation</span>
            <span className="logo-plus">Plus</span>
          </div>
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>

        <div className="header-center">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar amigos, juegos..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="notification-btn">
            <Bell size={20} />
            {totalNotifications > 0 && (
              <span className="notification-badge">{totalNotifications}</span>
            )}
          </button>
          
          <button className="settings-btn">
            <Settings size={20} />
          </button>

          <div className="user-profile">
            <img 
              src={mockUser.avatar} 
              alt={mockUser.username}
              className="user-avatar"
            />
            <div className="user-info">
              <span className="username">{mockUser.username}</span>
              <span className="user-level">Nivel {mockUser.level}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
