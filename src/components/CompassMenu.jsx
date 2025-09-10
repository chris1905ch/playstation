import { useState } from 'react';
import { Home, Users, MessageSquare, User, Trophy, Gamepad2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

const CompassMenu = ({ currentPage, setCurrentPage, unreadMessages, friendRequests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Inicio',
      icon: Home,
      badge: null,
      angle: 90 // Centro arriba
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: ShoppingBag,
      badge: null,
      angle: 141.4 // 90 + 51.4
    },
    {
      id: 'friends',
      label: 'Amigos',
      icon: Users,
      badge: friendRequests > 0 ? friendRequests : null,
      angle: 192.8 // 90 + 102.8
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages : null,
      angle: 244.2 // 90 + 154.2
    },
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: User,
      badge: null,
      angle: 295.6 // 90 + 205.6
    },
    {
      id: 'games',
      label: 'Mis Juegos',
      icon: Gamepad2,
      badge: null,
      angle: 347 // 90 + 257
    },
    {
      id: 'trophies',
      label: 'Trofeos',
      icon: Trophy,
      badge: null,
      angle: 38.4 // 90 + 308.4 - 360
    }
  ];

  const getVisibleItems = () => {
    const visibleAngle = 100; // Rango de 100 grados para mostrar 3 elementos
    
    return menuItems.filter(item => {
      const adjustedAngle = ((item.angle - currentRotation + 360) % 360);
      // Mostrar elementos en un rango centrado de 100 grados (desde 40° hasta 140°)
      return adjustedAngle >= 40 && adjustedAngle <= 140;
    });
  };

  const rotateLeft = () => {
    setCurrentRotation((prev) => (prev - 51.4 + 360) % 360);
  };

  const rotateRight = () => {
    setCurrentRotation((prev) => (prev + 51.4) % 360);
  };

  const getPositionStyle = (angle) => {
    const adjustedAngle = angle - currentRotation;
    const distance = 120;
    const radians = (adjustedAngle * Math.PI) / 180;
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;
    
    // El elemento central está a 90 grados
    const distanceFromCenter = Math.abs(adjustedAngle - 90);
    const isCenter = distanceFromCenter < 26; // Aproximadamente 51.4/2
    const opacity = isCenter ? 1 : 0.6;
    const scale = isCenter ? 1.1 : 0.9;
    
    return {
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
      opacity: opacity,
      zIndex: isCenter ? 10 : 5
    };
  };

  const handleItemClick = (itemId) => {
    if (['dashboard', 'catalog', 'friends', 'messages', 'profile'].includes(itemId)) {
      setCurrentPage(itemId);
    }
    setIsOpen(false);
  };

  const visibleItems = getVisibleItems();

  return (
    <div 
      className="compass-menu"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        className={`compass-center ${isOpen ? 'open' : ''}`}
      >
        {/* Logo PlayStation */}
        <div className="playstation-logo">
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

        {/* Flechas de navegación */}
        <div className={`navigation-arrows ${isOpen ? 'visible' : ''}`}>
          <button 
            className="nav-arrow nav-arrow-left"
            onClick={rotateLeft}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="nav-arrow nav-arrow-right"
            onClick={rotateRight}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Elementos del menú */}
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`compass-item ${isOpen ? 'visible' : ''} ${currentPage === item.id ? 'active' : ''}`}
              style={getPositionStyle(item.angle)}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="compass-item-content">
                <Icon size={20} />
                {item.badge && (
                  <span className="compass-badge">{item.badge}</span>
                )}
              </div>
              <span className="compass-tooltip">{item.label}</span>
            </div>
          );
        })}

        {/* Información PlayStation Plus */}
        <div className={`plus-indicator ${isOpen ? 'visible' : ''}`}>
          <div className="plus-badge-small">PLUS</div>
        </div>

        {/* Indicador de navegación */}
        <div className={`navigation-indicator ${isOpen ? 'visible' : ''}`}>
          <div className="indicator-dots">
            {Array.from({ length: 7 }, (_, index) => (
              <div 
                key={index}
                className={`indicator-dot ${Math.floor(currentRotation / 51.4) === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassMenu;
