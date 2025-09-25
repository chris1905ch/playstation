import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Users, 
  MessageSquare, 
  User, 
  Trophy, 
  Gamepad2, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Shield,
  Search,
  Star,
  RotateCcw,
  Store,
  Bell,
  Globe,
  Library,
  PlayCircle,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

const CompassMenu = ({ currentPage, setCurrentPage, unreadMessages, friendRequests, unreadNotifications, cartItemCount, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(-90); // Iniciar con "Inicio" centrado
  const [isHovering, setIsHovering] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(false);
  const [shortcutsMode, setShortcutsMode] = useState(false);
  
  const { user, logout } = useAuth();
  const compassRef = useRef(null);
  const autoRotateRef = useRef(null);

  // Auto-rotate functionality
  useEffect(() => {
    if (autoRotateEnabled && !isHovering && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        setCurrentRotation((prev) => (prev + 1) % 360);
      }, 100);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [autoRotateEnabled, isHovering, isDragging]);

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

          case 'ArrowLeft':
            e.preventDefault();
            rotateLeft();
            break;
          case 'ArrowRight':
            e.preventDefault();
            rotateRight();
            break;
          case ' ':
            e.preventDefault();
            setIsOpen(!isOpen);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isAdmin]);

  // Enhanced menu items with categories and priorities
  const createMenuItems = () => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Inicio',
        icon: Home,
        badge: null,
        angle: 0,
        category: 'main',
        priority: 1,
        shortcut: 'Ctrl+1',
        description: 'Página principal con estadísticas'
      },
      {
        id: 'catalog',
        label: 'Catálogo',
        icon: Library,
        badge: null,
        angle: 30,
        category: 'games',
        priority: 2,
        shortcut: 'Ctrl+2',
        description: 'Explorar catálogo de juegos'
      },
      {
        id: 'store',
        label: 'LudereNet Store',
        icon: Store,
        badge: null,
        angle: 60,
        category: 'games',
        priority: 3,
        shortcut: 'Ctrl+3',
        description: 'Comprar y descargar juegos'
      },
      {
        id: 'cart',
        label: 'Carrito',
        icon: ShoppingCart,
        badge: cartItemCount > 0 ? cartItemCount : null,
        angle: 90,
        category: 'shopping',
        priority: 4,
        shortcut: 'Ctrl+4',
        description: 'Ver carrito de compras'
      },
      {
        id: 'friends',
        label: 'Amigos',
        icon: Users,
        badge: friendRequests > 0 ? friendRequests : null,
        angle: 120,
        category: 'social',
        priority: 5,
        shortcut: 'Ctrl+5',
        description: 'Gestionar amigos y solicitudes'
      },
      {
        id: 'messages',
        label: 'Mensajes',
        icon: MessageSquare,
        badge: unreadMessages > 0 ? unreadMessages : null,
        angle: 150,
        category: 'social',
        priority: 6,
        shortcut: 'Ctrl+6',
        description: 'Chat y comunicación'
      },
      {
        id: 'community',
        label: 'Comunidad',
        icon: Globe,
        badge: null,
        angle: 180,
        category: 'social',
        priority: 7,
        shortcut: 'Ctrl+7',
        description: 'Comunidad y eventos LudereNet'
      },
      {
        id: 'games',
        label: 'Mis Juegos',
        icon: Gamepad2,
        badge: null,
        angle: 210,
        category: 'games',
        priority: 8,
        shortcut: 'Ctrl+8',
        description: 'Biblioteca personal de juegos'
      },
      {
        id: 'trophies',
        label: 'Trofeos',
        icon: Trophy,
        badge: null,
        angle: 240,
        category: 'achievement',
        priority: 9,
        shortcut: 'Ctrl+9',
        description: 'Logros y trofeos obtenidos'
      },
      {
        id: 'notifications',
        label: 'Notificaciones',
        icon: Bell,
        badge: unreadMessages > 0 ? unreadMessages : null,
        angle: 270,
        category: 'system',
        priority: 10,
        shortcut: 'Ctrl+0',
        description: 'Centro de notificaciones'
      },
      {
        id: 'profile',
        label: 'Mi Perfil',
        icon: User,
        badge: null,
        angle: 300,
        category: 'personal',
        priority: 11,
        shortcut: 'Ctrl+P',
        description: 'Configurar perfil y sistema'
      }
    ];

    // Agregar opciones especiales según el contexto
    if (isAdmin) {
      baseItems.push({
        id: 'admin',
        label: 'Administración',
        icon: Shield,
        badge: null,
        angle: 330,
        category: 'admin',
        priority: 0,
        shortcut: 'Ctrl+A',
        description: 'Panel de administración'
      });
    }

    return baseItems;
  };

  const menuItems = createMenuItems();

  // Enhanced visibility calculation with smooth transitions
  const getVisibleItems = () => {
    const visibleAngle = 140; // Aumentar el rango visible para mostrar más elementos
    
    return menuItems.filter(item => {
      const adjustedAngle = ((item.angle - currentRotation + 360) % 360);
      return adjustedAngle >= 20 && adjustedAngle <= 160; // Rango más amplio
    });
  };

  // Smooth rotation with easing
  const rotateLeft = () => {
    setCurrentRotation((prev) => {
      const newRotation = (prev - 30 + 360) % 360; // 30 grados por elemento
      return newRotation;
    });
  };

  const rotateRight = () => {
    setCurrentRotation((prev) => {
      const newRotation = (prev + 30) % 360; // 30 grados por elemento
      return newRotation;
    });
  };

  // Enhanced position calculation with 3D effects
  const getPositionStyle = (angle) => {
    const adjustedAngle = angle - currentRotation;
    const distance = 120; // Reducido de 140 a 120 para acercar más al centro
    const radians = (adjustedAngle * Math.PI) / 180;
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;
    
    const distanceFromCenter = Math.abs(adjustedAngle - 90);
    const isCenter = distanceFromCenter < 18; // Reducir de 26 a 18 porque hay más elementos
    const isSideItem = distanceFromCenter > 18 && distanceFromCenter < 36;
    
    let opacity = 1;
    let scale = 1;
    let zIndex = 5;
    let blur = 0;
    
    if (isCenter) {
      opacity = 1;
      scale = 1.2;
      zIndex = 15;
      blur = 0;
    } else if (isSideItem) {
      opacity = 0.8;
      scale = 0.95;
      zIndex = 10;
      blur = 0.5;
    } else {
      opacity = 0.4;
      scale = 0.8;
      zIndex = 5;
      blur = 1;
    }
    
    return {
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: `blur(${blur}px)`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // Enhanced click handler with animations
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    
    // Add selection animation
    setTimeout(() => {
      if (['dashboard', 'catalog', 'store', 'cart', 'friends', 'messages', 'community', 'games', 'trophies', 'notifications', 'profile', 'admin'].includes(itemId)) {
        setCurrentPage(itemId);
      }
      setIsOpen(false);
      setSelectedItem(null);
    }, 150);
  };

  // Touch/drag support for rotation
  const handleMouseDown = (e) => {
    if (!compassRef.current) return;
    
    const rect = compassRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    
    setIsDragging(true);
    setDragStartAngle(angle);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !compassRef.current) return;
    
    const rect = compassRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    
    const deltaAngle = (angle - dragStartAngle) * (180 / Math.PI);
    setCurrentRotation((prev) => (prev - deltaAngle + 360) % 360);
    setDragStartAngle(angle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStartAngle]);

  const visibleItems = getVisibleItems();
  
  // Encontrar el item exactamente en el centro (90°) con mejor algoritmo
  const centerItem = visibleItems.find(item => {
    let adjustedAngle = ((item.angle - currentRotation + 360) % 360);
    
    // Normalizar el ángulo para que esté entre -180 y 180
    if (adjustedAngle > 180) {
      adjustedAngle -= 360;
    }
    
    // El item está centrado cuando está a 90° (derecha)
    const targetAngle = 90;
    const difference = Math.abs(adjustedAngle - targetAngle);
    
    // También verificar el caso donde el ángulo cruza 0/360
    const alternateDifference = Math.abs((adjustedAngle + 360) - targetAngle);
    const finalDifference = Math.min(difference, alternateDifference);
    
    return finalDifference <= 15; // Tolerancia de 15 grados
  });

  return (
    <div 
      className="compass-menu"
      onMouseEnter={() => {
        setIsHovering(true);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsOpen(false);
      }}
    >
      <div 
        ref={compassRef}
        className={`compass-center ${isOpen ? 'open' : ''} ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        {/* Enhanced LudereNet Logo with pulsing effect */}
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
          <div className="pulse-ring"></div>
        </div>

        {/* Enhanced Control Panel */}
        <div className={`control-panel ${isOpen ? 'visible' : ''}`}>
          {/* Navigation arrows with haptic feedback */}
          <button 
            className="nav-arrow nav-arrow-left"
            onClick={rotateLeft}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              setIsHovering(true);
              setIsOpen(true);
            }}
            title="Rotar izquierda (Ctrl+←)"
          >
            <ChevronLeft size={16} />
            <div className="button-ripple"></div>
          </button>
          
          <button 
            className="nav-arrow nav-arrow-right"
            onClick={rotateRight}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseEnter={() => {
              setIsHovering(true);
              setIsOpen(true);
            }}
            title="Rotar derecha (Ctrl+→)"
          >
            <ChevronRight size={16} />
            <div className="button-ripple"></div>
          </button>

          {/* Quick actions */}
          <button 
            className="quick-action auto-rotate"
            onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
            onMouseEnter={() => {
              setIsHovering(true);
              setIsOpen(true);
            }}
            title={autoRotateEnabled ? "Desactivar rotación automática" : "Activar rotación automática"}
          >
            <RotateCcw size={14} className={autoRotateEnabled ? 'active' : ''} />
          </button>

          <button 
            className="quick-action shortcuts"
            onClick={() => setShortcutsMode(!shortcutsMode)}
            onMouseEnter={() => {
              setIsHovering(true);
              setIsOpen(true);
            }}
            title="Mostrar atajos de teclado"
          >
            <Search size={14} className={shortcutsMode ? 'active' : ''} />
          </button>
        </div>

        {/* Enhanced Menu Items */}
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isSelected = selectedItem === item.id;
          const isCenterItem = centerItem && centerItem.id === item.id;
          
          return (
            <div
              key={item.id}
              className={`compass-item ${isOpen ? 'visible' : ''} ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''} ${isCenterItem ? 'center' : ''}`}
              style={getPositionStyle(item.angle)}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setSelectedItem(item.id)}
              onMouseLeave={() => setSelectedItem(null)}
            >
              <div className="compass-item-content">
                <div className="icon-container">
                  <Icon size={20} />
                  <div className="icon-glow"></div>
                </div>
                {item.badge && (
                  <span className="compass-badge pulse">{item.badge}</span>
                )}
                <div className="selection-ring"></div>
              </div>
              
              {/* Enhanced Tooltip */}
              <div className="compass-tooltip-enhanced">
                <div className="tooltip-title">{item.label}</div>
                <div className="tooltip-description">{item.description}</div>
                {shortcutsMode && (
                  <div className="tooltip-shortcut">{item.shortcut}</div>
                )}
                <div className="tooltip-category">{item.category}</div>
              </div>
            </div>
          );
        })}

        {/* Center Item Info Panel */}
        {centerItem && isOpen && (
          <div className="center-info-panel">
            <div className="center-item-name">{centerItem.label}</div>
            <div className="center-item-desc">{centerItem.description}</div>
            {centerItem.badge && (
              <div className="center-item-badge">{centerItem.badge} notificaciones</div>
            )}
          </div>
        )}

        {/* User Info and Plus indicator */}
        <div className={`user-info-compass ${isOpen ? 'visible' : ''}`}>
          <div className="user-avatar-compass">
            <img src={user?.avatar} alt={user?.username} />
            {user?.hasPlus && (
              <div className="plus-badge-mini">
                <Star size={8} />
              </div>
            )}
          </div>
          <div className="user-details-compass">
            <div className="user-name-compass">{user?.username}</div>
            {user?.hasPlus ? (
              <div className="plus-status-compass">PlayStation Plus</div>
            ) : (
              <div className="standard-status-compass">Estándar</div>
            )}
          </div>
          <button 
            className="logout-btn-compass"
            onClick={logout}
            title="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Enhanced Navigation indicator with progress */}
        <div className={`navigation-indicator ${isOpen ? 'visible' : ''}`}>
          <div className="indicator-progress">
            <div 
              className="progress-fill"
              style={{ 
                transform: `rotate(${(currentRotation / 360) * 360}deg)` 
              }}
            ></div>
          </div>
          <div className="indicator-dots">
            {Array.from({ length: 10 }, (_, index) => (
              <div 
                key={index}
                className={`indicator-dot ${Math.floor((currentRotation + 18) / 36) % 10 === index ? 'active' : ''}`}
                onClick={() => setCurrentRotation(index * 36)}
              />
            ))}
          </div>
        </div>

        {/* Help overlay */}
        {shortcutsMode && isOpen && (
          <div className="shortcuts-overlay">
            <div className="shortcuts-title">Atajos de Teclado</div>
            <div className="shortcuts-list">
              <div>Ctrl+Space: Abrir/Cerrar menú</div>
              <div>Ctrl+←/→: Rotar menú</div>
              <div>Ctrl+1-0: Acceso directo a páginas</div>
              {isAdmin && <div>Ctrl+A: Panel de Admin</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompassMenu;
