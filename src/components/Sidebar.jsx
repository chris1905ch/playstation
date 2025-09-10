import { Home, Users, MessageSquare, User, Trophy, Gamepad2, ShoppingBag } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, unreadMessages, friendRequests }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: Home,
      badge: null
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: ShoppingBag,
      badge: null
    },
    {
      id: 'friends',
      label: 'Amigos',
      icon: Users,
      badge: friendRequests > 0 ? friendRequests : null
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages : null
    },
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: User,
      badge: null
    }
  ];

  const quickActions = [
    {
      id: 'games',
      label: 'Mis Juegos',
      icon: Gamepad2
    },
    {
      id: 'trophies',
      label: 'Trofeos',
      icon: Trophy
    }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Principal</h3>
          <ul className="nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">Acceso Rápido</h3>
          <ul className="nav-list">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button className="nav-item">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="plus-status">
          <div className="plus-badge">PLUS</div>
          <div className="plus-info">
            <span className="plus-text">Miembro activo</span>
            <span className="plus-expiry">Válido hasta: Mar 2025</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
