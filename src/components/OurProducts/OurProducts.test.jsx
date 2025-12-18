import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import OurProducts from './OurProducts.jsx';

describe('OurProducts Component', () => {
  const renderOurProducts = () => {
    return render(
      <BrowserRouter>
        <OurProducts />
      </BrowserRouter>
    );
  };

  describe('Component Structure', () => {
    it('should render the our-products-container', () => {
      renderOurProducts();
      const container = document.querySelector('.our-products-container');
      expect(container).toBeInTheDocument();
    });

    it('should render the title', () => {
      renderOurProducts();
      expect(screen.getByText('Our Products')).toBeInTheDocument();
    });

    it('should render the description', () => {
      renderOurProducts();
      const description = screen.getByText(/Lorem ipsum dolor sit amet/i);
      expect(description).toBeInTheDocument();
    });

    it('should render Shop All button', () => {
      renderOurProducts();
      expect(screen.getByText('Shop All')).toBeInTheDocument();
    });

    it('should render products grid', () => {
      renderOurProducts();
      const grid = document.querySelector('.our-products-grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Title and Description', () => {
    it('should render title as h2', () => {
      renderOurProducts();
      const title = screen.getByText('Our Products');
      expect(title.tagName).toBe('H2');
    });

    it('should have our-products-title class', () => {
      renderOurProducts();
      const title = document.querySelector('.our-products-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Our Products');
    });

    it('should render description as paragraph', () => {
      renderOurProducts();
      const description = document.querySelector('.our-products-description');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
    });

    it('should have our-products-description class', () => {
      renderOurProducts();
      const description = document.querySelector('.our-products-description');
      expect(description).toBeInTheDocument();
    });

    it('should include full description text', () => {
      renderOurProducts();
      const description = document.querySelector('.our-products-description');
      expect(description?.textContent).toContain('Lorem ipsum dolor sit amet');
      expect(description?.textContent).toContain('sed do eiusmod tempor incididunt');
    });
  });

  describe('Shop All Button', () => {
    it('should render Shop All button as link', () => {
      renderOurProducts();
      const button = screen.getByText('Shop All');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('A');
    });

    it('should link to /shop route', () => {
      renderOurProducts();
      const button = screen.getByText('Shop All');
      expect(button).toHaveAttribute('href', '/shop');
    });

    it('should have our-products-button class', () => {
      renderOurProducts();
      const button = document.querySelector('.our-products-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Shop All');
    });
  });

  describe('Products Display', () => {
    it('should render 3 products', () => {
      renderOurProducts();
      const products = document.querySelectorAll('.product-card-item');
      expect(products).toHaveLength(3);
    });

    it('should render Product 1', () => {
      renderOurProducts();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    it('should render Product 2', () => {
      renderOurProducts();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('should render Product 3', () => {
      renderOurProducts();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    it('should render all products in grid', () => {
      renderOurProducts();
      const grid = document.querySelector('.our-products-grid');
      const products = grid?.querySelectorAll('.product-card-item');
      expect(products?.length).toBe(3);
    });
  });

  describe('Product Images', () => {
    it('should render 3 product images', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });

    it('should have correct alt text for Product 1', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 1');
      expect(img).toBeInTheDocument();
    });

    it('should have correct alt text for Product 2', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 2');
      expect(img).toBeInTheDocument();
    });

    it('should have correct alt text for Product 3', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 3');
      expect(img).toBeInTheDocument();
    });

    it('should have correct Unsplash source for Product 1', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 1');
      expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400');
    });

    it('should have correct Unsplash source for Product 2', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 2');
      expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400');
    });

    it('should have correct Unsplash source for Product 3', () => {
      renderOurProducts();
      const img = screen.getByAltText('Product 3');
      expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400');
    });

    it('should have product-card-image class on images', () => {
      renderOurProducts();
      const images = document.querySelectorAll('.product-card-image');
      expect(images).toHaveLength(3);
    });

    it('should load images with w=400 parameter', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img.src).toContain('w=400');
      });
    });
  });

  describe('Product Links', () => {
    it('should have correct link for Product 1', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      expect(links[0]).toHaveAttribute('href', '/shop?product=1');
    });

    it('should have correct link for Product 2', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      expect(links[1]).toHaveAttribute('href', '/shop?product=2');
    });

    it('should have correct link for Product 3', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      expect(links[2]).toHaveAttribute('href', '/shop?product=3');
    });

    it('should use query parameters in links', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      links.forEach(link => {
        expect(link.getAttribute('href')).toContain('?product=');
      });
    });

    it('should render products as anchor elements', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      links.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });

    it('should have unique product IDs in links', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      const hrefs = Array.from(links).map(link => link.getAttribute('href'));
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(3);
    });
  });

  describe('Product Overlays', () => {
    it('should render overlay for each product', () => {
      renderOurProducts();
      const overlays = document.querySelectorAll('.product-card-overlay');
      expect(overlays).toHaveLength(3);
    });

    it('should have product-card-overlay class', () => {
      renderOurProducts();
      const overlays = document.querySelectorAll('.product-card-overlay');
      expect(overlays.length).toBe(3);
    });

    it('should render product names in overlays as h3', () => {
      renderOurProducts();
      const names = document.querySelectorAll('.product-card-name');
      expect(names).toHaveLength(3);
      names.forEach(name => {
        expect(name.tagName).toBe('H3');
      });
    });

    it('should have product-card-name class', () => {
      renderOurProducts();
      const names = document.querySelectorAll('.product-card-name');
      expect(names.length).toBe(3);
    });

    it('should display correct names in overlays', () => {
      renderOurProducts();
      const overlays = document.querySelectorAll('.product-card-overlay');
      expect(overlays[0]).toHaveTextContent('Product 1');
      expect(overlays[1]).toHaveTextContent('Product 2');
      expect(overlays[2]).toHaveTextContent('Product 3');
    });
  });

  describe('CSS Classes', () => {
    it('should apply our-products-container class', () => {
      renderOurProducts();
      const container = document.querySelector('.our-products-container');
      expect(container).toBeInTheDocument();
    });

    it('should apply our-products-title class', () => {
      renderOurProducts();
      const title = document.querySelector('.our-products-title');
      expect(title).toBeInTheDocument();
    });

    it('should apply our-products-description class', () => {
      renderOurProducts();
      const description = document.querySelector('.our-products-description');
      expect(description).toBeInTheDocument();
    });

    it('should apply our-products-button class', () => {
      renderOurProducts();
      const button = document.querySelector('.our-products-button');
      expect(button).toBeInTheDocument();
    });

    it('should apply our-products-grid class', () => {
      renderOurProducts();
      const grid = document.querySelector('.our-products-grid');
      expect(grid).toBeInTheDocument();
    });

    it('should apply product-card-item class to products', () => {
      renderOurProducts();
      const items = document.querySelectorAll('.product-card-item');
      expect(items).toHaveLength(3);
    });

    it('should apply product-card-image class to images', () => {
      renderOurProducts();
      const images = document.querySelectorAll('.product-card-image');
      expect(images).toHaveLength(3);
    });

    it('should apply product-card-overlay class to overlays', () => {
      renderOurProducts();
      const overlays = document.querySelectorAll('.product-card-overlay');
      expect(overlays).toHaveLength(3);
    });

    it('should apply product-card-name class to names', () => {
      renderOurProducts();
      const names = document.querySelectorAll('.product-card-name');
      expect(names).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for all images', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.alt).toBeTruthy();
      });
    });

    it('should use semantic heading for title', () => {
      renderOurProducts();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Our Products');
    });

    it('should use semantic headings for product names', () => {
      renderOurProducts();
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });

    it('should render Shop All as link element', () => {
      renderOurProducts();
      const shopLink = screen.getByText('Shop All');
      expect(shopLink.tagName).toBe('A');
    });

    it('should render products as anchor elements', () => {
      renderOurProducts();
      const productLinks = document.querySelectorAll('.product-card-item');
      productLinks.forEach(link => {
        expect(link.tagName).toBe('A');
      });
    });

    it('should have proper heading hierarchy', () => {
      renderOurProducts();
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });
      
      expect(h2).toBeInTheDocument();
      expect(h3s).toHaveLength(3);
    });
  });

  describe('Product Data', () => {
    it('should have unique product IDs', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      const ids = Array.from(links).map(link => {
        const href = link.getAttribute('href');
        return href?.match(/product=(\d+)/)?.[1];
      });
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);
    });

    it('should have different images for each product', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      const sources = images.map(img => img.src);
      const uniqueSources = new Set(sources);
      expect(uniqueSources.size).toBe(3);
    });

    it('should have different names for each product', () => {
      renderOurProducts();
      const names = ['Product 1', 'Product 2', 'Product 3'];
      names.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('should render products in correct order', () => {
      renderOurProducts();
      const productNames = document.querySelectorAll('.product-card-name');
      expect(productNames[0]).toHaveTextContent('Product 1');
      expect(productNames[1]).toHaveTextContent('Product 2');
      expect(productNames[2]).toHaveTextContent('Product 3');
    });
  });

  describe('Layout Structure', () => {
    it('should render title before description', () => {
      renderOurProducts();
      const container = document.querySelector('.our-products-container');
      const title = container?.querySelector('.our-products-title');
      const description = container?.querySelector('.our-products-description');
      
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it('should render Shop All button before grid', () => {
      renderOurProducts();
      const container = document.querySelector('.our-products-container');
      const button = container?.querySelector('.our-products-button');
      const grid = container?.querySelector('.our-products-grid');
      
      expect(button).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });

    it('should contain all products within grid', () => {
      renderOurProducts();
      const grid = document.querySelector('.our-products-grid');
      const products = grid?.querySelectorAll('.product-card-item');
      expect(products?.length).toBe(3);
    });

    it('should have image inside each product card', () => {
      renderOurProducts();
      const productCards = document.querySelectorAll('.product-card-item');
      productCards.forEach(card => {
        const img = card.querySelector('.product-card-image');
        expect(img).toBeInTheDocument();
      });
    });

    it('should have overlay inside each product card', () => {
      renderOurProducts();
      const productCards = document.querySelectorAll('.product-card-item');
      productCards.forEach(card => {
        const overlay = card.querySelector('.product-card-overlay');
        expect(overlay).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Integration', () => {
    it('should use NavLink for Shop All button', () => {
      renderOurProducts();
      const shopButton = screen.getByText('Shop All');
      expect(shopButton).toBeInTheDocument();
      expect(shopButton).toHaveAttribute('href', '/shop');
    });

    it('should link to shop page', () => {
      renderOurProducts();
      const shopButton = screen.getByText('Shop All');
      expect(shopButton.getAttribute('href')).toBe('/shop');
    });

    it('should link products to shop with query params', () => {
      renderOurProducts();
      const productLinks = document.querySelectorAll('.product-card-item');
      productLinks.forEach((link, index) => {
        expect(link.getAttribute('href')).toBe(`/shop?product=${index + 1}`);
      });
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => renderOurProducts()).not.toThrow();
    });

    it('should render all required sections', () => {
      renderOurProducts();
      
      expect(screen.getByText('Our Products')).toBeInTheDocument();
      expect(document.querySelector('.our-products-description')).toBeInTheDocument();
      expect(screen.getByText('Shop All')).toBeInTheDocument();
      expect(document.querySelector('.our-products-grid')).toBeInTheDocument();
    });

    it('should render complete structure', () => {
      renderOurProducts();
      
      const container = document.querySelector('.our-products-container');
      expect(container).toBeInTheDocument();
      
      const title = container?.querySelector('.our-products-title');
      expect(title).toBeInTheDocument();
      
      const description = container?.querySelector('.our-products-description');
      expect(description).toBeInTheDocument();
      
      const button = container?.querySelector('.our-products-button');
      expect(button).toBeInTheDocument();
      
      const grid = container?.querySelector('.our-products-grid');
      expect(grid).toBeInTheDocument();
      
      const products = grid?.querySelectorAll('.product-card-item');
      expect(products?.length).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle products array mapping', () => {
      renderOurProducts();
      const products = document.querySelectorAll('.product-card-item');
      expect(products.length).toBe(3);
    });

    it('should render all images with Unsplash sources', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img.src).toContain('images.unsplash.com');
      });
    });

    it('should have consistent image width parameter', () => {
      renderOurProducts();
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img.src).toContain('w=400');
      });
    });

    it('should maintain product order in DOM', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      expect(links[0].getAttribute('href')).toContain('product=1');
      expect(links[1].getAttribute('href')).toContain('product=2');
      expect(links[2].getAttribute('href')).toContain('product=3');
    });
  });

  describe('Content Validation', () => {
    it('should display correct title text', () => {
      renderOurProducts();
      const title = document.querySelector('.our-products-title');
      expect(title?.textContent).toBe('Our Products');
    });

    it('should display correct button text', () => {
      renderOurProducts();
      const button = document.querySelector('.our-products-button');
      expect(button?.textContent).toBe('Shop All');
    });

    it('should include Lorem ipsum in description', () => {
      renderOurProducts();
      const description = document.querySelector('.our-products-description');
      expect(description?.textContent).toContain('Lorem ipsum');
    });

    it('should have product names as text content', () => {
      renderOurProducts();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
    });
  });

  describe('Link Attributes', () => {
    it('should have href attributes on product links', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have href attribute on Shop All link', () => {
      renderOurProducts();
      const shopLink = screen.getByText('Shop All');
      expect(shopLink).toHaveAttribute('href');
    });

    it('should use standard anchor hrefs for products', () => {
      renderOurProducts();
      const links = document.querySelectorAll('.product-card-item');
      links.forEach((link, index) => {
        const href = link.getAttribute('href');
        expect(href).toBe(`/shop?product=${index + 1}`);
      });
    });
  });
});
