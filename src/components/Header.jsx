import { Search, Bell, Settings, User, LogOut, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const Header = ({ currentPage, unreadMessages, friendRequests, unreadNotifications, currentUser, onLogout, onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'LudereNet';
      case 'friends':
        return 'Amigos';
      case 'messages':
        return 'Mensajes';
      case 'profile':
        return 'Perfil';
      case 'catalog':
        return 'Catálogo de Juegos';
      case 'notifications':
        return 'Notificaciones';
      case 'admin':
        return 'Panel de Administración';
      default:
        return 'LudereNet';
    }
  };

  const totalNotifications = unreadNotifications || 0;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">LudereNet</span>
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
          <button 
            className="notification-btn"
            onClick={() => onNavigate('notifications')}
            title="Ver notificaciones"
          >
            <Bell size={20} />
            {totalNotifications > 0 && (
              <span className="notification-badge">{totalNotifications}</span>
            )}
          </button>
          
          <button 
            className="cart-btn"
            onClick={() => onNavigate('cart')}
            title="Ver carrito"
          >
            <ShoppingCart size={20} />
          </button>

          <button className="settings-btn">
            <Settings size={20} />
          </button>

          <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.displayName}
              className="user-avatar"
            />
            <div className="user-info">
              <span className="username">{currentUser?.displayName}</span>
              <span className="user-level">
                Nivel {currentUser?.level} • {currentUser?.trophies} trofeos
              </span>
            </div>

            {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-header">
                  <img src={currentUser?.avatar} alt={currentUser?.displayName} />
                  <div>
                    <div className="menu-username">{currentUser?.displayName}</div>
                    <div className="menu-email">@{currentUser?.username}</div>
                  </div>
                </div>
                
                <div className="user-menu-actions">
                  <button className="menu-action" onClick={() => setShowUserMenu(false)}>
                    <User size={16} />
                    Ver Perfil
                  </button>
                  
                  <button className="menu-action" onClick={() => setShowUserMenu(false)}>
                    <Settings size={16} />
                    Configuración
                  </button>
                  
                  <hr className="menu-divider" />
                  
                  <button className="menu-action" onClick={() => {
                    setShowUserMenu(false);
                    alert('Funcionalidad de cerrar sesión - En una app real aquí se haría logout');
                  }}>
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showUserMenu && (
        <div 
          className="user-menu-overlay" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
