import { useState, useEffect } from 'react';
import { Search, Filter, Star, Play, Heart, Share, ShoppingCart, Tag, Calendar, Users } from 'lucide-react';
import { 
  mockGames, 
  gameCategories, 
  getGamesByCategory, 
  getFeaturedGames, 
  getNewGames, 
  getDiscountedGames,
  searchGames 
} from '../data/gamesData';

const GameCatalog = () => {
  const [games, setGames] = useState(mockGames);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [...new Set(mockGames.flatMap(game => game.tags))];

  useEffect(() => {
    let filteredGames = mockGames;

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredGames = getGamesByCategory(selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filteredGames = searchGames(searchTerm);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filteredGames = filteredGames.filter(game =>
        selectedTags.some(tag => game.tags.includes(tag))
      );
    }

    // Filter by price range
    filteredGames = filteredGames.filter(game =>
      game.price >= priceRange[0] && game.price <= priceRange[1]
    );

    // Sort games
    switch (sortBy) {
      case 'featured':
        filteredGames = [...filteredGames].sort((a, b) => 
          (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
      case 'newest':
        filteredGames = [...filteredGames].sort((a, b) => 
          new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        break;
      case 'price-low':
        filteredGames = [...filteredGames].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredGames = [...filteredGames].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredGames = [...filteredGames].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filteredGames = [...filteredGames].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
        break;
      default:
        break;
    }

    setGames(filteredGames);
  }, [selectedCategory, searchTerm, sortBy, selectedTags, priceRange]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const formatPrice = (price, originalPrice, discount) => {
    if (discount > 0) {
      return (
        <div className="price-container">
          <span className="original-price">${originalPrice.toFixed(2)}</span>
          <span className="current-price">${price.toFixed(2)}</span>
          <span className="discount-badge">-{discount}%</span>
        </div>
      );
    }
    return <span className="current-price">${price.toFixed(2)}</span>;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            size={14} 
            className={`star ${
              index < fullStars 
                ? 'filled' 
                : index === fullStars && hasHalfStar 
                  ? 'half-filled' 
                  : 'empty'
            }`}
          />
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="game-catalog">
      <div className="catalog-header">
        <div className="header-top">
          <h2>Catálogo de Juegos</h2>
          <div className="header-actions">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className={`btn btn-ghost filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filtros
            </button>
          </div>
        </div>

        <div className="categories-bar">
          {gameCategories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <h4>Ordenar por</h4>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Destacados</option>
                <option value="newest">Más nuevos</option>
                <option value="rating">Mejor valorados</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>

            <div className="filter-section">
              <h4>Rango de precio</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="range-input"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range-input"
                />
                <div className="price-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Etiquetas</h4>
              <div className="tags-filter">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="catalog-content">
        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card card" onClick={() => setSelectedGame(game)}>
              <div className="game-image-container">
                <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button className="btn btn-primary">
                    <Play size={16} />
                    Ver Detalles
                  </button>
                </div>
                {game.discount > 0 && (
                  <div className="discount-badge">-{game.discount}%</div>
                )}
                {game.isNew && (
                  <div className="new-badge">NUEVO</div>
                )}
                {game.isExclusive && (
                  <div className="exclusive-badge">EXCLUSIVO</div>
                )}
              </div>

              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-developer">{game.developer}</p>
                
                <div className="game-rating">
                  {renderStars(game.rating)}
                  <span className="review-count">({game.reviewCount.toLocaleString()} reseñas)</span>
                </div>

                <div className="game-tags">
                  {game.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="game-tag">{tag}</span>
                  ))}
                </div>

                <div className="game-footer">
                  {formatPrice(game.price, game.originalPrice, game.discount)}
                  <div className="game-actions">
                    <button className="btn btn-ghost btn-sm">
                      <Heart size={16} />
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Share size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {games.length === 0 && (
          <div className="empty-state">
            <h3>No se encontraron juegos</h3>
            <p>Prueba ajustando los filtros de búsqueda</p>
          </div>
        )}
      </div>

      {selectedGame && (
        <div className="game-modal-overlay" onClick={() => setSelectedGame(null)}>
          <div className="game-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedGame(null)}
            >
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-image">
                  <img src={selectedGame.image} alt={selectedGame.title} />
                </div>
                <div className="modal-info">
                  <h2>{selectedGame.title}</h2>
                  <p className="modal-developer">Por {selectedGame.developer}</p>
                  
                  <div className="modal-rating">
                    {renderStars(selectedGame.rating)}
                    <span>({selectedGame.reviewCount.toLocaleString()} reseñas)</span>
                  </div>

                  <p className="modal-description">{selectedGame.description}</p>

                  <div className="modal-price">
                    {formatPrice(selectedGame.price, selectedGame.originalPrice, selectedGame.discount)}
                  </div>

                  <div className="modal-actions">
                    <button className="btn btn-primary">
                      <ShoppingCart size={16} />
                      Agregar al Carrito
                    </button>
                    <button className="btn btn-secondary">
                      <Heart size={16} />
                      Lista de Deseos
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-details">
                <div className="details-section">
                  <h4>Características</h4>
                  <ul className="features-list">
                    {selectedGame.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h4>Información del Juego</h4>
                  <div className="game-specs">
                    <div className="spec-item">
                      <Calendar size={16} />
                      <span>Fecha de lanzamiento: {new Date(selectedGame.releaseDate).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="spec-item">
                      <Users size={16} />
                      <span>{selectedGame.requirements.players}</span>
                    </div>
                    <div className="spec-item">
                      <Tag size={16} />
                      <span>Almacenamiento: {selectedGame.requirements.storage}</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Etiquetas</h4>
                  <div className="modal-tags">
                    {selectedGame.tags.map(tag => (
                      <span key={tag} className="modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h4>Capturas de Pantalla</h4>
                  <div className="screenshots-grid">
                    {selectedGame.screenshots.map((screenshot, index) => (
                      <img 
                        key={index} 
                        src={screenshot} 
                        alt={`Screenshot ${index + 1}`}
                        className="screenshot"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCatalog;
