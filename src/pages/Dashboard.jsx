import { Trophy, Users, MessageSquare, Gamepad2, Star, Clock } from 'lucide-react';
import { mockUser, mockFriends } from '../data/mockData';

const Dashboard = () => {
  const onlineFriends = mockFriends.filter(friend => friend.status === 'online' || friend.status === 'playing');
  const recentGames = [
    {
      id: 1,
      name: "Spider-Man 2",
      image: "https://via.placeholder.com/120x160/e60012/ffffff?text=SM2",
      lastPlayed: "Hoy",
      progress: 78
    },
    {
      id: 2,
      name: "God of War Ragnarök",
      image: "https://via.placeholder.com/120x160/00b4d8/ffffff?text=GOW",
      lastPlayed: "Ayer",
      progress: 92
    },
    {
      id: 3,
      name: "Horizon Forbidden West",
      image: "https://via.placeholder.com/120x160/ff6b35/ffffff?text=HFW",
      lastPlayed: "Hace 3 días",
      progress: 65
    }
  ];

  const stats = [
    {
      label: "Trofeos",
      value: mockUser.trophies,
      icon: Trophy,
      color: "var(--ps-warning)"
    },
    {
      label: "Amigos en línea",
      value: onlineFriends.length,
      icon: Users,
      color: "var(--ps-success)"
    },
    {
      label: "Mensajes",
      value: 5,
      icon: MessageSquare,
      color: "var(--ps-blue)"
    },
    {
      label: "Juegos",
      value: 24,
      icon: Gamepad2,
      color: "var(--ps-light-blue)"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>¡Bienvenido de vuelta, {mockUser.username}!</h2>
        <p className="dashboard-subtitle">Aquí tienes un resumen de tu actividad reciente</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card card">
              <div className="stat-icon" style={{ color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value.toLocaleString()}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3 className="section-title">Juegos Recientes</h3>
          <div className="games-grid">
            {recentGames.map(game => (
              <div key={game.id} className="game-card card">
                <div className="game-image">
                  <img src={game.image} alt={game.name} />
                  <div className="game-overlay">
                    <button className="btn btn-primary">Continuar</button>
                  </div>
                </div>
                <div className="game-info">
                  <h4 className="game-title">{game.name}</h4>
                  <div className="game-meta">
                    <span className="game-last-played">
                      <Clock size={14} />
                      {game.lastPlayed}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${game.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{game.progress}% completado</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="section-title">Amigos en Línea</h3>
          <div className="online-friends">
            {onlineFriends.slice(0, 6).map(friend => (
              <div key={friend.id} className="friend-card card">
                <div className="friend-avatar-container">
                  <img src={friend.avatar} alt={friend.username} className="friend-avatar" />
                  <div 
                    className="status-indicator" 
                    style={{ backgroundColor: friend.status === 'online' ? 'var(--ps-success)' : 'var(--ps-blue)' }}
                  ></div>
                </div>
                <div className="friend-info">
                  <span className="friend-name">{friend.username}</span>
                  {friend.currentGame && (
                    <span className="friend-game">Jugando {friend.currentGame}</span>
                  )}
                </div>
                <button className="btn btn-ghost btn-sm">Mensaje</button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="section-title">Logros Recientes</h3>
          <div className="achievements">
            <div className="achievement card">
              <div className="achievement-icon">
                <Trophy size={24} color="var(--ps-warning)" />
              </div>
              <div className="achievement-info">
                <h4>Maestro del Web</h4>
                <p>Completa todas las misiones principales de Spider-Man 2</p>
                <span className="achievement-date">Hace 2 horas</span>
              </div>
              <div className="achievement-rarity">
                <Star size={16} />
                <span>Raro (15%)</span>
              </div>
            </div>

            <div className="achievement card">
              <div className="achievement-icon">
                <Trophy size={24} color="var(--ps-warning)" />
              </div>
              <div className="achievement-info">
                <h4>Guerrero Épico</h4>
                <p>Derrota a 100 enemigos en God of War Ragnarök</p>
                <span className="achievement-date">Ayer</span>
              </div>
              <div className="achievement-rarity">
                <Star size={16} />
                <span>Común (78%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
