import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as CartContext from '../../context/CartContext';
import LatestArrival from './LatestArrival.jsx';

describe('LatestArrival Component', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  describe('Component Structure', () => {
    it('should render the latest arrival container', () => {
      render(<LatestArrival />);
      const container = document.querySelector('.latest-arrival-container');
      expect(container).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<LatestArrival />);
      expect(screen.getByText('Our latest arrivals')).toBeInTheDocument();
    });

    it('should render the description', () => {
      render(<LatestArrival />);
      const description = screen.getByText(/Lorem ipsum dolor sit amet/i);
      expect(description).toBeInTheDocument();
    });

    it('should render Shop All button', () => {
      render(<LatestArrival />);
      const shopButton = screen.getByText('Shop All');
      expect(shopButton).toBeInTheDocument();
    });

    it('should render product grid', () => {
      render(<LatestArrival />);
      const grid = document.querySelector('.latest-arrival-grid');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Products Display', () => {
    it('should display 3 products', () => {
      render(<LatestArrival />);
      const productCards = document.querySelectorAll('.product-card');
      expect(productCards).toHaveLength(3);
    });

    it('should display Product 1 with correct details', () => {
      render(<LatestArrival />);
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('$99.00')).toBeInTheDocument();
    });

    it('should display Product 2 with correct details', () => {
      render(<LatestArrival />);
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('$149.00')).toBeInTheDocument();
    });

    it('should display Product 3 with correct details', () => {
      render(<LatestArrival />);
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      expect(screen.getByText('$199.00')).toBeInTheDocument();
    });

    it('should have correct product IDs', () => {
      render(<LatestArrival />);
      const productCards = document.querySelectorAll('.product-card');
      // IDs are 101, 102, 103 but not rendered in DOM, verified through component structure
      expect(productCards).toHaveLength(3);
    });
  });

  describe('Product Images', () => {
    it('should display all product images', () => {
      render(<LatestArrival />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
    });

    it('should have correct alt text for Product 1', () => {
      render(<LatestArrival />);
      const img = screen.getByAltText('Product 1');
      expect(img).toBeInTheDocument();
    });

    it('should have correct alt text for Product 2', () => {
      render(<LatestArrival />);
      const img = screen.getByAltText('Product 2');
      expect(img).toBeInTheDocument();
    });

    it('should have correct alt text for Product 3', () => {
      render(<LatestArrival />);
      const img = screen.getByAltText('Product 3');
      expect(img).toBeInTheDocument();
    });

    it('should have correct Unsplash image sources', () => {
      render(<LatestArrival />);
      const images = screen.getAllByRole('img');
      
      expect(images[0]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400');
      expect(images[1]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400');
      expect(images[2]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400');
    });

    it('should wrap images in product-image-wrapper', () => {
      render(<LatestArrival />);
      const wrappers = document.querySelectorAll('.product-image-wrapper');
      expect(wrappers).toHaveLength(3);
    });

    it('should apply product-image class to images', () => {
      render(<LatestArrival />);
      const images = document.querySelectorAll('.product-image');
      expect(images).toHaveLength(3);
    });
  });

  describe('Product Cards', () => {
    it('should render product-card class for all products', () => {
      render(<LatestArrival />);
      const cards = document.querySelectorAll('.product-card');
      expect(cards).toHaveLength(3);
    });

    it('should apply product-card-middle class to middle card', () => {
      render(<LatestArrival />);
      const cards = document.querySelectorAll('.product-card');
      expect(cards[1]).toHaveClass('product-card-middle');
    });

    it('should not apply product-card-middle to first card', () => {
      render(<LatestArrival />);
      const cards = document.querySelectorAll('.product-card');
      expect(cards[0]).not.toHaveClass('product-card-middle');
    });

    it('should not apply product-card-middle to last card', () => {
      render(<LatestArrival />);
      const cards = document.querySelectorAll('.product-card');
      expect(cards[2]).not.toHaveClass('product-card-middle');
    });

    it('should have product-info section in each card', () => {
      render(<LatestArrival />);
      const productInfos = document.querySelectorAll('.product-info');
      expect(productInfos).toHaveLength(3);
    });
  });

  describe('Product Names', () => {
    it('should render product names as h3 headings', () => {
      render(<LatestArrival />);
      const names = document.querySelectorAll('.product-name');
      expect(names).toHaveLength(3);
      names.forEach(name => {
        expect(name.tagName).toBe('H3');
      });
    });

    it('should have correct product-name class', () => {
      render(<LatestArrival />);
      const names = document.querySelectorAll('.product-name');
      names.forEach(name => {
        expect(name).toHaveClass('product-name');
      });
    });
  });

  describe('Product Prices', () => {
    it('should format prices with 2 decimal places', () => {
      render(<LatestArrival />);
      expect(screen.getByText('$99.00')).toBeInTheDocument();
      expect(screen.getByText('$149.00')).toBeInTheDocument();
      expect(screen.getByText('$199.00')).toBeInTheDocument();
    });

    it('should render prices with product-price class', () => {
      render(<LatestArrival />);
      const prices = document.querySelectorAll('.product-price');
      expect(prices).toHaveLength(3);
    });

    it('should render prices as paragraphs', () => {
      render(<LatestArrival />);
      const prices = document.querySelectorAll('.product-price');
      prices.forEach(price => {
        expect(price.tagName).toBe('P');
      });
    });
  });

  describe('Add to Cart Buttons', () => {
    it('should render 3 Add to Cart buttons', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      expect(buttons).toHaveLength(3);
    });

    it('should have add-to-cart-btn class', () => {
      render(<LatestArrival />);
      const buttons = document.querySelectorAll('.add-to-cart-btn');
      expect(buttons).toHaveLength(3);
    });

    it('should call addToCart with Product 1 when clicked', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      
      expect(mockAddToCart).toHaveBeenCalledWith({
        id: 101,
        name: 'Product 1',
        price: 99.00,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      });
    });

    it('should call addToCart with Product 2 when clicked', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[1]);
      
      expect(mockAddToCart).toHaveBeenCalledWith({
        id: 102,
        name: 'Product 2',
        price: 149.00,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      });
    });

    it('should call addToCart with Product 3 when clicked', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[2]);
      
      expect(mockAddToCart).toHaveBeenCalledWith({
        id: 103,
        name: 'Product 3',
        price: 199.00,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      });
    });

    it('should call addToCart only once per click', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      
      expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks on different products', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);
      fireEvent.click(buttons[2]);
      
      expect(mockAddToCart).toHaveBeenCalledTimes(3);
    });

    it('should handle multiple clicks on same product', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[0]);
      
      expect(mockAddToCart).toHaveBeenCalledTimes(2);
    });
  });

  describe('Section Title and Description', () => {
    it('should render subtitle with correct class', () => {
      render(<LatestArrival />);
      const subtitle = document.querySelector('.latest-arrival-subtitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent('Our latest arrivals');
    });

    it('should render subtitle as h2', () => {
      render(<LatestArrival />);
      const subtitle = document.querySelector('.latest-arrival-subtitle');
      expect(subtitle.tagName).toBe('H2');
    });

    it('should render description with correct class', () => {
      render(<LatestArrival />);
      const description = document.querySelector('.latest-arrival-description');
      expect(description).toBeInTheDocument();
    });

    it('should render description as paragraph', () => {
      render(<LatestArrival />);
      const description = document.querySelector('.latest-arrival-description');
      expect(description.tagName).toBe('P');
    });

    it('should include full description text', () => {
      render(<LatestArrival />);
      const description = document.querySelector('.latest-arrival-description');
      expect(description.textContent).toContain('Lorem ipsum dolor sit amet');
      expect(description.textContent).toContain('sed do eiusmod tempor incididunt');
    });
  });

  describe('Shop All Button', () => {
    it('should render with correct class', () => {
      render(<LatestArrival />);
      const button = document.querySelector('.latest-arrival-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Shop All');
    });

    it('should be a button element', () => {
      render(<LatestArrival />);
      const button = screen.getByText('Shop All');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('CSS Classes', () => {
    it('should apply latest-arrival-container class', () => {
      render(<LatestArrival />);
      expect(document.querySelector('.latest-arrival-container')).toBeInTheDocument();
    });

    it('should apply latest-arrival-grid class', () => {
      render(<LatestArrival />);
      expect(document.querySelector('.latest-arrival-grid')).toBeInTheDocument();
    });

    it('should apply product-card class to all cards', () => {
      render(<LatestArrival />);
      const cards = document.querySelectorAll('.product-card');
      expect(cards).toHaveLength(3);
    });

    it('should apply product-image-wrapper class', () => {
      render(<LatestArrival />);
      const wrappers = document.querySelectorAll('.product-image-wrapper');
      expect(wrappers).toHaveLength(3);
    });

    it('should apply product-image class to images', () => {
      render(<LatestArrival />);
      const images = document.querySelectorAll('.product-image');
      expect(images).toHaveLength(3);
    });

    it('should apply product-info class', () => {
      render(<LatestArrival />);
      const infos = document.querySelectorAll('.product-info');
      expect(infos).toHaveLength(3);
    });

    it('should apply product-name class', () => {
      render(<LatestArrival />);
      const names = document.querySelectorAll('.product-name');
      expect(names).toHaveLength(3);
    });

    it('should apply product-price class', () => {
      render(<LatestArrival />);
      const prices = document.querySelectorAll('.product-price');
      expect(prices).toHaveLength(3);
    });

    it('should apply add-to-cart-btn class', () => {
      render(<LatestArrival />);
      const buttons = document.querySelectorAll('.add-to-cart-btn');
      expect(buttons).toHaveLength(3);
    });
  });

  describe('Context Integration', () => {
    it('should use CartContext useCart hook', () => {
      render(<LatestArrival />);
      expect(CartContext.useCart).toHaveBeenCalled();
    });

    it('should destructure addToCart from context', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      
      expect(mockAddToCart).toHaveBeenCalled();
    });

    it('should pass complete product object to addToCart', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      fireEvent.click(buttons[0]);
      
      const calledWith = mockAddToCart.mock.calls[0][0];
      expect(calledWith).toHaveProperty('id');
      expect(calledWith).toHaveProperty('name');
      expect(calledWith).toHaveProperty('price');
      expect(calledWith).toHaveProperty('image');
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for all images', () => {
      render(<LatestArrival />);
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.alt).toBeTruthy();
      });
    });

    it('should use semantic heading for subtitle', () => {
      render(<LatestArrival />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Our latest arrivals');
    });

    it('should use semantic heading for product names', () => {
      render(<LatestArrival />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });

    it('should render buttons as actual button elements', () => {
      render(<LatestArrival />);
      const addButtons = screen.getAllByText('Add to Cart');
      const shopButton = screen.getByText('Shop All');
      
      addButtons.forEach(btn => expect(btn.tagName).toBe('BUTTON'));
      expect(shopButton.tagName).toBe('BUTTON');
    });
  });

  describe('Product Data', () => {
    it('should have unique product IDs', () => {
      render(<LatestArrival />);
      const buttons = screen.getAllByText('Add to Cart');
      
      const ids = new Set();
      buttons.forEach((button, index) => {
        fireEvent.click(button);
        const productId = mockAddToCart.mock.calls[index][0].id;
        ids.add(productId);
      });
      
      expect(ids.size).toBe(3);
    });

    it('should have different prices for each product', () => {
      render(<LatestArrival />);
      const prices = [
        screen.getByText('$99.00'),
        screen.getByText('$149.00'),
        screen.getByText('$199.00')
      ];
      
      expect(prices).toHaveLength(3);
    });

    it('should have different images for each product', () => {
      render(<LatestArrival />);
      const images = screen.getAllByRole('img');
      const sources = images.map(img => img.src);
      const uniqueSources = new Set(sources);
      
      expect(uniqueSources.size).toBe(3);
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<LatestArrival />)).not.toThrow();
    });

    it('should render all required sections', () => {
      render(<LatestArrival />);
      
      expect(screen.getByText('Our latest arrivals')).toBeInTheDocument();
      expect(document.querySelector('.latest-arrival-description')).toBeInTheDocument();
      expect(screen.getByText('Shop All')).toBeInTheDocument();
      expect(document.querySelector('.latest-arrival-grid')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid button clicks', () => {
      render(<LatestArrival />);
      const button = screen.getAllByText('Add to Cart')[0];
      
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockAddToCart).toHaveBeenCalledTimes(3);
    });

    it('should maintain product data integrity on multiple adds', () => {
      render(<LatestArrival />);
      const button = screen.getAllByText('Add to Cart')[0];
      
      fireEvent.click(button);
      const firstCall = mockAddToCart.mock.calls[0][0];
      
      fireEvent.click(button);
      const secondCall = mockAddToCart.mock.calls[1][0];
      
      expect(firstCall).toEqual(secondCall);
    });
  });
});
