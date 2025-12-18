import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">Sign up for our newsletter</h3>
          <p className="footer-text">
            Get the latest updates and exclusive offers delivered to your inbox.
          </p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/store">Store</NavLink></li>
            <li><NavLink to="/support">Support</NavLink></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li><NavLink to="/ziyarat">Ziyarat</NavLink></li>
            <li><NavLink to="/quraan">Qura'an</NavLink></li>
            <li><NavLink to="/dua">Dua</NavLink></li>
            <li><NavLink to="/amal">Amal</NavLink></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">Email: info@example.com</p>
          <p className="footer-text">Phone: +1 234 567 890</p>
          <div className="social-links">
            <a href="#" className="social-icon"><FaFacebook size={20} /></a>
            <a href="#" className="social-icon"><FaTwitter size={20} /></a>
            <a href="#" className="social-icon"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
