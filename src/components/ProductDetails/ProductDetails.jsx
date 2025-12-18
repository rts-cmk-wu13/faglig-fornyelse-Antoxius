import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import productsData from '../../data/products.json';
import { IoMdClose } from 'react-icons/io';
import { IoChevronBack, IoChevronForward, IoArrowBack } from 'react-icons/io5';
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const product = productsData.products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <NavLink to="/shop" className="back-to-shop-btn">Back to Shop</NavLink>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Get related products from the same category
  const relatedProducts = productsData.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <IoArrowBack /> Back
      </button>

      <div className="product-details-content">
        <div className="product-image-section">
          <div className="image-grid">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <div key={index} className="image-grid-item" onClick={() => openLightbox(index)}>
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className="image-grid-item" onClick={() => openLightbox(0)}>
                <img src={product.image} alt={product.name} />
              </div>
            )}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-category-badge">
            <span>{product.category}</span>
          </div>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <ul>
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Modern design</li>
              <li>Easy to use</li>
            </ul>
          </div>

          <div className="product-quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls-detail">
              <button onClick={decrementQuantity} className="qty-btn"><FiMinus /></button>
              <span className="qty-display">{quantity}</span>
              <button onClick={incrementQuantity} className="qty-btn"><FiPlus /></button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart} 
            className={`add-to-cart-detail-btn ${addedToCart ? 'added' : ''}`}
          >
            {addedToCart ? <><FiCheck /> Added to Cart</> : 'Add to Cart'}
          </button>

          <div className="product-features">
            <div className="feature-item">
              <strong>Free Shipping</strong>
              <span>On orders over $50</span>
            </div>
            <div className="feature-item">
              <strong>30-Day Returns</strong>
              <span>Hassle-free returns</span>
            </div>
            <div className="feature-item">
              <strong>Secure Checkout</strong>
              <span>Safe & encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <NavLink
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="related-product-card"
              >
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <h3>{relatedProduct.name}</h3>
                <p>${relatedProduct.price.toFixed(2)}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><IoMdClose /></button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}><IoChevronBack /></button>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}><IoChevronForward /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={(product.images && product.images[lightboxIndex]) || product.image} 
              alt={`${product.name} ${lightboxIndex + 1}`}
              className="lightbox-image"
            />
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {product.images ? product.images.length : 1}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
