import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import '@testing-library/jest-dom';

// Helper function to render Footer with required providers
const renderFooter = () => {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  beforeEach(() => {
    renderFooter();
  });

  describe('Component Structure', () => {
    it('should render the footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('footer');
    });

    it('should render footer content section', () => {
      const footerContent = document.querySelector('.footer-content');
      expect(footerContent).toBeInTheDocument();
    });

    it('should render footer bottom section', () => {
      const footerBottom = document.querySelector('.footer-bottom');
      expect(footerBottom).toBeInTheDocument();
    });

    it('should render all four footer sections', () => {
      const sections = document.querySelectorAll('.footer-section');
      expect(sections).toHaveLength(4);
    });
  });

  describe('Newsletter Section', () => {
    it('should render newsletter heading', () => {
      expect(screen.getByText('Sign up for our newsletter')).toBeInTheDocument();
    });

    it('should render newsletter description', () => {
      expect(screen.getByText(/get the latest updates and exclusive offers/i)).toBeInTheDocument();
    });

    it('should render newsletter form', () => {
      const form = document.querySelector('.newsletter-form');
      expect(form).toBeInTheDocument();
    });

    it('should render email input field', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should have correct CSS class for email input', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      expect(emailInput).toHaveClass('newsletter-input');
    });

    it('should render subscribe button', () => {
      const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
      expect(subscribeButton).toBeInTheDocument();
      expect(subscribeButton).toHaveAttribute('type', 'submit');
    });

    it('should have correct CSS class for subscribe button', () => {
      const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
      expect(subscribeButton).toHaveClass('newsletter-button');
    });

    it('should allow typing in email input', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('should prevent default form submission', () => {
      const form = document.querySelector('.newsletter-form');
      const mockSubmit = vi.fn((e) => e.preventDefault());
      form?.addEventListener('submit', mockSubmit);
      
      const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
      fireEvent.click(subscribeButton);
      
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe('Quick Links Section', () => {
    it('should render Quick Links heading', () => {
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
    });

    it('should render all quick links', () => {
      expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^shop$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^store$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^support$/i })).toBeInTheDocument();
    });

    it('should have correct href for Home link', () => {
      const homeLink = screen.getByRole('link', { name: /^home$/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should have correct href for Shop link', () => {
      const shopLink = screen.getByRole('link', { name: /^shop$/i });
      expect(shopLink).toHaveAttribute('href', '/shop');
    });

    it('should have correct href for Store link', () => {
      const storeLink = screen.getByRole('link', { name: /^store$/i });
      expect(storeLink).toHaveAttribute('href', '/store');
    });

    it('should have correct href for Support link', () => {
      const supportLink = screen.getByRole('link', { name: /^support$/i });
      expect(supportLink).toHaveAttribute('href', '/support');
    });

    it('should render quick links as list items', () => {
      const quickLinksSection = document.querySelectorAll('.footer-section')[1];
      const listItems = quickLinksSection?.querySelectorAll('li');
      expect(listItems?.length).toBe(4);
    });
  });

  describe('Categories Section', () => {
    it('should render Categories heading', () => {
      expect(screen.getByText('Categories')).toBeInTheDocument();
    });

    it('should render all category links', () => {
      expect(screen.getByRole('link', { name: /ziyarat/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /qura'an/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^dua$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^amal$/i })).toBeInTheDocument();
    });

    it('should have correct href for Ziyarat link', () => {
      const ziyaratLink = screen.getByRole('link', { name: /ziyarat/i });
      expect(ziyaratLink).toHaveAttribute('href', '/ziyarat');
    });

    it('should have correct href for Qura\'an link', () => {
      const quraanLink = screen.getByRole('link', { name: /qura'an/i });
      expect(quraanLink).toHaveAttribute('href', '/quraan');
    });

    it('should have correct href for Dua link', () => {
      const duaLink = screen.getByRole('link', { name: /^dua$/i });
      expect(duaLink).toHaveAttribute('href', '/dua');
    });

    it('should have correct href for Amal link', () => {
      const amalLink = screen.getByRole('link', { name: /^amal$/i });
      expect(amalLink).toHaveAttribute('href', '/amal');
    });

    it('should render category links as list items', () => {
      const categoriesSection = document.querySelectorAll('.footer-section')[2];
      const listItems = categoriesSection?.querySelectorAll('li');
      expect(listItems?.length).toBe(4);
    });
  });

  describe('Contact Section', () => {
    it('should render Contact heading', () => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render email information', () => {
      expect(screen.getByText(/email: info@example.com/i)).toBeInTheDocument();
    });

    it('should render phone information', () => {
      expect(screen.getByText(/phone: \+1 234 567 890/i)).toBeInTheDocument();
    });

    it('should render social links container', () => {
      const socialLinks = document.querySelector('.social-links');
      expect(socialLinks).toBeInTheDocument();
    });

    it('should render all three social media icons', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      expect(socialIcons).toHaveLength(3);
    });

    it('should render Facebook icon', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      expect(socialIcons[0]).toBeInTheDocument();
    });

    it('should render Twitter icon', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      expect(socialIcons[1]).toBeInTheDocument();
    });

    it('should render Instagram icon', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      expect(socialIcons[2]).toBeInTheDocument();
    });

    it('should have # href for social media links', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      socialIcons.forEach(icon => {
        expect(icon).toHaveAttribute('href', '#');
      });
    });

    it('should have social-icon class for all social links', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      socialIcons.forEach(icon => {
        expect(icon).toHaveClass('social-icon');
      });
    });
  });

  describe('Footer Bottom', () => {
    it('should render copyright text', () => {
      expect(screen.getByText(/© 2025 your company. all rights reserved./i)).toBeInTheDocument();
    });

    it('should have correct year in copyright', () => {
      expect(screen.getByText(/2025/)).toBeInTheDocument();
    });

    it('should render footer bottom with correct class', () => {
      const footerBottom = document.querySelector('.footer-bottom');
      expect(footerBottom).toHaveClass('footer-bottom');
    });
  });

  describe('Footer Headings', () => {
    it('should render all section headings as h3', () => {
      const headings = document.querySelectorAll('.footer-heading');
      expect(headings).toHaveLength(4);
      
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });

    it('should have correct heading text for all sections', () => {
      expect(screen.getByText('Sign up for our newsletter')).toBeInTheDocument();
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should have footer-content class', () => {
      const footerContent = document.querySelector('.footer-content');
      expect(footerContent).toHaveClass('footer-content');
    });

    it('should have footer-section class on all sections', () => {
      const sections = document.querySelectorAll('.footer-section');
      sections.forEach(section => {
        expect(section).toHaveClass('footer-section');
      });
    });

    it('should have footer-heading class on all headings', () => {
      const headings = document.querySelectorAll('.footer-heading');
      headings.forEach(heading => {
        expect(heading).toHaveClass('footer-heading');
      });
    });

    it('should have footer-text class on descriptive text', () => {
      const footerTexts = document.querySelectorAll('.footer-text');
      expect(footerTexts.length).toBeGreaterThan(0);
    });

    it('should have footer-links class on link lists', () => {
      const footerLinks = document.querySelectorAll('.footer-links');
      expect(footerLinks).toHaveLength(2);
    });
  });

  describe('Navigation Links', () => {
    it('should render all 8 navigation links', () => {
      // 4 Quick Links + 4 Categories
      const allLinks = screen.getAllByRole('link');
      // Filter out social media links (which have href="#")
      const navLinks = Array.from(allLinks).filter(link => 
        link.getAttribute('href') !== '#'
      );
      expect(navLinks.length).toBe(8);
    });

    it('should use NavLink component for navigation', () => {
      const homeLink = screen.getByRole('link', { name: /^home$/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should have form with proper structure', () => {
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should have email input with proper type', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should have submit button with proper type', () => {
      const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
      expect(subscribeButton).toHaveAttribute('type', 'submit');
    });

    it('should have navigation lists with proper structure', () => {
      const lists = document.querySelectorAll('ul');
      expect(lists.length).toBe(2);
    });

    it('should render all links as anchor elements', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });
  });

  describe('Form Interaction', () => {
    it('should update email input value on change', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      expect(emailInput).toHaveValue('user@example.com');
    });

    it('should clear email input value', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      expect(emailInput).toHaveValue('test@test.com');
      
      fireEvent.change(emailInput, { target: { value: '' } });
      expect(emailInput).toHaveValue('');
    });

    it('should handle multiple email changes', () => {
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      
      fireEvent.change(emailInput, { target: { value: 'first@test.com' } });
      expect(emailInput).toHaveValue('first@test.com');
      
      fireEvent.change(emailInput, { target: { value: 'second@test.com' } });
      expect(emailInput).toHaveValue('second@test.com');
    });
  });

  describe('Content Validation', () => {
    it('should display complete newsletter description', () => {
      const description = screen.getByText(/get the latest updates and exclusive offers delivered to your inbox/i);
      expect(description).toBeInTheDocument();
    });

    it('should display complete email contact', () => {
      expect(screen.getByText('Email: info@example.com')).toBeInTheDocument();
    });

    it('should display complete phone contact', () => {
      expect(screen.getByText('Phone: +1 234 567 890')).toBeInTheDocument();
    });

    it('should display complete copyright text', () => {
      const copyrightText = screen.getByText(/© 2025 your company. all rights reserved./i);
      expect(copyrightText).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should render all required sections', () => {
      expect(screen.getByText('Sign up for our newsletter')).toBeInTheDocument();
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Social Media Integration', () => {
    it('should render social media section', () => {
      const socialLinks = document.querySelector('.social-links');
      expect(socialLinks).toBeInTheDocument();
    });

    it('should render exactly 3 social media links', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      expect(socialIcons).toHaveLength(3);
    });

    it('should render social icons as anchor tags', () => {
      const socialIcons = document.querySelectorAll('.social-icon');
      socialIcons.forEach(icon => {
        expect(icon.tagName).toBe('A');
      });
    });
  });
});
