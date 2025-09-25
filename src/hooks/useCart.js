import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('ludereNet_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('ludereNet_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (game) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === game.id);
      
      if (existingItem) {
        // Si el juego ya está en el carrito, incrementar cantidad
        return prevItems.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es nuevo, agregarlo con cantidad 1
        return [...prevItems, { 
          ...game, 
          quantity: 1,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  // Remover producto del carrito
  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === gameId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener cantidad total de productos
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Verificar si un juego está en el carrito
  const isInCart = (gameId) => {
    return cartItems.some(item => item.id === gameId);
  };

  // Obtener cantidad de un juego específico en el carrito
  const getItemQuantity = (gameId) => {
    const item = cartItems.find(item => item.id === gameId);
    return item ? item.quantity : 0;
  };

  // Procesar compra
  const processCheckout = async (paymentInfo) => {
    try {
      // Simular proceso de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una aplicación real, aquí se haría la llamada a la API de pago
      const receipt = {
        id: `LUDERE-${Date.now()}`,
        items: [...cartItems],
        total: getTotalPrice(),
        paymentMethod: paymentInfo.paymentMethod,
        date: new Date().toISOString(),
        status: 'completed'
      };

      // Limpiar carrito después de compra exitosa
      clearCart();

      // Guardar recibo en localStorage (simulando historial de compras)
      const purchaseHistory = JSON.parse(localStorage.getItem('ludereNet_purchases') || '[]');
      purchaseHistory.push(receipt);
      localStorage.setItem('ludereNet_purchases', JSON.stringify(purchaseHistory));

      return { success: true, receipt };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    processCheckout
  };
};

export default useCart;