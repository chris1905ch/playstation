import { useState } from 'react';
import { Search, UserPlus, Check, X, MessageSquare, MoreVertical, Trophy } from 'lucide-react';
import { getStatusColor, getStatusText } from '../data/mockData';

const Friends = ({ 
  friends, 
  friendRequests, 
  loading, 
  acceptFriendRequest, 
  rejectFriendRequest, 
  removeFriend, 
  sendFriendRequest 
}) => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [newFriendUsername, setNewFriendUsername] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (newFriendUsername.trim()) {
      sendFriendRequest(newFriendUsername);
      setNewFriendUsername('');
    }
  };

  return (
    <div className="friends-page">
      <div className="friends-header">
        <h2>Amigos</h2>
        <div className="friends-tabs">
          <button 
            className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Amigos ({friends.length})
          </button>
          <button 
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Solicitudes ({friendRequests.length})
          </button>
          <button 
            className={`tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Agregar Amigos
          </button>
        </div>
      </div>

      {activeTab === 'friends' && (
        <div className="friends-content">
          <div className="friends-search">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar amigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="friends-list">
            {filteredFriends.map(friend => (
              <div key={friend.id} className="friend-item card">
                <div className="friend-main-info">
                  <div className="friend-avatar-container">
                    <img src={friend.avatar} alt={friend.username} className="friend-avatar" />
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(friend.status) }}
                    ></div>
                  </div>
                  
                  <div className="friend-details">
                    <h3 className="friend-username">{friend.username}</h3>
                    <div className="friend-status">
                      <span style={{ color: getStatusColor(friend.status) }}>
                        {getStatusText(friend.status)}
                      </span>
                      {friend.lastSeen && (
                        <span className="last-seen"> • Visto hace {friend.lastSeen}</span>
                      )}
                    </div>
                    {friend.currentGame && (
                      <div className="current-game">
                        Jugando <strong>{friend.currentGame}</strong>
                      </div>
                    )}
                    <div className="friend-stats">
                      <span className="level">Nivel {friend.level}</span>
                      <span className="trophies">
                        <Trophy size={14} />
                        {friend.trophies.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="friend-actions">
                  <button className="btn btn-primary">
                    <MessageSquare size={16} />
                    Mensaje
                  </button>
                  <button className="btn btn-ghost">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}

            {filteredFriends.length === 0 && searchTerm && (
              <div className="empty-state">
                <p>No se encontraron amigos con ese nombre</p>
              </div>
            )}

            {friends.length === 0 && (
              <div className="empty-state">
                <UserPlus size={48} />
                <h3>Aún no tienes amigos</h3>
                <p>Agrega algunos amigos para comenzar a jugar juntos</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('add')}
                >
                  Agregar Amigos
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="requests-content">
          <h3>Solicitudes de Amistad</h3>
          
          {friendRequests.length > 0 ? (
            <div className="requests-list">
              {friendRequests.map(request => (
                <div key={request.id} className="request-item card">
                  <div className="request-info">
                    <img src={request.avatar} alt={request.username} className="request-avatar" />
                    <div className="request-details">
                      <h4 className="request-username">{request.username}</h4>
                      <div className="request-stats">
                        <span>Nivel {request.level}</span>
                        <span>•</span>
                        <span>{request.trophies.toLocaleString()} trofeos</span>
                        {request.mutualFriends > 0 && (
                          <>
                            <span>•</span>
                            <span>{request.mutualFriends} amigos en común</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="request-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => acceptFriendRequest(request.id)}
                      disabled={loading}
                    >
                      <Check size={16} />
                      Aceptar
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => rejectFriendRequest(request.id)}
                      disabled={loading}
                    >
                      <X size={16} />
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <UserPlus size={48} />
              <h3>No tienes solicitudes pendientes</h3>
              <p>Cuando alguien te envíe una solicitud de amistad, aparecerá aquí</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <div className="add-friends-content">
          <h3>Agregar Amigos</h3>
          
          <form onSubmit={handleSendRequest} className="add-friend-form">
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <div className="input-group">
                <input
                  id="username"
                  type="text"
                  placeholder="Ingresa el nombre de usuario"
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  className="input"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading || !newFriendUsername.trim()}
                >
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="suggestions">
            <h4>Jugadores Sugeridos</h4>
            <div className="suggestions-list">
              <div className="suggestion-item card">
                <img 
                  src="https://via.placeholder.com/60x60/00b4d8/ffffff?text=SG" 
                  alt="Suggested player" 
                  className="suggestion-avatar" 
                />
                <div className="suggestion-info">
                  <h5>SuperGamer2024</h5>
                  <span>3 amigos en común</span>
                </div>
                <button className="btn btn-secondary">
                  <UserPlus size={16} />
                  Agregar
                </button>
              </div>

              <div className="suggestion-item card">
                <img 
                  src="https://via.placeholder.com/60x60/ff3366/ffffff?text=PG" 
                  alt="Suggested player" 
                  className="suggestion-avatar" 
                />
                <div className="suggestion-info">
                  <h5>ProGamer_ES</h5>
                  <span>1 amigo en común</span>
                </div>
                <button className="btn btn-secondary">
                  <UserPlus size={16} />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
