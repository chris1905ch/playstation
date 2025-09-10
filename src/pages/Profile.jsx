import { Edit, Trophy, Star, Gamepad2, Calendar, MapPin, Users } from 'lucide-react';
import { useUserProfile } from '../hooks/useFriends';

const Profile = () => {
  const { userProfile, updateProfile, addTrophies, levelUp } = useUserProfile();
  
  const achievements = [
    {
      id: 1,
      name: "Maestro del Web",
      description: "Completa todas las misiones principales de Spider-Man 2",
      game: "Spider-Man 2",
      icon: "🕷️",
      rarity: "Raro",
      percentage: 15,
      unlockedDate: "15 Mar 2024"
    }
  ];

  const stats = [
    { label: "Tiempo jugado", value: "247h", icon: Gamepad2 },
    { label: "Trofeos", value: userProfile.trophies.toLocaleString(), icon: Trophy },
    { label: "Juegos completados", value: "18", icon: Star },
    { label: "Amigos", value: "42", icon: Users }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-main-info">
            <div className="profile-avatar-container">
              <img src={userProfile.avatar} alt={userProfile.username} className="profile-avatar" />
            </div>
            
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-username">{userProfile.username}</h1>
              </div>
              
              <div className="profile-level">
                <span className="level-badge">Nivel {userProfile.level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-stats">
          <h2>Estadísticas</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-actions">
          <h2>Acciones Rápidas (LocalStorage Demo)</h2>
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => addTrophies(10)}
            >
              <Trophy size={16} />
              Agregar 10 Trofeos
            </button>
            <button 
              className="btn btn-secondary"
              onClick={levelUp}
            >
              <Star size={16} />
              Subir de Nivel
            </button>
            <button 
              className="btn btn-ghost"
              onClick={() => updateProfile({ 
                username: userProfile.username.includes('_Pro') 
                  ? userProfile.username.replace('_Pro', '') 
                  : `${userProfile.username}_Pro` 
              })}
            >
              <Edit size={16} />
              Toggle Pro Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;