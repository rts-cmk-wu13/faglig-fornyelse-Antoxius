import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categories from './Categories';
import '@testing-library/jest-dom';

// Helper function to render Categories with required providers
const renderCategories = () => {
  return render(
    <BrowserRouter>
      <Categories />
    </BrowserRouter>
  );
};

describe('Categories Component', () => {
  beforeEach(() => {
    renderCategories();
  });

  describe('Component Structure', () => {
    it('should render the categories container', () => {
      const container = document.querySelector('.categories-container');
      expect(container).toBeInTheDocument();
    });

    it('should render the categories title', () => {
      const title = screen.getByRole('heading', { name: /categories/i });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('categories-title');
    });

    it('should render the categories description', () => {
      const description = screen.getByText(/lorem ipsum dolor sit amet/i);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('categories-description');
    });

    it('should render the shop all button', () => {
      const shopButton = screen.getByRole('link', { name: /shop all/i });
      expect(shopButton).toBeInTheDocument();
      expect(shopButton).toHaveClass('shop-all-button');
    });

    it('should render the categories grid', () => {
      const grid = document.querySelector('.categories-grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Shop All Button', () => {
    it('should link to the shop page', () => {
      const shopButton = screen.getByRole('link', { name: /shop all/i });
      expect(shopButton).toHaveAttribute('href', '/shop');
    });

    it('should have the correct CSS class', () => {
      const shopButton = screen.getByRole('link', { name: /shop all/i });
      expect(shopButton).toHaveClass('shop-all-button');
    });
  });

  describe('Category Cards', () => {
    it('should render all three category cards', () => {
      const categoryCards = document.querySelectorAll('.category-card');
      expect(categoryCards).toHaveLength(3);
    });

    it('should render Electronics category', () => {
      const electronicsLink = screen.getByRole('link', { name: /electronics/i });
      expect(electronicsLink).toBeInTheDocument();
    });

    it('should render Fashion category', () => {
      const fashionLink = screen.getByRole('link', { name: /fashion/i });
      expect(fashionLink).toBeInTheDocument();
    });

    it('should render Home & Living category', () => {
      const homeLink = screen.getByRole('link', { name: /home & living/i });
      expect(homeLink).toBeInTheDocument();
    });

    it('should have correct links for each category', () => {
      const electronicsLink = screen.getByRole('link', { name: /electronics/i });
      const fashionLink = screen.getByRole('link', { name: /fashion/i });
      const homeLink = screen.getByRole('link', { name: /home & living/i });

      expect(electronicsLink).toHaveAttribute('href', '/shop?category=electronics');
      expect(fashionLink).toHaveAttribute('href', '/shop?category=fashion');
      expect(homeLink).toHaveAttribute('href', '/shop?category=home');
    });

    it('should render category cards with correct CSS class', () => {
      const categoryCards = document.querySelectorAll('.category-card');
      
      categoryCards.forEach(card => {
        expect(card).toHaveClass('category-card');
      });
    });
  });

  describe('Category Images', () => {
    it('should render all category images', () => {
      const images = document.querySelectorAll('.category-image');
      expect(images).toHaveLength(3);
    });

    it('should have correct alt text for Electronics image', () => {
      const electronicsImage = screen.getByAltText('Electronics');
      expect(electronicsImage).toBeInTheDocument();
      expect(electronicsImage).toHaveClass('category-image');
    });

    it('should have correct alt text for Fashion image', () => {
      const fashionImage = screen.getByAltText('Fashion');
      expect(fashionImage).toBeInTheDocument();
      expect(fashionImage).toHaveClass('category-image');
    });

    it('should have correct alt text for Home & Living image', () => {
      const homeImage = screen.getByAltText('Home & Living');
      expect(homeImage).toBeInTheDocument();
      expect(homeImage).toHaveClass('category-image');
    });

    it('should render images with correct sources', () => {
      const electronicsImage = screen.getByAltText('Electronics');
      const fashionImage = screen.getByAltText('Fashion');
      const homeImage = screen.getByAltText('Home & Living');

      expect(electronicsImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400');
      expect(fashionImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400');
      expect(homeImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400');
    });
  });

  describe('Category Overlays', () => {
    it('should render overlay elements for each category', () => {
      const overlays = document.querySelectorAll('.category-overlay');
      expect(overlays).toHaveLength(3);
    });

    it('should render category names inside overlays', () => {
      const categoryNames = document.querySelectorAll('.category-name');
      expect(categoryNames).toHaveLength(3);
    });

    it('should display correct category names', () => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Fashion')).toBeInTheDocument();
      expect(screen.getByText('Home & Living')).toBeInTheDocument();
    });

    it('should have correct heading level for category names', () => {
      const electronicsHeading = screen.getByRole('heading', { name: 'Electronics', level: 3 });
      const fashionHeading = screen.getByRole('heading', { name: 'Fashion', level: 3 });
      const homeHeading = screen.getByRole('heading', { name: 'Home & Living', level: 3 });

      expect(electronicsHeading).toBeInTheDocument();
      expect(fashionHeading).toBeInTheDocument();
      expect(homeHeading).toBeInTheDocument();
    });
  });

  describe('Data Structure', () => {
    it('should render categories in correct order', () => {
      const categoryNames = document.querySelectorAll('.category-name');
      
      expect(categoryNames[0]).toHaveTextContent('Electronics');
      expect(categoryNames[1]).toHaveTextContent('Fashion');
      expect(categoryNames[2]).toHaveTextContent('Home & Living');
    });

    it('should have unique keys for each category card', () => {
      const categoryCards = document.querySelectorAll('.category-card');
      const hrefs = Array.from(categoryCards).map(card => card.getAttribute('href'));
      
      // Check that all hrefs are unique
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(3);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible navigation links', () => {
      const links = screen.getAllByRole('link');
      
      // Should have 4 links total: Shop All + 3 categories
      expect(links).toHaveLength(4);
    });

    it('should have proper semantic HTML structure', () => {
      // Check for proper heading hierarchy
      const mainHeading = screen.getByRole('heading', { name: /categories/i, level: 2 });
      expect(mainHeading).toBeInTheDocument();

      // Check for category headings
      const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(categoryHeadings).toHaveLength(3);
    });

    it('should have descriptive alt text for all images', () => {
      const images = screen.getAllByRole('img');
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Content Validation', () => {
    it('should display the full description text', () => {
      const descriptionText = screen.getByText(/lorem ipsum dolor sit amet, consectetur adipiscing elit/i);
      expect(descriptionText).toBeInTheDocument();
    });

    it('should render description with line break', () => {
      const description = document.querySelector('.categories-description');
      expect(description?.innerHTML).toContain('<br>');
    });
  });

  describe('Component Integration', () => {
    it('should be a clickable NavLink for each category', () => {
      const categoryCards = document.querySelectorAll('.category-card');
      
      categoryCards.forEach(card => {
        expect(card.tagName.toLowerCase()).toBe('a');
      });
    });

    it('should render without crashing', () => {
      const container = document.querySelector('.categories-container');
      expect(container).toBeTruthy();
    });
  });
});
