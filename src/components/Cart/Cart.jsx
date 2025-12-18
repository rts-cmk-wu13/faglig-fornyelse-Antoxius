import { useCart } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty</p>
        <NavLink to="/shop" className="continue-shopping-btn">
          Continue Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  <FiMinus />
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="cart-item-total">
                <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                <IoMdClose />
              </button>
            </div>
          ))}

          <div className="order-information">
            <h2>Order Information</h2>
            
            <div className="accordion-item">
              <button 
                className={`accordion-header ${openAccordion === 0 ? 'active' : ''}`}
                onClick={() => toggleAccordion(0)}
              >
                <span>Return Policy</span>
                <span className="accordion-icon">{openAccordion === 0 ? <IoChevronUp /> : <IoChevronDown />}</span>
              </button>
              {openAccordion === 0 && (
                <div className="accordion-content">
                  <p>We offer a 30-day return policy on all items. Products must be unused and in their original packaging. Please contact our customer service team to initiate a return. Refunds will be processed within 5-7 business days after we receive your return.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button 
                className={`accordion-header ${openAccordion === 1 ? 'active' : ''}`}
                onClick={() => toggleAccordion(1)}
              >
                <span>Shipping Options</span>
                <span className="accordion-icon">{openAccordion === 1 ? <IoChevronUp /> : <IoChevronDown />}</span>
              </button>
              {openAccordion === 1 && (
                <div className="accordion-content">
                  <p><strong>Standard Shipping (5-7 business days):</strong> Free on orders over $50</p>
                  <p><strong>Express Shipping (2-3 business days):</strong> $15.00</p>
                  <p><strong>Next Day Delivery:</strong> $25.00</p>
                  <p>All shipping times are estimates and may vary based on your location.</p>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button 
                className={`accordion-header ${openAccordion === 2 ? 'active' : ''}`}
                onClick={() => toggleAccordion(2)}
              >
                <span>Shipping Options 2</span>
                <span className="accordion-icon">{openAccordion === 2 ? <IoChevronUp /> : <IoChevronDown />}</span>
              </button>
              {openAccordion === 2 && (
                <div className="accordion-content">
                  <p><strong>International Shipping:</strong> Available to select countries. Rates calculated at checkout based on destination and weight.</p>
                  <p><strong>Store Pickup:</strong> Available at select locations. Choose this option at checkout to pick up your order in-store within 24 hours.</p>
                  <p><strong>White Glove Delivery:</strong> Available for large items. Our team will deliver and set up your purchase in your home.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <NavLink to="/checkout" className="checkout-btn">Proceed to Checkout</NavLink>
          <NavLink to="/shop" className="continue-shopping-link">
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cart;
