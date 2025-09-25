import { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Play, 
  Download, 
  Cloud, 
  Trophy, 
  Clock, 
  Star,
  Settings,
  Filter,
  Search,
  Grid,
  List,
  Calendar,
  HardDrive
} from 'lucide-react';

const MyGames = () => {
  const [purchasedGames, setPurchasedGames] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cargar historial de compras desde localStorage
    const purchaseHistory = JSON.parse(localStorage.getItem('ludereNet_purchases') || '[]');
    
    // Extraer todos los juegos comprados
    const allPurchasedGames = [];
    purchaseHistory.forEach(purchase => {
      purchase.items.forEach(item => {
        // Evitar duplicados
        if (!allPurchasedGames.find(game => game.id === item.id)) {
          allPurchasedGames.push({
            ...item,
            purchaseDate: purchase.date,
            receiptId: purchase.id,
            status: 'downloaded', // 'downloaded', 'installing', 'ready'
            lastPlayed: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
            playTime: Math.floor(Math.random() * 100) + 1, // Horas jugadas
            progress: Math.floor(Math.random() * 100), // Progreso del juego
            size: `${(Math.random() * 80 + 20).toFixed(1)} GB`,
            trophies: {
              earned: Math.floor(Math.random() * 30),
              total: Math.floor(Math.random() * 20) + 30
            }
          });
        }
      });
    });

    setPurchasedGames(allPurchasedGames);
  }, []);

  const filteredGames = purchasedGames.filter(game => {
    if (searchTerm && !game.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    switch (filterBy) {
      case 'recently-played':
        return game.lastPlayed;
      case 'not-played':
        return !game.lastPlayed;
      case 'completed':
        return game.progress >= 100;
      case 'in-progress':
        return game.progress > 0 && game.progress < 100;
      default:
        return true;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'play-time':
        return b.playTime - a.playTime;
      case 'last-played':
        if (!a.lastPlayed && !b.lastPlayed) return 0;
        if (!a.lastPlayed) return 1;
        if (!b.lastPlayed) return -1;
        return new Date(b.lastPlayed) - new Date(a.lastPlayed);
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPlayTime = (hours) => {
    if (hours >= 24) {
      return `${Math.floor(hours / 24)}d ${hours % 24}h`;
    }
    return `${hours}h`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'downloaded':
        return 'var(--ps-success)';
      case 'installing':
        return 'var(--ps-warning)';
      case 'ready':
        return 'var(--ps-blue)';
      default:
        return 'var(--ps-light-gray)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'downloaded':
        return 'Descargado';
      case 'installing':
        return 'Instalando...';
      case 'ready':
        return 'Listo para jugar';
      default:
        return 'Desconocido';
    }
  };

  if (purchasedGames.length === 0) {
    return (
      <div className="my-games-container">
        <div className="my-games-header">
          <div className="header-content">
            <Gamepad2 size={24} />
            <h2>Mis Juegos</h2>
          </div>
        </div>
        
        <div className="empty-library">
          <div className="empty-library-content">
            <Gamepad2 size={64} />
            <h3>Tu biblioteca está vacía</h3>
            <p>¡Compra algunos juegos increíbles para empezar a jugar!</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Explorar Tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-games-container">
      <div className="my-games-header">
        <div className="header-content">
          <Gamepad2 size={24} />
          <h2>Mis Juegos</h2>
          <span className="games-count">({purchasedGames.length} juegos)</span>
        </div>
        
        <div className="library-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar en mi biblioteca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="library-search"
            />
          </div>
          
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vista en cuadrícula"
            >
              <Grid size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Vista en lista"
            >
              <List size={16} />
            </button>
          </div>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="recent">Recién comprados</option>
            <option value="name">Nombre A-Z</option>
            <option value="play-time">Más jugados</option>
            <option value="last-played">Jugados recientemente</option>
          </select>
          
          <select 
            value={filterBy} 
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los juegos</option>
            <option value="recently-played">Jugados recientemente</option>
            <option value="not-played">Sin jugar</option>
            <option value="in-progress">En progreso</option>
            <option value="completed">Completados</option>
          </select>
        </div>
      </div>

      <div className={`games-library ${viewMode}`}>
        {filteredGames.map(game => (
          <div key={`${game.id}-${game.receiptId}`} className="library-game">
            <div className="game-cover">
              <img src={game.image} alt={game.name} />
              <div className="game-overlay">
                <button className="btn btn-primary play-btn">
                  <Play size={20} />
                  Jugar
                </button>
              </div>
              
              {game.progress > 0 && (
                <div className="progress-indicator">
                  <div 
                    className="progress-fill"
                    style={{ width: `${game.progress}%` }}
                  />
                </div>
              )}
            </div>
            
            <div className="game-details">
              <h3 className="game-title">{game.name}</h3>
              <div className="game-platform">{game.platform}</div>
              
              <div className="game-stats">
                {game.lastPlayed && (
                  <div className="stat-item">
                    <Clock size={14} />
                    <span>Última vez: {formatDate(game.lastPlayed)}</span>
                  </div>
                )}
                
                <div className="stat-item">
                  <HardDrive size={14} />
                  <span>{game.size}</span>
                </div>
                
                {game.playTime > 0 && (
                  <div className="stat-item">
                    <Play size={14} />
                    <span>{formatPlayTime(game.playTime)} jugadas</span>
                  </div>
                )}
                
                {game.trophies.earned > 0 && (
                  <div className="stat-item">
                    <Trophy size={14} />
                    <span>{game.trophies.earned}/{game.trophies.total} trofeos</span>
                  </div>
                )}
              </div>
              
              <div className="game-status">
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(game.status) }}
                />
                <span>{getStatusText(game.status)}</span>
              </div>
              
              {game.progress > 0 && (
                <div className="completion-info">
                  <div className="completion-bar">
                    <div 
                      className="completion-fill"
                      style={{ width: `${game.progress}%` }}
                    />
                  </div>
                  <span className="completion-text">{game.progress}% completado</span>
                </div>
              )}
              
              <div className="game-actions">
                <button className="btn btn-primary btn-sm">
                  <Play size={14} />
                  Jugar
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Settings size={14} />
                </button>
                <button className="btn btn-ghost btn-sm">
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && searchTerm && (
        <div className="empty-search">
          <h3>No se encontraron juegos</h3>
          <p>Prueba con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default MyGames;