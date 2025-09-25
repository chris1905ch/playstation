import { createContext, useContext, useState, useEffect } from 'react';

// Cuentas predefinidas
const PREDEFINED_ACCOUNTS = {
  'usuario_plus': {
    id: 1,
    username: 'chris1905ch',
    email: 'chris@luderenet.com',
    avatar: 'https://i.pravatar.cc/100?img=3',
    hasPlus: true,
    plusExpiry: '2025-12-31',
    joinDate: '2020-03-15',
    level: 'Platinum',
    trophies: 2847,
    gamesOwned: 156
  },
  'usuario_normal': {
    id: 2,
    username: 'player_2024',
    email: 'player@luderenet.com',
    avatar: 'https://i.pravatar.cc/100?img=7',
    hasPlus: false,
    plusExpiry: null,
    joinDate: '2024-01-10',
    level: 'Gold',
    trophies: 892,
    gamesOwned: 42
  }
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('luderenet_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('luderenet_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (accountType) => {
    const userData = PREDEFINED_ACCOUNTS[accountType];
    if (userData) {
      setUser(userData);
      localStorage.setItem('luderenet_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Cuenta no encontrada' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luderenet_user');
    // También limpiar el carrito y otros datos del usuario
    localStorage.removeItem('luderenet_cart');
    localStorage.removeItem('luderenet_purchases');
  };

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('luderenet_user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;