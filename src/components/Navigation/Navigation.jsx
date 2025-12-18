import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';

function Navigation() {
  const { getCartCount } = useCart();
  const cartItems = getCartCount();

  const navItems = [
    { path: '/', label: 'Website' },
    { path: '/shop', label: 'Shop' },
    { path: '/store', label: 'Store' },
    { path: '/marriage-beuro', label: 'Marriage Beuro' },
    { path: '/quraan', label: "Qura'an" },
    { path: '/dua', label: 'Dua' },
    { path: '/amal', label: 'Amal' },
    { path: '/taqeebat', label: 'Taqeebat' },
  ];

  return (
    <>
      {/* Top Black Bar */}
      <div style={{ backgroundColor: '#000', height: '2rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        <span style={{ color: 'white', fontSize: '0.875rem' }}>USD</span>
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25-28.</span>
        <NavLink to="/support" style={{ color: 'white', fontSize: '0.875rem', textDecoration: 'none' }}>Support</NavLink>
      </div>
      
      <nav style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
          {/* Left Side - Navigation Links */}
          <div style={{ flex: 1 }}>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '3rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'nav-link-active' : 'nav-link'
                    }
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Search, Cart, Login */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search Icon */}
            <button style={{ padding: '0.5rem', color: '#374151', cursor: 'pointer', border: 'none', background: 'transparent' }}>
              <FiSearch style={{ height: '1.5rem', width: '1.5rem' }} />
            </button>

            {/* Cart Icon with Badge */}
            <NavLink to="/cart" style={{ position: 'relative', padding: '0.5rem', color: '#374151', textDecoration: 'none' }}>
              <FiShoppingCart style={{ height: '1.5rem', width: '1.5rem' }} />
              {cartItems > 0 && (
                <span style={{ position: 'absolute', top: '-0.25rem', right: '-0.25rem', backgroundColor: '#DC2626', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px', height: '1.25rem', width: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartItems}
                </span>
              )}
            </NavLink>

            {/* Login Button */}
            <NavLink 
              to="/login"
              style={{ padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: 'white', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: '500' }}
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navigation;
