import { useNavigate, useLocation } from 'react-router-dom';
import { FiCheck, FiPackage } from 'react-icons/fi';
import './MyOrders.css';

function MyOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="no-orders">
        <FiPackage size={80} />
        <h1>No Orders Found</h1>
        <p>You haven't placed any orders yet.</p>
        <button onClick={() => navigate('/shop')} className="shop-now-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="my-orders-container">
      <div className="order-success-header">
        <div className="success-icon-large">
          <FiCheck size={60} />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="order-details-card">
        <h2>Order Details</h2>
        
        <div className="order-info-grid">
          <div className="order-info-item">
            <span className="info-label">Order Number</span>
            <span className="info-value">#{orderData.orderNumber}</span>
          </div>
          
          <div className="order-info-item">
            <span className="info-label">Order Date</span>
            <span className="info-value">{formatDate(orderData.orderDate)}</span>
          </div>
          
          <div className="order-info-item">
            <span className="info-label">Customer Name</span>
            <span className="info-value">{orderData.customerName}</span>
          </div>
          
          <div className="order-info-item">
            <span className="info-label">Payment Status</span>
            <span className="info-value status-badge paid">
              <FiCheck size={16} /> {orderData.paymentStatus}
            </span>
          </div>
          
          <div className="order-info-item">
            <span className="info-label">Order Status</span>
            <span className="info-value status-badge processing">{orderData.orderStatus}</span>
          </div>
          
          <div className="order-info-item">
            <span className="info-label">Total Amount</span>
            <span className="info-value amount">${orderData.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="shipping-address-section">
          <h3>Shipping Address</h3>
          <div className="address-details">
            <p>{orderData.shippingAddress.address}</p>
            <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
            <p>{orderData.shippingAddress.country}</p>
          </div>
        </div>

        <div className="order-items-section">
          <h3>Order Items</h3>
          <div className="order-items-list">
            {orderData.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-section">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${orderData.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${orderData.shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${orderData.tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${orderData.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
