import { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  MessageSquare, 
  User, 
  Trophy, 
  Gamepad2, 
  ShoppingBag, 
  Shield,
  Bell,
  Library,
  Store,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const Sidebar = ({ currentPage, setCurrentPage, unreadMessages, friendRequests, unreadNotifications, isAdmin, cartItemCount }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { user, logout } = useAuth();

  // Menu items configuration
  const createMenuItems = () => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Inicio',
        icon: Home,
        badge: null,
        category: 'main',
        description: 'Página principal con estadísticas'
      },
      {
        id: 'catalog',
        label: 'Catálogo',
        icon: Library,
        badge: null,
        category: 'games',
        description: 'Explorar catálogo de juegos'
      },
      {
        id: 'store',
        label: 'LudereNet Store',
        icon: Store,
        badge: null,
        category: 'games',
        description: 'Comprar y descargar juegos'
      },
      {
        id: 'cart',
        label: 'Carrito',
        icon: ShoppingCart,
        badge: cartItemCount > 0 ? cartItemCount : null,
        category: 'shopping',
        description: 'Ver carrito de compras'
      },
      {
        id: 'friends',
        label: 'Amigos',
        icon: Users,
        badge: friendRequests > 0 ? friendRequests : null,
        category: 'social',
        description: 'Gestionar amigos y solicitudes'
      },
      {
        id: 'messages',
        label: 'Mensajes',
        icon: MessageSquare,
        badge: unreadMessages > 0 ? unreadMessages : null,
        category: 'social',
        description: 'Chat y comunicación'
      },

      {
        id: 'games',
        label: 'Mis Juegos',
        icon: Gamepad2,
        badge: null,
        category: 'games',
        description: 'Biblioteca personal de juegos'
      },
      {
        id: 'trophies',
        label: 'Trofeos',
        icon: Trophy,
        badge: null,
        category: 'achievement',
        description: 'Logros y trofeos obtenidos'
      },
      {
        id: 'notifications',
        label: 'Notificaciones',
        icon: Bell,
        badge: unreadNotifications > 0 ? unreadNotifications : null,
        category: 'system',
        description: 'Centro de notificaciones'
      },
      {
        id: 'profile',
        label: 'Mi Perfil',
        icon: User,
        badge: null,
        category: 'personal',
        description: 'Configurar perfil y sistema'
      }
    ];

    // Add admin option if user is admin
    if (isAdmin) {
      baseItems.push({
        id: 'admin',
        label: 'Administración',
        icon: Shield,
        badge: null,
        category: 'admin',
        description: 'Panel de administración'
      });
    }

    return baseItems;
  };

  const menuItems = createMenuItems();

  // Handle item click
  const handleItemClick = (itemId) => {
    if (['dashboard', 'catalog', 'store', 'cart', 'friends', 'messages', 'games', 'trophies', 'notifications', 'profile', 'admin'].includes(itemId)) {
      setCurrentPage(itemId);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setCurrentPage('dashboard');
            break;
          case '2':
            e.preventDefault();
            setCurrentPage('catalog');
            break;
          case '3':
            e.preventDefault();
            setCurrentPage('store');
            break;
          case '4':
            e.preventDefault();
            setCurrentPage('friends');
            break;
          case '5':
            e.preventDefault();
            setCurrentPage('messages');
            break;
          case '6':
            e.preventDefault();
            setCurrentPage('community');
            break;
          case '7':
            e.preventDefault();
            setCurrentPage('games');
            break;
          case '8':
            e.preventDefault();
            setCurrentPage('trophies');
            break;
          case '9':
            e.preventDefault();
            setCurrentPage('notifications');
            break;
          case '0':
            e.preventDefault();
            setCurrentPage('profile');
            break;
          case 'a':
          case 'A':
            if (isAdmin) {
              e.preventDefault();
              setCurrentPage('admin');
            }
            break;

          case 'b':
          case 'B':
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdmin, isCollapsed]);

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button - Always visible */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expandir sidebar (Ctrl+B)" : "Contraer sidebar (Ctrl+B)"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 50 50" className="ps-logo">
              <path
                d="M20.5 18.75c0-2.5-1.5-4.5-4-4.5s-4.5 2-4.5 4.5v12.5c0 2.5 2 4.5 4.5 4.5s4-2 4-4.5v-12.5zm-6 12.5v-12.5c0-1.5 1-2.5 2.5-2.5s2 1 2 2.5v12.5c0 1.5-1 2.5-2 2.5s-2.5-1-2.5-2.5z"
                fill="currentColor"
              />
              <path
                d="M35 14.25c-2.5 0-4.5 2-4.5 4.5v7.5h-2v2h2v2.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5v-11.5c0-2.5-2-4.5-4.5-4.5zm2.5 16c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5v-11.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v11.5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-main">LudereNet</span>
            <span className="logo-plus">
              <Star size={12} />
              Plus
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <div
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              title={isCollapsed ? item.label : ''}
            >
              <div className="sidebar-item-content">
                <div className="item-icon">
                  <Icon size={20} />
                  {item.badge && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </div>
                <div className="item-info">
                  <span className="item-label">{item.label}</span>
                  <span className="item-description">{item.description}</span>
                </div>
              </div>
              
              {/* Hover tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="sidebar-tooltip">
                  <div className="tooltip-title">{item.label}</div>
                  <div className="tooltip-description">{item.description}</div>
                  {item.badge && (
                    <div className="tooltip-badge">{item.badge} notificaciones</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* User Info */}
        <div className="user-info">
          <div className="user-avatar">
            <img src={user?.avatar} alt={user?.username} />
            {user?.hasPlus && (
              <div className="plus-indicator">
                <Star size={12} />
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="user-details">
              <div className="user-name">{user?.username}</div>
              <div className="user-level">Nivel {user?.level}</div>
              {user?.hasPlus ? (
                <div className="plus-status">PlayStation Plus</div>
              ) : (
                <div className="standard-status">Cuenta Estándar</div>
              )}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button 
          className="logout-btn"
          onClick={logout}
          title="Cerrar sesión"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>

        <div className="sidebar-info">
          <div className="keyboard-hint">
            <span>Presiona Ctrl+B para contraer</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
