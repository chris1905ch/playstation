// Mock data para sistema de notificaciones de LudereNet

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'friend_request',
    title: 'Nueva solicitud de amistad',
    message: 'AlexGamer2024 te ha enviado una solicitud de amistad',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // hace 15 minutos
    isRead: false,
    priority: 'high',
    data: {
      userId: 'user-2',
      userName: 'AlexGamer2024',
      userAvatar: 'https://i.pravatar.cc/150?img=2'
    }
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'Nuevo mensaje',
    message: 'MariaPS5 te ha enviado un mensaje: "¿Juegas esta noche?"',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // hace 45 minutos
    isRead: false,
    priority: 'medium',
    data: {
      userId: 'user-3',
      userName: 'MariaPS5',
      userAvatar: 'https://i.pravatar.cc/150?img=3'
    }
  },
  {
    id: 'notif-3',
    type: 'trophy',
    title: '¡Nuevo trofeo desbloqueado!',
    message: 'Has obtenido el trofeo "Maestro Explorador" en The Last of Us Part II',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
    isRead: false,
    priority: 'medium',
    data: {
      game: 'The Last of Us Part II',
      trophyName: 'Maestro Explorador',
      trophyRarity: 'rare'
    }
  },
  {
    id: 'notif-4',
    type: 'game_update',
    title: 'Actualización disponible',
    message: 'Spider-Man 2 tiene una nueva actualización disponible (1.2GB)',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // hace 4 horas
    isRead: true,
    priority: 'low',
    data: {
      game: 'Spider-Man 2',
      version: '1.08',
      size: '1.2GB'
    }
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Mantenimiento programado',
    message: 'LudereNet realizará mantenimiento el 25/09 de 02:00 a 06:00',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // hace 6 horas
    isRead: true,
    priority: 'medium',
    data: {
      maintenanceStart: '2025-09-25T02:00:00Z',
      maintenanceEnd: '2025-09-25T06:00:00Z'
    }
  },
  {
    id: 'notif-6',
    type: 'friend_online',
    title: 'Amigo conectado',
    message: 'CarlosRetro se ha conectado y está jugando God of War',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // hace 8 horas
    isRead: true,
    priority: 'low',
    data: {
      userId: 'user-4',
      userName: 'CarlosRetro',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      currentGame: 'God of War'
    }
  },
  {
    id: 'notif-7',
    type: 'store_offer',
    title: 'Oferta especial',
    message: 'Descuento del 60% en Horizon Forbidden West - Solo por tiempo limitado',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // hace 12 horas
    isRead: false,
    priority: 'medium',
    data: {
      game: 'Horizon Forbidden West',
      discount: 60,
      originalPrice: 69.99,
      discountedPrice: 27.99,
      expiresAt: '2025-09-30T23:59:59Z'
    }
  },
  {
    id: 'notif-8',
    type: 'achievement',
    title: 'Meta completada',
    message: 'Has completado tu meta mensual: "Jugar 20 horas"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // hace 1 día
    isRead: true,
    priority: 'low',
    data: {
      goalType: 'playtime',
      target: 20,
      achieved: 23,
      period: 'monthly'
    }
  }
];

export const notificationTypes = {
  friend_request: {
    icon: 'Users',
    color: '#00cdff',
    label: 'Solicitud de amistad'
  },
  message: {
    icon: 'MessageSquare',
    color: '#ff6b35',
    label: 'Mensaje'
  },
  trophy: {
    icon: 'Trophy',
    color: '#ffd700',
    label: 'Trofeo'
  },
  game_update: {
    icon: 'Download',
    color: '#00d4aa',
    label: 'Actualización'
  },
  system: {
    icon: 'Settings',
    color: '#9c88ff',
    label: 'Sistema'
  },
  friend_online: {
    icon: 'UserCheck',
    color: '#4caf50',
    label: 'Amigo conectado'
  },
  store_offer: {
    icon: 'ShoppingBag',
    color: '#e91e63',
    label: 'Oferta'
  },
  achievement: {
    icon: 'Star',
    color: '#ff9800',
    label: 'Logro'
  }
};

export const priorityLevels = {
  high: {
    label: 'Alta',
    color: '#f44336',
    weight: 3
  },
  medium: {
    label: 'Media',
    color: '#ff9800',
    weight: 2
  },
  low: {
    label: 'Baja',
    color: '#4caf50',
    weight: 1
  }
};

// Función para obtener tiempo relativo
export const getRelativeTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `hace ${minutes} min`;
  if (hours < 24) return `hace ${hours}h`;
  if (days < 7) return `hace ${days}d`;
  return timestamp.toLocaleDateString();
};

// Función para filtrar notificaciones
export const filterNotifications = (notifications, filter) => {
  switch (filter) {
    case 'unread':
      return notifications.filter(n => !n.isRead);
    case 'read':
      return notifications.filter(n => n.isRead);
    case 'high':
      return notifications.filter(n => n.priority === 'high');
    default:
      return notifications;
  }
};