// Mock data for friends and messages
export const mockUser = {
  id: 1,
  username: "PlayStation_Gamer",
  avatar: "https://via.placeholder.com/100x100/0070d4/ffffff?text=PG",
  status: "online",
  level: 42,
  trophies: 1247
};

export const mockFriends = [
  {
    id: 2,
    username: "GamerPro123",
    avatar: "https://via.placeholder.com/60x60/00b4d8/ffffff?text=GP",
    status: "online",
    lastSeen: null,
    level: 38,
    trophies: 956,
    currentGame: "Spider-Man 2"
  },
  {
    id: 3,
    username: "ElitePlayer",
    avatar: "https://via.placeholder.com/60x60/ff3366/ffffff?text=EP",
    status: "playing",
    lastSeen: null,
    level: 55,
    trophies: 2103,
    currentGame: "God of War Ragnarök"
  },
  {
    id: 4,
    username: "CasualGamer",
    avatar: "https://via.placeholder.com/60x60/00d68f/ffffff?text=CG",
    status: "offline",
    lastSeen: "2 horas",
    level: 22,
    trophies: 445
  },
  {
    id: 5,
    username: "ProShooter",
    avatar: "https://via.placeholder.com/60x60/ffb800/ffffff?text=PS",
    status: "online",
    lastSeen: null,
    level: 67,
    trophies: 3421,
    currentGame: "Call of Duty: MW3"
  },
  {
    id: 6,
    username: "RPGMaster",
    avatar: "https://via.placeholder.com/60x60/9d4edd/ffffff?text=RM",
    status: "away",
    lastSeen: "30 min",
    level: 49,
    trophies: 1789,
    currentGame: "Final Fantasy XVI"
  }
];

export const mockFriendRequests = [
  {
    id: 7,
    username: "NewPlayer2024",
    avatar: "https://via.placeholder.com/60x60/06ffa5/ffffff?text=NP",
    level: 12,
    trophies: 87,
    mutualFriends: 2,
    requestDate: "2024-03-15"
  },
  {
    id: 8,
    username: "GameMaster",
    avatar: "https://via.placeholder.com/60x60/fb8500/ffffff?text=GM",
    level: 73,
    trophies: 4532,
    mutualFriends: 5,
    requestDate: "2024-03-14"
  }
];

export const mockMessages = [
  {
    id: 1,
    friendId: 2,
    friendName: "GamerPro123",
    messages: [
      {
        id: 1,
        senderId: 2,
        content: "¡Hola! ¿Quieres jugar Spider-Man 2 cooperativo?",
        timestamp: "2024-03-15T10:30:00Z",
        read: true
      },
      {
        id: 2,
        senderId: 1,
        content: "¡Claro! Déjame terminar esta misión y me uno",
        timestamp: "2024-03-15T10:32:00Z",
        read: true
      },
      {
        id: 3,
        senderId: 2,
        content: "Perfecto, te espero en el lobby",
        timestamp: "2024-03-15T10:33:00Z",
        read: true
      }
    ]
  },
  {
    id: 2,
    friendId: 3,
    friendName: "ElitePlayer",
    messages: [
      {
        id: 4,
        senderId: 3,
        content: "¿Has probado el nuevo DLC de God of War?",
        timestamp: "2024-03-15T09:15:00Z",
        read: true
      },
      {
        id: 5,
        senderId: 1,
        content: "Aún no, ¿está bueno?",
        timestamp: "2024-03-15T09:20:00Z",
        read: true
      },
      {
        id: 6,
        senderId: 3,
        content: "¡Increíble! Las batallas son épicas",
        timestamp: "2024-03-15T09:22:00Z",
        read: false
      }
    ]
  },
  {
    id: 3,
    friendId: 5,
    friendName: "ProShooter",
    messages: [
      {
        id: 7,
        senderId: 5,
        content: "¿Te unes a ranked en COD?",
        timestamp: "2024-03-15T08:45:00Z",
        read: false
      }
    ]
  }
];

export const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'var(--ps-success)';
    case 'playing':
      return 'var(--ps-blue)';
    case 'away':
      return 'var(--ps-warning)';
    case 'offline':
    default:
      return 'var(--ps-light-gray)';
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'online':
      return 'En línea';
    case 'playing':
      return 'Jugando';
    case 'away':
      return 'Ausente';
    case 'offline':
    default:
      return 'Desconectado';
  }
};
