// Mock data for game catalog
export const gameCategories = [
  { id: 'all', name: 'Todos los Juegos', icon: '🎮' },
  { id: 'action', name: 'Acción', icon: '⚔️' },
  { id: 'adventure', name: 'Aventura', icon: '🗺️' },
  { id: 'rpg', name: 'RPG', icon: '🏰' },
  { id: 'sports', name: 'Deportes', icon: '⚽' },
  { id: 'racing', name: 'Carreras', icon: '🏎️' },
  { id: 'shooter', name: 'Disparos', icon: '🔫' },
  { id: 'strategy', name: 'Estrategia', icon: '🧠' },
  { id: 'horror', name: 'Terror', icon: '👻' },
  { id: 'indie', name: 'Indie', icon: '💎' }
];

export const mockGames = [
  {
    id: 1,
    title: "Spider-Man 2",
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    category: "action",
    price: 79.99,
    originalPrice: 79.99,
    discount: 0,
    rating: 4.8,
    reviewCount: 15420,
    releaseDate: "2023-10-20",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png",
    screenshots: [
      "https://cdn.mos.cms.futurecdn.net/R8aXbbPvjb3aDGBDtEp9T6.jpg",
      "https://images.pushsquare.com/screenshots/132442/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2023/10/spider-man-2-screenshot-1.jpg"
    ],
    description: "Experimenta las aventuras definitivas de Spider-Man en esta secuela épica que te permite jugar como Peter Parker y Miles Morales.",
    features: ["Un jugador", "Mundo abierto", "Historia épica", "Combate acrobático"],
    requirements: {
      storage: "98 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Superhéroes", "Acción", "Aventura", "Mundo Abierto"],
    isNew: true,
    isFeatured: true,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example1"
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    category: "action",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.9,
    reviewCount: 23850,
    releaseDate: "2022-11-09",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
    screenshots: [
      "https://blog.playstation.com/tachyon/2022/06/9-GOWR-Screen-Kratos-charging.jpg",
      "https://images.pushsquare.com/screenshots/130598/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2022/11/god-of-war-ragnarok-review-3.jpg"
    ],
    description: "Embárcate en un viaje épico por los Nueve Reinos con Kratos y Atreus en esta continuación de la aclamada saga.",
    features: ["Un jugador", "Historia cinemática", "Combate brutal", "Mitología nórdica"],
    requirements: {
      storage: "90 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Mitología", "Acción", "Aventura", "Historia"],
    isNew: false,
    isFeatured: true,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example2"
  },
  {
    id: 3,
    title: "Horizon Forbidden West",
    developer: "Guerrilla Games",
    publisher: "Sony Interactive Entertainment",
    category: "adventure",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.7,
    reviewCount: 18930,
    releaseDate: "2022-02-18",
    image: "https://cdn.cdkeys.com/496x700/media/catalog/product/n/e/new_project_-_2023-10-02t151943.412.jpg",
    screenshots: [
      "https://blog.playstation.com/tachyon/2021/07/f74c5fc1e2b2d75a8b4b9a6e8f7d0e3a.jpg",
      "https://images.pushsquare.com/screenshots/127924/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2022/02/horizon-forbidden-west-review-4.jpg"
    ],
    description: "Únete a Aloy en una nueva aventura por tierras inexploradas llenas de máquinas mortales y misterios antiguos.",
    features: ["Un jugador", "Mundo abierto", "Caza de máquinas", "Gráficos impresionantes"],
    requirements: {
      storage: "96 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Post-apocalíptico", "Cazadora", "Aventura", "Sci-Fi"],
    isNew: false,
    isFeatured: true,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example3"
  },
  {
    id: 4,
    title: "Call of Duty: Modern Warfare III",
    developer: "Sledgehammer Games",
    publisher: "Activision",
    category: "shooter",
    price: 69.99,
    originalPrice: 69.99,
    discount: 0,
    rating: 4.2,
    reviewCount: 32140,
    releaseDate: "2023-11-10",
    image: "https://static.wikia.nocookie.net/thelastofus/images/f/fe/Portada_Parte_I_limpia.jpeg/revision/latest?cb=20211209015400&path-prefix=es",
    screenshots: [
      "https://cdn.mos.cms.futurecdn.net/XWxGzTvLdMgJ8aK4VTcWY9.jpg",
      "https://images.pushsquare.com/screenshots/133598/large.jpg",
      "https://www.gamespot.com/a/uploads/screen_kubrick/1745/17457579/4212321-cod-mw3-mp-1.jpg"
    ],
    description: "La batalla continúa en esta nueva entrega de la icónica serie de disparos en primera persona.",
    features: ["Multijugador", "Campaña", "Zombies", "Batalla Real"],
    requirements: {
      storage: "149 GB",
      players: "1-100 jugadores",
      online: "Requerido para multijugador"
    },
    tags: ["Militar", "Multijugador", "FPS", "Online"],
    isNew: true,
    isFeatured: false,
    isExclusive: false,
    trailer: "https://www.youtube.com/watch?v=example4"
  },
  {
    id: 5,
    title: "The Last of Us Part I",
    developer: "Naughty Dog",
    publisher: "Sony Interactive Entertainment",
    category: "action",
    price: 39.99,
    originalPrice: 69.99,
    discount: 43,
    rating: 4.8,
    reviewCount: 28560,
    releaseDate: "2022-09-02",
    image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg",
    screenshots: [
      "https://blog.playstation.com/tachyon/2022/06/d2c0f0c8e3b7b4a5c1a2d3e4f5g6h7i8.jpg",
      "https://images.pushsquare.com/screenshots/130124/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2022/09/the-last-of-us-part-1-review-2.jpg"
    ],
    description: "Revive la experiencia que definió una generación, ahora reconstruida desde cero para PlayStation 5.",
    features: ["Un jugador", "Historia emotiva", "Supervivencia", "Remasterizado"],
    requirements: {
      storage: "79 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Zombies", "Supervivencia", "Drama", "Remasterización"],
    isNew: false,
    isFeatured: true,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example5"
  },
  {
    id: 6,
    title: "Gran Turismo 7",
    developer: "Polyphony Digital",
    publisher: "Sony Interactive Entertainment",
    category: "racing",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 14250,
    releaseDate: "2022-03-04",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2618/KKTGcWOFT4LwT1A1bnrWy6fj.png",
    screenshots: [
      "https://blog.playstation.com/tachyon/2021/10/b7d9a3c2e4f5a6b7c8d9e0f1a2b3c4d5.jpg",
      "https://images.pushsquare.com/screenshots/128642/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2022/03/gran-turismo-7-review-3.jpg"
    ],
    description: "La experiencia de conducción más auténtica regresa con más de 400 vehículos y circuitos icónicos.",
    features: ["Un jugador", "Multijugador online", "VR compatible", "Ray tracing"],
    requirements: {
      storage: "110 GB",
      players: "1-20 jugadores",
      online: "Requerido para algunas funciones"
    },
    tags: ["Simulación", "Carreras", "Coches", "Competición"],
    isNew: false,
    isFeatured: false,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example6"
  },
  {
    id: 7,
    title: "Baldur's Gate 3",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    category: "rpg",
    price: 59.99,
    originalPrice: 59.99,
    discount: 0,
    rating: 4.9,
    reviewCount: 45680,
    releaseDate: "2023-08-03",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
    screenshots: [
      "https://www.pcgamer.com/wp-content/uploads/2023/08/baldurs-gate-3-screenshot-1.jpg",
      "https://images.pushsquare.com/screenshots/133124/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2023/08/baldurs-gate-3-review-2.jpg"
    ],
    description: "El RPG definitivo con libertad total para crear tu propia aventura en el universo de Dungeons & Dragons.",
    features: ["Hasta 4 jugadores", "Historia ramificada", "Combate por turnos", "Creación de personajes"],
    requirements: {
      storage: "150 GB",
      players: "1-4 jugadores",
      online: "Opcional"
    },
    tags: ["RPG", "Fantasía", "D&D", "Cooperativo"],
    isNew: false,
    isFeatured: true,
    isExclusive: false,
    trailer: "https://www.youtube.com/watch?v=example7"
  },
  {
    id: 8,
    title: "Stellar Blade",
    developer: "Shift Up",
    publisher: "Sony Interactive Entertainment",
    category: "action",
    price: 69.99,
    originalPrice: 69.99,
    discount: 0,
    rating: 4.6,
    reviewCount: 8920,
    releaseDate: "2024-04-26",
    image: "https://i.ytimg.com/vi_webp/V6XYHiBxkvk/maxresdefault.webp",
    screenshots: [
      "https://blog.playstation.com/tachyon/2023/12/e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8.jpg",
      "https://images.pushsquare.com/screenshots/134256/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2024/04/stellar-blade-review-1.jpg"
    ],
    description: "Una aventura de acción cinemática que combina combate fluido con una narrativa envolvente.",
    features: ["Un jugador", "Combate estilizado", "Mundo post-apocalíptico", "Gráficos fotorrealistas"],
    requirements: {
      storage: "75 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Sci-Fi", "Combate", "Aventura", "Exclusivo"],
    isNew: true,
    isFeatured: true,
    isExclusive: true,
    trailer: "https://www.youtube.com/watch?v=example8"
  },
  {
    id: 9,
    title: "Helldivers 2",
    developer: "Arrowhead Game Studios",
    publisher: "Sony Interactive Entertainment",
    category: "shooter",
    price: 39.99,
    originalPrice: 39.99,
    discount: 0,
    rating: 4.3,
    reviewCount: 22140,
    releaseDate: "2024-02-08",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg",
    screenshots: [
      "https://www.pcgamer.com/wp-content/uploads/2024/02/helldivers-2-screenshot-1.jpg",
      "https://images.pushsquare.com/screenshots/134789/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2024/02/helldivers-2-review-3.jpg"
    ],
    description: "Lucha por la Super Tierra en este shooter cooperativo de vista cenital lleno de acción caótica.",
    features: ["Hasta 4 jugadores", "Cooperativo online", "Fuego amigo", "Misiones procedurales"],
    requirements: {
      storage: "45 GB",
      players: "1-4 jugadores",
      online: "Requerido"
    },
    tags: ["Cooperativo", "Top-down", "Acción", "Multijugador"],
    isNew: true,
    isFeatured: false,
    isExclusive: false,
    trailer: "https://www.youtube.com/watch?v=example9"
  },
  {
    id: 10,
    title: "Lies of P",
    developer: "Neowiz Games",
    publisher: "Neowiz Games",
    category: "rpg",
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    rating: 4.4,
    reviewCount: 12850,
    releaseDate: "2023-09-19",
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/header.jpg",
    screenshots: [
      "https://www.pcgamer.com/wp-content/uploads/2023/09/lies-of-p-screenshot-1.jpg",
      "https://images.pushsquare.com/screenshots/133845/large.jpg",
      "https://www.gamesradar.com/wp-content/uploads/2023/09/lies-of-p-review-2.jpg"
    ],
    description: "Un souls-like único basado en la historia de Pinocho, con mecánicas innovadoras y combate desafiante.",
    features: ["Un jugador", "Combate desafiante", "Historia de Pinocho", "Sistema de mentiras"],
    requirements: {
      storage: "50 GB",
      players: "1 jugador",
      online: "No requerido"
    },
    tags: ["Souls-like", "RPG", "Cuento de hadas", "Difícil"],
    isNew: false,
    isFeatured: false,
    isExclusive: false,
    trailer: "https://www.youtube.com/watch?v=example10"
  }
];

export const getGamesByCategory = (category) => {
  if (category === 'all') return mockGames;
  return mockGames.filter(game => game.category === category);
};

export const getFeaturedGames = () => {
  return mockGames.filter(game => game.isFeatured);
};

export const getNewGames = () => {
  return mockGames.filter(game => game.isNew);
};

export const getDiscountedGames = () => {
  return mockGames.filter(game => game.discount > 0);
};

export const searchGames = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return mockGames.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.developer.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
