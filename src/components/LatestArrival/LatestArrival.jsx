import './LatestArrival.css';
import { useCart } from '../../context/CartContext';

function LatestArrival() {
  const { addToCart } = useCart();
  const products = [
    {
      id: 101,
      name: 'Product 1',
      price: 99.00,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    },
    {
      id: 102,
      name: 'Product 2',
      price: 149.00,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    },
    {
      id: 103,
      name: 'Product 3',
      price: 199.00,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    },
  ];

  return (
    <div className="latest-arrival-container">
      <h2 className="latest-arrival-subtitle">Our latest arrivals</h2>
      <p className="latest-arrival-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button className="latest-arrival-button">Shop All</button>
      <div className="latest-arrival-grid">
        {products.map((product, index) => (
          <div key={product.id} className={`product-card ${index === 1 ? 'product-card-middle' : ''}`}>
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestArrival;
