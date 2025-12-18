import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ComingSoon from './ComingSoon';
import '@testing-library/jest-dom';

// Helper function to render ComingSoon with required providers
const renderComingSoon = (props = {}) => {
  return render(
    <BrowserRouter>
      <ComingSoon {...props} />
    </BrowserRouter>
  );
};

describe('ComingSoon Component', () => {
  describe('Default Rendering', () => {
    beforeEach(() => {
      renderComingSoon();
    });

    it('should render the coming soon container', () => {
      const container = document.querySelector('.coming-soon-container');
      expect(container).toBeInTheDocument();
    });

    it('should render the coming soon content', () => {
      const content = document.querySelector('.coming-soon-content');
      expect(content).toBeInTheDocument();
    });

    it('should render the "Coming Soon" heading', () => {
      const heading = screen.getByRole('heading', { name: /coming soon/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('should display default page name message', () => {
      expect(screen.getByText(/this page is currently under construction/i)).toBeInTheDocument();
    });

    it('should display check back soon message', () => {
      expect(screen.getByText(/check back soon for updates!/i)).toBeInTheDocument();
    });

    it('should render back to home link', () => {
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toBeInTheDocument();
    });

    it('should have correct href for back to home link', () => {
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toHaveAttribute('href', '/');
    });

    it('should have correct CSS class for back to home link', () => {
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toHaveClass('back-home-link');
    });
  });

  describe('Custom Page Name', () => {
    it('should display custom page name when provided', () => {
      renderComingSoon({ pageName: 'Our Blog' });
      expect(screen.getByText(/our blog is currently under construction/i)).toBeInTheDocument();
    });

    it('should display "About Us" page name', () => {
      renderComingSoon({ pageName: 'About Us' });
      expect(screen.getByText(/about us is currently under construction/i)).toBeInTheDocument();
    });

    it('should display "Contact" page name', () => {
      renderComingSoon({ pageName: 'Contact' });
      expect(screen.getByText(/contact is currently under construction/i)).toBeInTheDocument();
    });

    it('should display "Services" page name', () => {
      renderComingSoon({ pageName: 'Services' });
      expect(screen.getByText(/services is currently under construction/i)).toBeInTheDocument();
    });

    it('should display custom page name with special characters', () => {
      renderComingSoon({ pageName: 'Our Team & Partners' });
      expect(screen.getByText(/our team & partners is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle empty string as page name', () => {
      renderComingSoon({ pageName: '' });
      expect(screen.getByText(/is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle long page name', () => {
      const longName = 'Our Very Long Page Name With Multiple Words';
      renderComingSoon({ pageName: longName });
      expect(screen.getByText(new RegExp(`${longName} is currently under construction`, 'i'))).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    beforeEach(() => {
      renderComingSoon();
    });

    it('should render all text paragraphs', () => {
      const paragraphs = document.querySelectorAll('.coming-soon-content p');
      expect(paragraphs.length).toBe(2);
    });

    it('should render heading before paragraphs', () => {
      const content = document.querySelector('.coming-soon-content');
      const firstChild = content?.firstElementChild;
      expect(firstChild?.tagName).toBe('H1');
    });

    it('should render link as last element', () => {
      const content = document.querySelector('.coming-soon-content');
      const lastChild = content?.lastElementChild;
      expect(lastChild?.tagName).toBe('A');
    });
  });

  describe('NavLink Integration', () => {
    it('should use NavLink component for navigation', () => {
      renderComingSoon();
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink.getAttribute('href')).toBe('/');
    });

    it('should maintain NavLink with custom page name', () => {
      renderComingSoon({ pageName: 'Gallery' });
      const backLink = screen.getByRole('link', { name: /back to home/i });
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  describe('Props Handling', () => {
    it('should use default pageName when no props provided', () => {
      renderComingSoon();
      expect(screen.getByText(/this page is currently under construction/i)).toBeInTheDocument();
    });

    it('should accept and use pageName prop', () => {
      renderComingSoon({ pageName: 'Test Page' });
      expect(screen.getByText(/test page is currently under construction/i)).toBeInTheDocument();
    });

    it('should override default with provided pageName', () => {
      renderComingSoon({ pageName: 'New Feature' });
      expect(screen.queryByText(/this page is currently under construction/i)).not.toBeInTheDocument();
      expect(screen.getByText(/new feature is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle numeric pageName', () => {
      renderComingSoon({ pageName: '404' });
      expect(screen.getByText(/404 is currently under construction/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      renderComingSoon();
    });

    it('should have proper heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('should have accessible link with descriptive text', () => {
      const link = screen.getByRole('link', { name: /back to home/i });
      expect(link).toBeInTheDocument();
      expect(link.textContent).toBeTruthy();
    });

    it('should have only one h1 heading', () => {
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
    });

    it('should render semantic HTML structure', () => {
      const container = document.querySelector('.coming-soon-container');
      expect(container).toBeTruthy();
      
      const content = container?.querySelector('.coming-soon-content');
      expect(content).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    beforeEach(() => {
      renderComingSoon();
    });

    it('should apply coming-soon-container class', () => {
      const container = document.querySelector('.coming-soon-container');
      expect(container).toHaveClass('coming-soon-container');
    });

    it('should apply coming-soon-content class', () => {
      const content = document.querySelector('.coming-soon-content');
      expect(content).toHaveClass('coming-soon-content');
    });

    it('should apply back-home-link class to link', () => {
      const link = screen.getByRole('link', { name: /back to home/i });
      expect(link).toHaveClass('back-home-link');
    });
  });

  describe('Text Content', () => {
    it('should display "Coming Soon" as main heading', () => {
      renderComingSoon();
      expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    });

    it('should display construction message', () => {
      renderComingSoon();
      const message = screen.getByText(/is currently under construction/i);
      expect(message).toBeInTheDocument();
    });

    it('should display updates message', () => {
      renderComingSoon();
      expect(screen.getByText('Check back soon for updates!')).toBeInTheDocument();
    });

    it('should display "Back to Home" link text', () => {
      renderComingSoon();
      expect(screen.getByText('Back to Home')).toBeInTheDocument();
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      renderComingSoon();
      expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
    });

    it('should render with custom props without crashing', () => {
      renderComingSoon({ pageName: 'Custom Page' });
      expect(screen.getByText(/custom page is currently under construction/i)).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { unmount: unmount1 } = renderComingSoon({ pageName: 'Page 1' });
      expect(screen.getByText(/page 1 is currently under construction/i)).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = renderComingSoon({ pageName: 'Page 2' });
      expect(screen.getByText(/page 2 is currently under construction/i)).toBeInTheDocument();
      unmount2();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined pageName gracefully', () => {
      renderComingSoon({ pageName: undefined });
      expect(screen.getByText(/this page is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle null pageName gracefully', () => {
      renderComingSoon({ pageName: null });
      // Will use default since null is falsy
      expect(screen.getByText(/is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle whitespace-only pageName', () => {
      renderComingSoon({ pageName: '   ' });
      expect(screen.getByText(/is currently under construction/i)).toBeInTheDocument();
    });

    it('should handle pageName with numbers and letters', () => {
      renderComingSoon({ pageName: 'Version 2.0' });
      expect(screen.getByText(/version 2.0 is currently under construction/i)).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work within BrowserRouter', () => {
      renderComingSoon();
      const link = screen.getByRole('link', { name: /back to home/i });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('/');
    });

    it('should be a functional component', () => {
      const result = renderComingSoon();
      expect(result.container).toBeTruthy();
    });
  });
});
