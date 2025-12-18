import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import './Shop.css';
import productsData from '../../data/products.json';
import { useCart } from '../../context/CartContext';

function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const { addToCart } = useCart();

  // Read category from URL parameter and set initial filter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  const categories = [
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'home', label: 'Home & Living' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Rating' },
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...productsData.products];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      products = products.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.reverse();
        break;
      case 'rating':
      case 'popular':
      default:
        // Keep original order for popular
        break;
    }

    return products;
  }, [selectedCategories, sortBy]);

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="shop-left">
          <h2 className="shop-title">Shop</h2>
          <div className="shop-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <div className="filter-section">
              <h3 className="filter-title">Filter by Category</h3>
              <div className="filter-options">
                {categories.map((category) => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shop-right">
          <div className="sort-section">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="products-grid">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="product-card-shop">
                  <NavLink to={`/product/${product.id}`} className="product-image-wrapper-shop">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="product-image-shop"
                    />
                  </NavLink>
                  <div className="product-info-shop">
                    <NavLink to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="product-name-shop">{product.name}</h3>
                    </NavLink>
                    <p className="product-price-shop">${product.price.toFixed(2)}</p>
                    <button className="add-to-cart-btn-shop" onClick={(e) => { e.preventDefault(); addToCart(product); }}>Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                No products found. Try selecting different categories.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
