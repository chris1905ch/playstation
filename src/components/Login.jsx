import React, { useState } from 'react';
import useAuth from '../hooks/useAuth.jsx';

const Login = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const accounts = [
    {
      id: 'usuario_plus',
      username: 'chris1905ch',
      email: 'chris@luderenet.com',
      hasPlus: true,
      avatar: 'https://i.pravatar.cc/100?img=3',
      level: 'Platinum',
      description: 'Cuenta con PlayStation Plus'
    },
    {
      id: 'usuario_normal',
      username: 'player_2024',
      email: 'player@luderenet.com',
      hasPlus: false,
      avatar: 'https://i.pravatar.cc/100?img=7',
      level: 'Gold',
      description: 'Cuenta estándar'
    }
  ];

  const handleLogin = async (accountType) => {
    setIsLoggingIn(true);
    setError('');
    
    // Simular un pequeño delay para mostrar el loading
    setTimeout(() => {
      const result = login(accountType);
      if (!result.success) {
        setError(result.error);
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo">
            <h1>LudereNet</h1>
            <div className="logo-subtitle">PlayStation Community</div>
          </div>
          <p>Selecciona una cuenta para continuar</p>
        </div>

        <div className="account-selection">
          {accounts.map((account) => (
            <div 
              key={account.id}
              className={`account-card ${selectedAccount === account.id ? 'selected' : ''}`}
              onClick={() => setSelectedAccount(account.id)}
            >
              <div className="account-avatar">
                <img src={account.avatar} alt={account.username} />
                {account.hasPlus && (
                  <div className="plus-badge">
                    <span>PLUS</span>
                  </div>
                )}
              </div>
              
              <div className="account-info">
                <h3>{account.username}</h3>
                <p className="account-email">{account.email}</p>
                <div className="account-level">Nivel {account.level}</div>
                <p className="account-description">{account.description}</p>
              </div>

              <div className="account-features">
                {account.hasPlus ? (
                  <div className="features-list">
                    <div className="feature">✓ Juegos gratuitos mensualmente</div>
                    <div className="feature">✓ Descuentos exclusivos</div>
                    <div className="feature">✓ Almacenamiento en la nube</div>
                    <div className="feature">✓ Multijugador online</div>
                  </div>
                ) : (
                  <div className="features-list">
                    <div className="feature">○ Acceso básico</div>
                    <div className="feature">○ Compras individuales</div>
                    <div className="feature">○ Perfil personalizable</div>
                    <div className="feature plus-required">PS Plus requerido para multijugador</div>
                  </div>
                )}
              </div>

              <button 
                className={`login-btn ${account.hasPlus ? 'plus-btn' : 'standard-btn'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogin(account.id);
                }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <span className="loading-spinner"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  `Iniciar como ${account.username}`
                )}
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div className="login-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="login-footer">
          <p>LudereNet Oficial</p>
        </div>
      </div>
    </div>
  );
};

export default Login;