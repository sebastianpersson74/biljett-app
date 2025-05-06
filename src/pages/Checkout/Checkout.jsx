import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useCartStore } from '../../store/cartStore';

const Checkout = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const navigate = useNavigate();

  const handleGoToEvents = () => {
    navigate('/events');
    };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    localStorage.removeItem('myTickets');
    localStorage.setItem('myTickets', JSON.stringify(cartItems));
    localStorage.setItem('showConfetti', 'true');
    const cartCopy = JSON.parse(JSON.stringify(cartItems));
    clearCart();
    navigate('/mytickets', { state: { cart: cartCopy } });
  };

  if (cartItems.length === 0) {
    return <p>Din varukorg är tom.</p>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Order</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-item-info">
              <div className="cart-item-header">
                <h2>{item.name}</h2>
                <p>{item.date} kl. {item.time}</p>
              </div>
              <div className="ticket-controls">
                <div className="ticket-amount-controls">
                  <button className="amount-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <div className="ticket-amount">{item.quantity}</div>
                  <button className="amount-button" onClick={() => addToCart({ ...item, quantity: 1 })}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <p className="checkout-total-text">Totalt värde på order</p>
        <p className="checkout-total-price">{totalPrice} SEK</p>
        <button className="checkout-submit-button" onClick={handleOrder}>
          Skicka order
        </button>
        <button className="return-to-event-button" onClick={handleGoToEvents}>
            Köp fler biljetter
        </button>
      </div>
    </div>
  );
};

export default Checkout;
