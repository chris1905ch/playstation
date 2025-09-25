import { useState, useEffect } from 'react';
import '../styles/notifications.css';
import { 
  Bell, 
  Users, 
  MessageSquare, 
  Trophy, 
  Download, 
  Settings, 
  UserCheck, 
  ShoppingBag, 
  Star,
  Filter,
  Check,
  CheckCheck,
  Eye,
  EyeOff,
  Trash2,
  Clock
} from 'lucide-react';
import { 
  mockNotifications, 
  notificationTypes, 
  priorityLevels,
  getRelativeTime,
  filterNotifications 
} from '../data/notificationsData';

// Mapeo de iconos
const iconMap = {
  Users,
  MessageSquare,
  Trophy,
  Download,
  Settings,
  UserCheck,
  ShoppingBag,
  Star
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Contador de notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Filtrar notificaciones
  const filteredNotifications = filterNotifications(notifications, filter)
    .sort((a, b) => {
      // Primero por prioridad, luego por timestamp
      const priorityDiff = priorityLevels[b.priority].weight - priorityLevels[a.priority].weight;
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

  // Marcar como leída una notificación
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  // Eliminar notificación
  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
    setSelectedNotifications(prev => 
      prev.filter(id => id !== notificationId)
    );
  };

  // Manejar selección múltiple
  const toggleSelect = (notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  // Seleccionar todas las notificaciones visibles
  const selectAll = () => {
    const visibleIds = filteredNotifications.map(n => n.id);
    setSelectedNotifications(
      selectedNotifications.length === visibleIds.length ? [] : visibleIds
    );
  };

  // Eliminar seleccionadas
  const deleteSelected = () => {
    setNotifications(prev => 
      prev.filter(n => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
  };

  // Marcar seleccionadas como leídas
  const markSelectedAsRead = () => {
    setNotifications(prev =>
      prev.map(n =>
        selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
      )
    );
    setSelectedNotifications([]);
  };

  // Obtener icono de la notificación
  const getNotificationIcon = (type) => {
    const iconName = notificationTypes[type]?.icon;
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={20} /> : <Bell size={20} />;
  };

  // Obtener acción específica según tipo de notificación
  const getNotificationAction = (notification) => {
    switch (notification.type) {
      case 'friend_request':
        return (
          <div className="notification-actions">
            <button className="action-btn accept">Aceptar</button>
            <button className="action-btn decline">Rechazar</button>
          </div>
        );
      case 'message':
        return (
          <button className="action-btn primary">Responder</button>
        );
      case 'store_offer':
        return (
          <button className="action-btn primary">Ver Oferta</button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-title">
          <Bell className="header-icon" size={28} />
          <h1>Notificaciones</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>

        {/* Barra de herramientas */}
        <div className="notifications-toolbar">
          <div className="toolbar-left">
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filtros
            </button>
            
            {selectedNotifications.length > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">
                  {selectedNotifications.length} seleccionadas
                </span>
                <button 
                  className="bulk-btn"
                  onClick={markSelectedAsRead}
                >
                  <Check size={16} />
                  Marcar leídas
                </button>
                <button 
                  className="bulk-btn delete"
                  onClick={deleteSelected}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-right">
            <button 
              className="action-btn secondary"
              onClick={selectAll}
            >
              {selectedNotifications.length === filteredNotifications.length ? (
                <>
                  <Eye size={16} />
                  Deseleccionar todas
                </>
              ) : (
                <>
                  <EyeOff size={16} />
                  Seleccionar todas
                </>
              )}
            </button>
            
            {unreadCount > 0 && (
              <button 
                className="action-btn primary"
                onClick={markAllAsRead}
              >
                <CheckCheck size={16} />
                Marcar todas leídas
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="filters-panel">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todas ({notifications.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              No leídas ({unreadCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Leídas ({notifications.length - unreadCount})
            </button>
            <button 
              className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
              onClick={() => setFilter('high')}
            >
              Alta prioridad ({notifications.filter(n => n.priority === 'high').length})
            </button>
          </div>
        )}
      </div>

      {/* Lista de notificaciones */}
      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-notifications">
            <Bell size={64} className="empty-icon" />
            <h3>No hay notificaciones</h3>
            <p>
              {filter === 'all' 
                ? 'No tienes notificaciones en este momento.' 
                : `No hay notificaciones ${filter === 'unread' ? 'no leídas' : filter}.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`notification-item ${!notification.isRead ? 'unread' : ''} ${
                selectedNotifications.includes(notification.id) ? 'selected' : ''
              }`}
            >
              <div className="notification-content">
                <div className="notification-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelect(notification.id)}
                  />
                </div>

                <div 
                  className="notification-icon"
                  style={{ color: notificationTypes[notification.type]?.color }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="notification-body">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <div className="notification-meta">
                      <span 
                        className={`priority-badge priority-${notification.priority}`}
                      >
                        {priorityLevels[notification.priority].label}
                      </span>
                      <span className="timestamp">
                        <Clock size={14} />
                        {getRelativeTime(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="notification-message">{notification.message}</p>
                  
                  {getNotificationAction(notification)}
                </div>

                <div className="notification-controls">
                  {!notification.isRead && (
                    <button
                      className="control-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Marcar como leída"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="control-btn delete"
                    onClick={() => deleteNotification(notification.id)}
                    title="Eliminar notificación"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {!notification.isRead && <div className="unread-indicator" />}
            </div>
          ))
        )}
      </div>

      {/* Estadísticas */}
      {notifications.length > 0 && (
        <div className="notifications-stats">
          <div className="stats-item">
            <span className="stats-label">Total:</span>
            <span className="stats-value">{notifications.length}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">No leídas:</span>
            <span className="stats-value unread">{unreadCount}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">Leídas:</span>
            <span className="stats-value">{notifications.length - unreadCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;