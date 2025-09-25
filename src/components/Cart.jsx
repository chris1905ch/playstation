import { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  ArrowRight,
  Package,
  CheckCircle,
  X,
  ShoppingBag
} from 'lucide-react';
import useCart from '../hooks/useCart';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    processCheckout
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    billingAddress: ''
  });
  const [errors, setErrors] = useState({});

  // Función para formatear número de tarjeta (agregar espacios cada 4 dígitos)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Función para formatear fecha de vencimiento (MM/YY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D+/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Función para detectar tipo de tarjeta
  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    if (/^6/.test(num)) return 'Discover';
    return '';
  };

  // Validaciones
  const validateCard = () => {
    const newErrors = {};
    
    // Validar nombre del titular
    if (!paymentInfo.holderName.trim()) {
      newErrors.holderName = 'El nombre del titular es requerido';
    } else if (paymentInfo.holderName.trim().length < 2) {
      newErrors.holderName = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(paymentInfo.holderName)) {
      newErrors.holderName = 'El nombre solo puede contener letras y espacios';
    }

    // Validar número de tarjeta
    const cardNumber = paymentInfo.cardNumber.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'El número de tarjeta debe tener entre 13 y 19 dígitos';
    } else if (!/^\d+$/.test(cardNumber)) {
      newErrors.cardNumber = 'El número de tarjeta solo puede contener números';
    } else if (!isValidLuhn(cardNumber)) {
      newErrors.cardNumber = 'El número de tarjeta no es válido';
    }

    // Validar fecha de vencimiento
    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = 'La fecha de vencimiento es requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/YY)';
    } else {
      const [month, year] = paymentInfo.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Mes inválido (01-12)';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'La tarjeta está vencida';
      }
    }

    // Validar CVV
    if (!paymentInfo.cvv) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 o 4 dígitos';
    }

    // Validar dirección
    if (!paymentInfo.billingAddress.trim()) {
      newErrors.billingAddress = 'La dirección de facturación es requerida';
    } else if (paymentInfo.billingAddress.trim().length < 10) {
      newErrors.billingAddress = 'La dirección debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Algoritmo de Luhn para validar número de tarjeta
  const isValidLuhn = (cardNumber) => {
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return (sum % 10) === 0;
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    switch (field) {
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        if (formattedValue.replace(/\s/g, '').length > 19) return;
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(value);
        if (formattedValue.replace(/\D/g, '').length > 4) return;
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').substring(0, 4);
        break;
      case 'holderName':
        formattedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        if (formattedValue.length > 50) return;
        break;
    }
    
    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleQuantityChange = (gameId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(gameId);
    } else {
      updateQuantity(gameId, newQuantity);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // Validar formulario antes de procesar
    if (!validateCard()) {
      return;
    }
    
    setIsProcessing(true);

    try {
      const result = await processCheckout(paymentInfo);
      
      if (result.success) {
        setReceipt(result.receipt);
        setPurchaseComplete(true);
        setShowCheckout(false);
        // Limpiar formulario
        setPaymentInfo({
          paymentMethod: 'credit-card',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          holderName: '',
          billingAddress: ''
        });
        setErrors({});
      } else {
        alert('Error en el procesamiento del pago. Intenta nuevamente.');
      }
    } catch (error) {
      alert('Error inesperado. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `$${price.toFixed(2)}`;
  };

  // Si la compra fue exitosa, mostrar confirmación
  if (purchaseComplete && receipt) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <div className="header-content">
            <CheckCircle className="success-icon" size={24} />
            <h2>¡Compra Exitosa!</h2>
          </div>
        </div>

        <div className="purchase-confirmation">
          <div className="confirmation-card">
            <div className="confirmation-header">
              <Package size={48} />
              <h3>Tu pedido ha sido procesado</h3>
              <p>ID de transacción: {receipt.id}</p>
            </div>

            <div className="purchased-items">
              <h4>Juegos comprados:</h4>
              {receipt.items.map(item => (
                <div key={item.id} className="purchased-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h5>{item.name}</h5>
                    <p>Cantidad: {item.quantity}</p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="purchase-total">
              <h4>Total pagado: {formatPrice(receipt.total)}</h4>
            </div>

            <div className="confirmation-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setPurchaseComplete(false);
                  setReceipt(null);
                }}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si está en proceso de checkout
  if (showCheckout) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <div className="header-content">
            <button 
              className="back-btn"
              onClick={() => setShowCheckout(false)}
            >
              <ArrowRight className="rotated" size={20} />
            </button>
            <CreditCard size={24} />
            <h2>Finalizar Compra</h2>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-summary">
            <h3>Resumen del pedido</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    {formatPrice(item.price)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <h4>Total: {formatPrice(getTotalPrice())}</h4>
            </div>
          </div>

          <form className="payment-form" onSubmit={handleCheckout}>
            <h3>Información de pago</h3>
            
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentInfo.paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentInfo({...paymentInfo, paymentMethod: e.target.value})}
                />
                <CreditCard size={16} />
                Tarjeta de Crédito/Débito
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="holderName">Nombre del titular *</label>
              <input
                type="text"
                id="holderName"
                value={paymentInfo.holderName}
                onChange={(e) => handleInputChange('holderName', e.target.value)}
                className={errors.holderName ? 'error' : ''}
                required
                placeholder="Nombre completo como aparece en la tarjeta"
                maxLength="50"
              />
              {errors.holderName && (
                <span className="error-message">{errors.holderName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">
                Número de tarjeta *
                {getCardType(paymentInfo.cardNumber) && (
                  <span className="card-type">{getCardType(paymentInfo.cardNumber)}</span>
                )}
              </label>
              <input
                type="text"
                id="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className={errors.cardNumber ? 'error' : ''}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="23"
              />
              {errors.cardNumber && (
                <span className="error-message">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Vencimiento *</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className={errors.expiryDate ? 'error' : ''}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && (
                  <span className="error-message">{errors.expiryDate}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="password"
                  id="cvv"
                  value={paymentInfo.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className={errors.cvv ? 'error' : ''}
                  required
                  placeholder="123"
                  maxLength="4"
                />
                {errors.cvv && (
                  <span className="error-message">{errors.cvv}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="billingAddress">Dirección de facturación *</label>
              <textarea
                id="billingAddress"
                value={paymentInfo.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                className={errors.billingAddress ? 'error' : ''}
                required
                placeholder="Calle, número, ciudad, código postal, país"
                rows="3"
                maxLength="200"
              />
              {errors.billingAddress && (
                <span className="error-message">{errors.billingAddress}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary checkout-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Pagar {formatPrice(getTotalPrice())}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Vista principal del carrito
  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="header-content">
          <ShoppingCart size={24} />
          <h2>Carrito de Compras</h2>
          <span className="item-count">({getTotalItems()} productos)</span>
        </div>
        {cartItems.length > 0 && (
          <button 
            className="clear-cart-btn"
            onClick={clearCart}
            title="Limpiar carrito"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-content">
            <ShoppingBag size={64} />
            <h3>Tu carrito está vacío</h3>
            <p>¡Agrega algunos juegos increíbles para empezar!</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Explorar Tienda
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-genre">{item.genre}</p>
                  <p className="item-platform">{item.platform}</p>
                  <p className="item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar del carrito"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="item-total">
                  {formatPrice(parseFloat(item.price.replace('$', '')) * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal ({getTotalItems()} productos)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span className="free">GRATIS</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <button 
                className="btn btn-primary checkout-btn"
                onClick={() => setShowCheckout(true)}
              >
                <CreditCard size={16} />
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;