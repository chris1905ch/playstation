import { useState, useEffect } from 'react';
import { mockNotifications } from '../data/notificationsData';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  // Obtener número de notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Marcar notificación como leída
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

  // Agregar nueva notificación (para futuras funcionalidades)
  const addNotification = (newNotification) => {
    const notification = {
      ...newNotification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  // Eliminar notificación
  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
  };

  // Obtener notificaciones por tipo
  const getNotificationsByType = (type) => {
    return notifications.filter(n => n.type === type);
  };

  // Obtener notificaciones recientes (últimas 24 horas)
  const getRecentNotifications = () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return notifications.filter(n => new Date(n.timestamp) > yesterday);
  };

  // Simular nuevas notificaciones periódicamente (para demo)
  useEffect(() => {
    const interval = setInterval(() => {
      // Solo agregar si hay menos de 3 notificaciones no leídas para no saturar
      if (unreadCount < 3 && Math.random() > 0.8) {
        const demoNotifications = [
          {
            type: 'friend_online',
            title: 'Amigo conectado',
            message: `${['Alex', 'Maria', 'Carlos', 'Ana'][Math.floor(Math.random() * 4)]} se ha conectado`,
            priority: 'low'
          },
          {
            type: 'message',
            title: 'Nuevo mensaje',
            message: 'Has recibido un nuevo mensaje',
            priority: 'medium'
          }
        ];
        
        const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [unreadCount]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    getNotificationsByType,
    getRecentNotifications,
    setNotifications
  };
};