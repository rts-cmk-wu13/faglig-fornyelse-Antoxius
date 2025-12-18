import { NavLink } from 'react-router-dom';
import './Categories.css';

function Categories() {
  const categories = [
    { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', categoryId: 'electronics' },
    { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', categoryId: 'fashion' },
    { id: 3, name: 'Home & Living', image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400', categoryId: 'home' },
  ];

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <p className="categories-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <NavLink to="/shop" className="shop-all-button">Shop All</NavLink>
      <div className="categories-grid">
        {categories.map((category) => (
          <NavLink 
            key={category.id} 
            to={`/shop?category=${category.categoryId}`}
            className="category-card"
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="category-image"
            />
            <div className="category-overlay">
              <h3 className="category-name">{category.name}</h3>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Categories;
