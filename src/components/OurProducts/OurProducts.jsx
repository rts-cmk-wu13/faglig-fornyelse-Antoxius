import { NavLink } from 'react-router-dom';
import './OurProducts.css';

function OurProducts() {
  const products = [
    { id: 1, name: 'Product 1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', link: '/shop?product=1' },
    { id: 2, name: 'Product 2', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', link: '/shop?product=2' },
    { id: 3, name: 'Product 3', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', link: '/shop?product=3' },
  ];

  return (
    <div className="our-products-container">
      <h2 className="our-products-title">Our Products</h2>
      <p className="our-products-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <NavLink to="/shop" className="our-products-button">Shop All</NavLink>
      <div className="our-products-grid">
        {products.map((product) => (
          <a 
            key={product.id} 
            href={product.link} 
            className="product-card-item"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="product-card-image"
            />
            <div className="product-card-overlay">
              <h3 className="product-card-name">{product.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurProducts;
