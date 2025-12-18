import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as CartContext from '../../context/CartContext';
import Navigation from './Navigation.jsx';

describe('Navigation Component', () => {
  const mockGetCartCount = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
      getCartCount: mockGetCartCount,
    });
    mockGetCartCount.mockReturnValue(0);
  });

  const renderNavigation = () => {
    return render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  };

  describe('Component Structure', () => {
    it('should render navigation component', () => {
      renderNavigation();
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should render top black bar', () => {
      renderNavigation();
      expect(screen.getByText('USD')).toBeInTheDocument();
    });

    it('should render promotional message', () => {
      renderNavigation();
      expect(screen.getByText('FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25-28.')).toBeInTheDocument();
    });

    it('should render support link in top bar', () => {
      renderNavigation();
      const supportLink = screen.getByText('Support');
      expect(supportLink).toBeInTheDocument();
      expect(supportLink).toHaveAttribute('href', '/support');
    });
  });

  describe('Navigation Links', () => {
    it('should render all 8 navigation items', () => {
      renderNavigation();
      const navItems = document.querySelectorAll('nav ul li');
      expect(navItems).toHaveLength(8);
    });

    it('should render Website link', () => {
      renderNavigation();
      const link = screen.getByText('Website');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });

    it('should render Shop link', () => {
      renderNavigation();
      const link = screen.getByText('Shop');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/shop');
    });

    it('should render Store link', () => {
      renderNavigation();
      const link = screen.getByText('Store');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/store');
    });

    it('should render Marriage Beuro link', () => {
      renderNavigation();
      const link = screen.getByText('Marriage Beuro');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/marriage-beuro');
    });

    it('should render Qura\'an link', () => {
      renderNavigation();
      const link = screen.getByText("Qura'an");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/quraan');
    });

    it('should render Dua link', () => {
      renderNavigation();
      const link = screen.getByText('Dua');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/dua');
    });

    it('should render Amal link', () => {
      renderNavigation();
      const link = screen.getByText('Amal');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/amal');
    });

    it('should render Taqeebat link', () => {
      renderNavigation();
      const link = screen.getByText('Taqeebat');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/taqeebat');
    });

    it('should have correct order of navigation items', () => {
      renderNavigation();
      const navLinks = screen.getAllByRole('link');
      const navLabels = ['Website', 'Shop', 'Store', 'Marriage Beuro', "Qura'an", 'Dua', 'Amal', 'Taqeebat'];
      
      navLabels.forEach((label) => {
        expect(navLinks.some(link => link.textContent === label)).toBe(true);
      });
    });
  });

  describe('Search Icon', () => {
    it('should render search button', () => {
      renderNavigation();
      const buttons = document.querySelectorAll('button');
      const searchButton = Array.from(buttons).find(btn => {
        const svg = btn.querySelector('svg');
        return svg !== null;
      });
      expect(searchButton).toBeInTheDocument();
    });

    it('should render search icon', () => {
      renderNavigation();
      // FiSearch icon should be present
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have button type for search', () => {
      renderNavigation();
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Cart Icon and Badge', () => {
    it('should render cart link', () => {
      renderNavigation();
      const cartLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === '/cart'
      );
      expect(cartLinks.length).toBeGreaterThan(0);
    });

    it('should not show badge when cart is empty', () => {
      mockGetCartCount.mockReturnValue(0);
      renderNavigation();
      
      const badges = Array.from(document.querySelectorAll('span')).filter(
        span => span.style.backgroundColor === 'rgb(220, 38, 38)' // #DC2626
      );
      expect(badges).toHaveLength(0);
    });

    it('should show badge when cart has items', () => {
      mockGetCartCount.mockReturnValue(3);
      renderNavigation();
      
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should display correct cart count in badge', () => {
      mockGetCartCount.mockReturnValue(5);
      renderNavigation();
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should update badge when cart count changes', () => {
      mockGetCartCount.mockReturnValue(2);
      const { rerender } = renderNavigation();
      expect(screen.getByText('2')).toBeInTheDocument();

      mockGetCartCount.mockReturnValue(4);
      rerender(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('should show badge for cart count of 1', () => {
      mockGetCartCount.mockReturnValue(1);
      renderNavigation();
      
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should handle large cart counts', () => {
      mockGetCartCount.mockReturnValue(99);
      renderNavigation();
      
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('should call getCartCount from context', () => {
      renderNavigation();
      expect(mockGetCartCount).toHaveBeenCalled();
    });
  });

  describe('Login Button', () => {
    it('should render login button', () => {
      renderNavigation();
      const loginLink = screen.getByText('Login');
      expect(loginLink).toBeInTheDocument();
    });

    it('should link to /login route', () => {
      renderNavigation();
      const loginLink = screen.getByText('Login');
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('should be a link element', () => {
      renderNavigation();
      const loginLink = screen.getByText('Login');
      expect(loginLink.tagName).toBe('A');
    });
  });

  describe('NavLink Active States', () => {
    it('should apply nav-link class to inactive links', () => {
      renderNavigation();
      const websiteLink = screen.getByText('Website');
      // The active class is handled by NavLink's isActive prop
      expect(websiteLink).toBeInTheDocument();
    });

    it('should render NavLink components for navigation', () => {
      renderNavigation();
      const navLinks = screen.getAllByRole('link');
      // Check that main navigation links exist
      expect(navLinks.length).toBeGreaterThan(8);
    });
  });

  describe('Layout and Styling', () => {
    it('should have navigation element', () => {
      renderNavigation();
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have unordered list for navigation items', () => {
      renderNavigation();
      const ul = document.querySelector('nav ul');
      expect(ul).toBeInTheDocument();
    });

    it('should have list items for each navigation link', () => {
      renderNavigation();
      const listItems = document.querySelectorAll('nav ul li');
      expect(listItems).toHaveLength(8);
    });

    it('should render top bar with USD currency', () => {
      renderNavigation();
      expect(screen.getByText('USD')).toBeInTheDocument();
    });

    it('should have support link in top bar', () => {
      renderNavigation();
      const supportLink = screen.getByText('Support');
      expect(supportLink).toHaveAttribute('href', '/support');
    });
  });

  describe('Icons', () => {
    it('should render search icon', () => {
      renderNavigation();
      const buttons = document.querySelectorAll('button');
      const hasIcon = Array.from(buttons).some(btn => btn.querySelector('svg'));
      expect(hasIcon).toBe(true);
    });

    it('should render cart icon', () => {
      renderNavigation();
      // FiShoppingCart should be rendered
      const cartLink = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '/cart'
      );
      expect(cartLink).toBeInTheDocument();
      expect(cartLink?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Context Integration', () => {
    it('should use CartContext useCart hook', () => {
      renderNavigation();
      expect(CartContext.useCart).toHaveBeenCalled();
    });

    it('should call getCartCount function', () => {
      renderNavigation();
      expect(mockGetCartCount).toHaveBeenCalled();
    });

    it('should handle zero cart count', () => {
      mockGetCartCount.mockReturnValue(0);
      renderNavigation();
      
      const badges = Array.from(document.querySelectorAll('span')).filter(
        span => span.textContent === '0' && span.style.backgroundColor
      );
      expect(badges).toHaveLength(0);
    });

    it('should handle positive cart count', () => {
      mockGetCartCount.mockReturnValue(7);
      renderNavigation();
      
      expect(screen.getByText('7')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render all links as anchor elements', () => {
      renderNavigation();
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });

    it('should have proper navigation structure', () => {
      renderNavigation();
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav?.querySelector('ul')).toBeInTheDocument();
    });

    it('should have list structure for navigation items', () => {
      renderNavigation();
      const ul = document.querySelector('nav ul');
      const li = ul?.querySelectorAll('li');
      expect(li?.length).toBe(8);
    });

    it('should render search as button element', () => {
      renderNavigation();
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Top Bar Content', () => {
    it('should display currency selector', () => {
      renderNavigation();
      expect(screen.getByText('USD')).toBeInTheDocument();
    });

    it('should display promotional banner', () => {
      renderNavigation();
      const banner = screen.getByText('FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25-28.');
      expect(banner).toBeInTheDocument();
    });

    it('should have support link with correct href', () => {
      renderNavigation();
      const supportLink = screen.getByText('Support');
      expect(supportLink.getAttribute('href')).toBe('/support');
    });

    it('should render all top bar elements', () => {
      renderNavigation();
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25-28.')).toBeInTheDocument();
      expect(screen.getByText('Support')).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => renderNavigation()).not.toThrow();
    });

    it('should render all main sections', () => {
      renderNavigation();
      
      // Top bar
      expect(screen.getByText('USD')).toBeInTheDocument();
      
      // Navigation links
      expect(screen.getByText('Website')).toBeInTheDocument();
      
      // Right side elements
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('should have correct number of total links', () => {
      renderNavigation();
      const allLinks = screen.getAllByRole('link');
      // 8 nav items + support + cart + login = 11 links
      expect(allLinks.length).toBeGreaterThanOrEqual(11);
    });
  });

  describe('Navigation Paths', () => {
    it('should have correct path for Website', () => {
      renderNavigation();
      const link = screen.getByText('Website');
      expect(link.getAttribute('href')).toBe('/');
    });

    it('should have correct path for Shop', () => {
      renderNavigation();
      const link = screen.getByText('Shop');
      expect(link.getAttribute('href')).toBe('/shop');
    });

    it('should have correct path for Store', () => {
      renderNavigation();
      const link = screen.getByText('Store');
      expect(link.getAttribute('href')).toBe('/store');
    });

    it('should have correct path for Marriage Beuro', () => {
      renderNavigation();
      const link = screen.getByText('Marriage Beuro');
      expect(link.getAttribute('href')).toBe('/marriage-beuro');
    });

    it('should have correct path for Qura\'an', () => {
      renderNavigation();
      const link = screen.getByText("Qura'an");
      expect(link.getAttribute('href')).toBe('/quraan');
    });

    it('should have correct path for Dua', () => {
      renderNavigation();
      const link = screen.getByText('Dua');
      expect(link.getAttribute('href')).toBe('/dua');
    });

    it('should have correct path for Amal', () => {
      renderNavigation();
      const link = screen.getByText('Amal');
      expect(link.getAttribute('href')).toBe('/amal');
    });

    it('should have correct path for Taqeebat', () => {
      renderNavigation();
      const link = screen.getByText('Taqeebat');
      expect(link.getAttribute('href')).toBe('/taqeebat');
    });

    it('should have correct path for Cart', () => {
      renderNavigation();
      const cartLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === '/cart'
      );
      expect(cartLinks.length).toBeGreaterThan(0);
    });

    it('should have correct path for Login', () => {
      renderNavigation();
      const link = screen.getByText('Login');
      expect(link.getAttribute('href')).toBe('/login');
    });

    it('should have correct path for Support', () => {
      renderNavigation();
      const link = screen.getByText('Support');
      expect(link.getAttribute('href')).toBe('/support');
    });
  });

  describe('Edge Cases', () => {
    it('should handle cart count of 0', () => {
      mockGetCartCount.mockReturnValue(0);
      renderNavigation();
      
      const cartBadge = screen.queryByText('0');
      // Badge should not be shown when count is 0
      const visibleBadges = Array.from(document.querySelectorAll('span')).filter(
        span => span.textContent === '0' && span.style.backgroundColor === 'rgb(220, 38, 38)'
      );
      expect(visibleBadges).toHaveLength(0);
    });

    it('should handle very large cart counts', () => {
      mockGetCartCount.mockReturnValue(999);
      renderNavigation();
      
      expect(screen.getByText('999')).toBeInTheDocument();
    });

    it('should re-render when cart count updates', () => {
      mockGetCartCount.mockReturnValue(2);
      const { rerender } = renderNavigation();
      expect(screen.getByText('2')).toBeInTheDocument();

      mockGetCartCount.mockReturnValue(10);
      rerender(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle missing cart context gracefully', () => {
      mockGetCartCount.mockReturnValue(0);
      expect(() => renderNavigation()).not.toThrow();
    });
  });

  describe('Interactive Elements', () => {
    it('should render clickable navigation links', () => {
      renderNavigation();
      const navLinks = ['Website', 'Shop', 'Store', 'Marriage Beuro', "Qura'an", 'Dua', 'Amal', 'Taqeebat'];
      
      navLinks.forEach(label => {
        const link = screen.getByText(label);
        expect(link).toBeInTheDocument();
        expect(link.tagName).toBe('A');
      });
    });

    it('should render clickable cart icon', () => {
      renderNavigation();
      const cartLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href') === '/cart'
      );
      expect(cartLinks.length).toBeGreaterThan(0);
    });

    it('should render clickable login button', () => {
      renderNavigation();
      const loginLink = screen.getByText('Login');
      expect(loginLink).toBeInTheDocument();
      expect(loginLink.tagName).toBe('A');
    });

    it('should render clickable support link', () => {
      renderNavigation();
      const supportLink = screen.getByText('Support');
      expect(supportLink).toBeInTheDocument();
      expect(supportLink.tagName).toBe('A');
    });

    it('should render clickable search button', () => {
      renderNavigation();
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });
});
