# 🎮 LudereNet - Plataforma Gaming Moderna

Una aplicación web completa inspirada en PlayStation Network, desarrollada con **React 18** y técnicas modernas de frontend. Incluye sistema de autenticación, carrito de compras, validación de pagos y experiencia gaming completa.

---

## 🔧 **TÉCNICAS Y PATRONES IMPLEMENTADOS**

### **1. 🏗️ ARQUITECTURA DE COMPONENTES**

#### **Component-Based Architecture**
```jsx
// Patrón de composición de componentes
function App() {
  return (
    <AuthProvider>          // Contexto global
      <AppContent />        // Lógica de renderizado condicional
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <Login />;
}
```

#### **Custom Hooks Pattern**
```jsx
// src/hooks/useAuth.jsx - Lógica reutilizable
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Persistencia con localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('luderenet_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  
  return { user, login, logout, isAuthenticated: !!user };
}
```

### **2. 🎨 SISTEMA DE DISEÑO ESCALABLE**

#### **CSS Variables para Theming**
```css
:root {
  /* Colores del sistema */
  --ps-blue: #00cdff;
  --ps-dark-blue: #003087;
  --ps-navy: #1e3a8a;
  
  /* Espaciado consistente */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Typography scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
}
```

#### **BEM Methodology + Component Scoping**
```css
/* Sidebar component styles */
.sidebar { /* Block */ }
.sidebar__header { /* Element */ }
.sidebar--collapsed { /* Modifier */ }

/* Estado-based classes */
.user-info { }
.user-info.collapsed { }
```

### **3. 🔐 GESTIÓN DE ESTADO AVANZADA**

#### **Context API + Provider Pattern**
```jsx
// Patrón Provider para estado global
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const value = {
    user,
    login: (accountType) => { /* lógica de login */ },
    logout: () => { /* cleanup de datos */ }
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

#### **Estado Local + Persistencia**
```jsx
// Carrito con persistencia automática
export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('luderenet_cart')) || [];
  });
  
  useEffect(() => {
    localStorage.setItem('luderenet_cart', JSON.stringify(cartItems));
  }, [cartItems]);
}
```

### **4. 📱 RESPONSIVE DESIGN PATTERNS**

#### **Mobile-First + Progressive Enhancement**
```css
/* Diseño base para móvil */
.sidebar { display: none; }
.compass-menu { display: flex; }

/* Enhancement para desktop */
@media (min-width: 768px) {
  .sidebar { display: flex; }
  .compass-menu { display: none; }
}
```

#### **CSS Grid + Flexbox Hybrid**
```css
.checkout-container {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Desktop: 2 columnas */
  gap: var(--spacing-xl);
}

@media (max-width: 768px) {
  .checkout-container {
    grid-template-columns: 1fr;     /* Mobile: 1 columna */
  }
}
```

### **5. 🛒 E-COMMERCE PATTERNS**

#### **Shopping Cart State Management**
```jsx
export function useCart() {
  const addToCart = (game) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === game.id);
      if (existing) {
        return prev.map(item => 
          item.id === game.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });
  };
}
```

#### **Form Validation with Real-time Feedback**
```jsx
// Validación en tiempo real con algoritmo de Luhn
const validateCard = (cardNumber) => {
  if (!cardNumber) return 'Número de tarjeta requerido';
  if (!isValidLuhn(cardNumber)) return 'Número de tarjeta inválido';
  return '';
};

const isValidLuhn = (num) => {
  const digits = num.replace(/\s/g, '').split('').reverse();
  let sum = 0;
  
  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  
  return sum % 10 === 0;
};
```

### **6. 🎯 PERFORMANCE OPTIMIZATION**

#### **Conditional Rendering**
```jsx
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Login />;
  return <AuthenticatedApp />;
}
```

#### **Event Handling Optimization**
```jsx
// Debounced search para evitar llamadas excesivas
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchTerm]);
```

### **7. 🔒 SECURITY PATTERNS**

#### **Input Sanitization**
```jsx
const formatCardNumber = (value) => {
  // Solo permitir números
  const numbers = value.replace(/\D/g, '');
  // Limitar a 16 dígitos
  const limited = numbers.slice(0, 16);
  // Formatear con espacios cada 4 dígitos
  return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
};
```

#### **Data Validation Layers**
```jsx
// Validación en el frontend
const handleSubmit = (formData) => {
  const errors = validatePaymentForm(formData);
  if (errors.length > 0) {
    setFormErrors(errors);
    return;
  }
  
  // Simulación de proceso de pago
  processPayment(formData);
};
```

### **8. 🎨 ANIMATION & UX PATTERNS**

#### **CSS Transitions + State Classes**
```css
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.expanded {
  transform: translateX(0);
}
```

#### **Loading States**
```jsx
const [isLoggingIn, setIsLoggingIn] = useState(false);

const handleLogin = async (accountType) => {
  setIsLoggingIn(true);
  
  // Simular delay de autenticación
  setTimeout(() => {
    login(accountType);
    setIsLoggingIn(false);
  }, 1000);
};
```

---

## 🚀 **FUNCIONALIDADES IMPLEMENTADAS**

### ✅ **Sistema de Autenticación**
- Login con cuentas predefinidas
- Context API para estado global
- Persistencia con localStorage
- Protección de rutas

### ✅ **E-commerce Completo**
- Carrito de compras funcional
- Validación de tarjetas (Algoritmo de Luhn)
- Formateo automático de campos
- Proceso de checkout completo
- Historial de compras

### ✅ **Navegación Responsive**
- Sidebar para desktop
- CompassMenu para mobile
- Navegación por teclado (Ctrl+B, Ctrl+Space)
- Estados visuales de hover/active

### ✅ **Sistema de Notificaciones**
- Gestión de estado con custom hooks
- Contadores en tiempo real
- Diferentes tipos de notificaciones

### ✅ **Biblioteca Personal**
- Solo muestra juegos comprados
- Filtrado y búsqueda
- Vista en grid/lista
- Estadísticas de juego

---

## 🛠️ **TECNOLOGÍAS Y HERRAMIENTAS**

| Tecnología | Propósito | ¿Por qué esta elección? |
|------------|-----------|-------------------------|
| **React 18** | Framework principal | Hooks modernos, mejor performance |
| **Vite** | Build tool | Más rápido que Webpack, HMR instantáneo |
| **Lucide React** | Iconografía | Consistente, ligero, amplia biblioteca |
| **CSS Variables** | Theming | Cambios globales fáciles, soporte nativo |
| **Context API** | Estado global | Nativo de React, no necesita librerías extra |
| **LocalStorage** | Persistencia | No necesita backend, datos persisten |

---

## 📁 **ESTRUCTURA DEL PROYECTO**

```
src/
├── components/           # Componentes reutilizables
│   ├── Login.jsx        # Sistema de autenticación
│   ├── Cart.jsx         # Carrito con validación
│   ├── Sidebar.jsx      # Navegación desktop
│   └── CompassMenu.jsx  # Navegación mobile
├── pages/               # Páginas principales
│   ├── GameCatalog.jsx  # Catálogo con filtros
│   ├── Profile.jsx      # Perfil de usuario
│   └── ...
├── hooks/               # Lógica reutilizable
│   ├── useAuth.jsx      # Autenticación
│   ├── useCart.js       # Carrito de compras
│   └── useFriends.js    # Sistema social
└── App.css             # Sistema de estilos (5000+ líneas)
```

---

## 🎓 **PATRONES DE DESARROLLO APRENDIDOS**

1. **Component Composition** - Componentes reutilizables y composables
2. **Custom Hooks** - Lógica de negocio separada de la UI
3. **Provider Pattern** - Estado global sin prop drilling
4. **Controlled Components** - Forms completamente controlados
5. **Conditional Rendering** - Renderizado basado en estado
6. **Error Boundaries** - Manejo de errores graceful
7. **Performance Optimization** - Evitar re-renders innecesarios

---

## 🚀 **INSTALACIÓN Y USO**

```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd luderenet

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

---

## 🎮 **CUENTAS DE PRUEBA**

- **chris1905ch** - Cuenta con PlayStation Plus (Nivel Platinum)
- **player_2024** - Cuenta estándar (Nivel Gold)

---

¿Te gustaría que profundice en alguna técnica específica o que explique cómo implementé alguna funcionalidad en particular?