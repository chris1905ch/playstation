# PlayStation Plus - Aplicación de Amigos y Mensajería

Una aplicación frontend moderna inspirada en PlayStation Plus que permite a los usuarios gestionar amigos, enviar mensajes y ver su perfil de gaming.

## 🚀 Características

### 🎮 Dashboard
- Vista general de estadísticas del usuario
- Juegos recientes con progreso
- Amigos en línea
- Logros y trofeos recientes

### �️ Catálogo de Juegos
- Exploración completa de juegos disponibles
- Filtrado por categorías (Acción, Aventura, RPG, Deportes, etc.)
- Sistema de búsqueda avanzado
- Filtros por precio, etiquetas y valoraciones
- Modal detallado de cada juego con capturas de pantalla
- Información completa: desarrollador, precio, descuentos, características
- Sistema de valoraciones con estrellas
- Badges para juegos nuevos, exclusivos y con descuento

### �👥 Sistema de Amigos
- Lista de amigos con estado en tiempo real (en línea, jugando, ausente, desconectado)
- Solicitudes de amistad pendientes
- Buscar y agregar nuevos amigos
- Ver perfil de amigos con estadísticas de juegos

### 💬 Sistema de Mensajería
- Chat en tiempo real con amigos
- Indicadores de mensajes leídos/no leídos
- Búsqueda de conversaciones
- Interfaz intuitiva similar a aplicaciones de mensajería modernas

### 👤 Perfil de Usuario
- Información detallada del usuario
- Trofeos y logros organizados por juego
- Progreso de juegos
- Estadísticas de tiempo jugado

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal de UI
- **Vite** - Herramienta de construcción y desarrollo
- **Lucide React** - Iconos modernos
- **CSS Variables** - Sistema de theming consistente
- **React Hooks** - Gestión de estado moderna

## 🎨 Diseño

- **Tema PlayStation**: Colores azules característicos de PlayStation
- **Responsive Design**: Optimizado para desktop y móvil
- **Interfaz Moderna**: Componentes con glassmorphism y animaciones suaves
- **Accesibilidad**: Navegación por teclado y lectores de pantalla

## 📱 Responsive

La aplicación está completamente optimizada para:
- **Desktop**: Experiencia completa con sidebar
- **Tablet**: Layout adaptado con navegación reorganizada
- **Móvil**: Interfaz touch-friendly con navegación colapsable

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd playstation-plus-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Cabecera de la aplicación
│   └── Sidebar.jsx     # Barra lateral de navegación
├── pages/              # Páginas principales
│   ├── Dashboard.jsx   # Página de inicio
│   ├── GameCatalog.jsx # Catálogo de juegos
│   ├── Friends.jsx     # Gestión de amigos
│   ├── Messages.jsx    # Sistema de mensajería
│   └── Profile.jsx     # Perfil de usuario
├── hooks/              # Hooks personalizados
│   └── useFriends.js   # Lógica de amigos y mensajes
├── data/               # Datos mock
│   ├── mockData.js     # Datos de prueba (amigos, mensajes)
│   └── gamesData.js    # Datos del catálogo de juegos
├── App.jsx             # Componente principal
├── App.css             # Estilos específicos de componentes
├── index.css           # Estilos globales y variables CSS
└── main.jsx            # Punto de entrada
```

## 🎯 Características Técnicas

### Gestión de Estado
- **React Hooks**: useState, useEffect para gestión de estado local
- **Custom Hooks**: Lógica reutilizable para amigos y mensajes
- **Props Drilling**: Comunicación entre componentes

### Datos Mock
- Sistema completo de datos de prueba
- Simulación de operaciones asíncronas
- Estados realistas de usuarios y conversaciones

### Optimización
- **Lazy Loading**: Componentes cargados bajo demanda
- **Memoización**: Optimización de re-renders
- **CSS Optimizado**: Variables CSS para theming eficiente

## 🎮 Funcionalidades Implementadas

### Dashboard
- ✅ Estadísticas de usuario
- ✅ Juegos recientes
- ✅ Amigos en línea
- ✅ Logros recientes

### Catálogo de Juegos
- ✅ Exploración de juegos con grid moderno
- ✅ Filtrado por categorías
- ✅ Sistema de búsqueda
- ✅ Filtros avanzados (precio, etiquetas)
- ✅ Modal detallado de juegos
- ✅ Sistema de valoraciones
- ✅ Información completa de juegos
- ✅ Capturas de pantalla

### Amigos
- ✅ Lista de amigos con estado
- ✅ Solicitudes de amistad
- ✅ Buscar amigos
- ✅ Agregar nuevos amigos
- ✅ Filtros y búsqueda

### Mensajes
- ✅ Chat en tiempo real (simulado)
- ✅ Lista de conversaciones
- ✅ Indicadores de mensajes no leídos
- ✅ Búsqueda de conversaciones
- ✅ Envío de mensajes

### Perfil
- ✅ Información de usuario
- ✅ Logros y trofeos
- ✅ Estadísticas de juegos
- ✅ Progreso de juegos

## 🔮 Posibles Mejoras Futuras

- Integración con WebSocket para chat en tiempo real
- Sistema de notificaciones push
- Integración con API real de PlayStation
- Modo offline con sincronización
- Temas personalizables
- Soporte para múltiples idiomas
- Sistema de grupos y salas de chat
- Integración con streaming de juegos

## 🎨 Paleta de Colores

```css
--ps-blue: #0070d4          /* Azul principal PlayStation */
--ps-light-blue: #00b4d8    /* Azul claro */
--ps-dark-blue: #003087     /* Azul oscuro */
--ps-black: #000000         /* Negro */
--ps-dark-gray: #1a1a1a     /* Gris oscuro */
--ps-gray: #2d2d2d          /* Gris medio */
--ps-light-gray: #4a4a4a    /* Gris claro */
--ps-white: #ffffff         /* Blanco */
--ps-success: #00d68f       /* Verde éxito */
--ps-warning: #ffb800       /* Amarillo advertencia */
--ps-error: #ff3366         /* Rojo error */
```

## 📄 Licencia

Este proyecto es solo para fines educativos y demostrativos. No está afiliado oficialmente con Sony PlayStation.

---

Desarrollado con ❤️ para demostrar habilidades en React y diseño moderno de interfaces.
