import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import * as CartContext from '../../context/CartContext';
import ProductDetails from './ProductDetails.jsx';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock products data
vi.mock('../../data/products.json', () => ({
  default: {
    products: [
      {
        id: 1,
        name: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        image: 'https://example.com/product1.jpg',
        images: [
          'https://example.com/product1-1.jpg',
          'https://example.com/product1-2.jpg',
          'https://example.com/product1-3.jpg',
        ],
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: 149.99,
        category: 'electronics',
        image: 'https://example.com/product2.jpg',
        images: ['https://example.com/product2-1.jpg'],
      },
      {
        id: 3,
        name: 'Test Product 3',
        price: 79.99,
        category: 'fashion',
        image: 'https://example.com/product3.jpg',
        images: ['https://example.com/product3-1.jpg'],
      },
    ],
  },
}));

describe('ProductDetails Component', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(CartContext, 'useCart').mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  const renderWithRouter = (productId = '1') => {
    return render(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Product Not Found', () => {
    it('should display product not found message for invalid ID', () => {
      render(
        <MemoryRouter initialEntries={['/product/999']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Product Not Found')).toBeInTheDocument();
    });

    it('should display not found description', () => {
      render(
        <MemoryRouter initialEntries={['/product/999']}>
          <ProductDetails />
        </MemoryRouter>
      );

      expect(screen.getByText("The product you're looking for doesn't exist.")).toBeInTheDocument();
    });

    it('should render Back to Shop link when product not found', () => {
      render(
        <MemoryRouter initialEntries={['/product/999']}>
          <ProductDetails />
        </MemoryRouter>
      );

      const link = screen.getByText('Back to Shop');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/shop');
    });

    it('should have product-not-found class', () => {
      render(
        <MemoryRouter initialEntries={['/product/999']}>
          <ProductDetails />
        </MemoryRouter>
      );

      const container = document.querySelector('.product-not-found');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Product Display', () => {
    it('should display product name', () => {
      renderWithRouter('1');
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    it('should display product price', () => {
      renderWithRouter('1');
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('should display category badge', () => {
      renderWithRouter('1');
      expect(screen.getByText('electronics')).toBeInTheDocument();
    });

    it('should have product-detail-name class', () => {
      renderWithRouter('1');
      const name = document.querySelector('.product-detail-name');
      expect(name).toHaveTextContent('Test Product 1');
    });

    it('should have product-detail-price class', () => {
      renderWithRouter('1');
      const price = document.querySelector('.product-detail-price');
      expect(price).toHaveTextContent('$99.99');
    });

    it('should display category with badge class', () => {
      renderWithRouter('1');
      const badge = document.querySelector('.product-category-badge');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Back Button', () => {
    it('should render back button', () => {
      renderWithRouter('1');
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('should call navigate(-1) when back button clicked', () => {
      renderWithRouter('1');
      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should have back-button class', () => {
      renderWithRouter('1');
      const button = document.querySelector('.back-button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Product Images', () => {
    it('should render image grid', () => {
      renderWithRouter('1');
      const grid = document.querySelector('.image-grid');
      expect(grid).toBeInTheDocument();
    });

    it('should display all product images', () => {
      renderWithRouter('1');
      const images = document.querySelectorAll('.image-grid-item');
      expect(images).toHaveLength(3);
    });

    it('should have correct alt text for images', () => {
      renderWithRouter('1');
      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveAttribute('alt', 'Test Product 1 1');
      expect(images[1]).toHaveAttribute('alt', 'Test Product 1 2');
      expect(images[2]).toHaveAttribute('alt', 'Test Product 1 3');
    });

    it('should open lightbox when image clicked', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const lightbox = document.querySelector('.lightbox-overlay');
      expect(lightbox).toBeInTheDocument();
    });
  });

  describe('Product Description', () => {
    it('should render product description section', () => {
      renderWithRouter('1');
      expect(screen.getByText('Product Description')).toBeInTheDocument();
    });

    it('should display description text', () => {
      renderWithRouter('1');
      expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
    });

    it('should display feature list', () => {
      renderWithRouter('1');
      expect(screen.getByText('High-quality materials')).toBeInTheDocument();
      expect(screen.getByText('Durable construction')).toBeInTheDocument();
      expect(screen.getByText('Modern design')).toBeInTheDocument();
      expect(screen.getByText('Easy to use')).toBeInTheDocument();
    });

    it('should have product-description class', () => {
      renderWithRouter('1');
      const description = document.querySelector('.product-description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Quantity Controls', () => {
    it('should display initial quantity as 1', () => {
      renderWithRouter('1');
      const quantity = document.querySelector('.qty-display');
      expect(quantity).toHaveTextContent('1');
    });

    it('should increment quantity when plus button clicked', () => {
      renderWithRouter('1');
      const plusButton = document.querySelectorAll('.qty-btn')[1];
      const quantity = document.querySelector('.qty-display');
      
      fireEvent.click(plusButton);
      expect(quantity).toHaveTextContent('2');
    });

    it('should decrement quantity when minus button clicked', () => {
      renderWithRouter('1');
      const plusButton = document.querySelectorAll('.qty-btn')[1];
      const minusButton = document.querySelectorAll('.qty-btn')[0];
      const quantity = document.querySelector('.qty-display');
      
      fireEvent.click(plusButton);
      fireEvent.click(plusButton);
      expect(quantity).toHaveTextContent('3');
      
      fireEvent.click(minusButton);
      expect(quantity).toHaveTextContent('2');
    });

    it('should not decrement below 1', () => {
      renderWithRouter('1');
      const minusButton = document.querySelectorAll('.qty-btn')[0];
      const quantity = document.querySelector('.qty-display');
      
      expect(quantity).toHaveTextContent('1');
      fireEvent.click(minusButton);
      expect(quantity).toHaveTextContent('1');
    });

    it('should have quantity-controls-detail class', () => {
      renderWithRouter('1');
      const controls = document.querySelector('.quantity-controls-detail');
      expect(controls).toBeInTheDocument();
    });

    it('should display Quantity label', () => {
      renderWithRouter('1');
      expect(screen.getByText('Quantity:')).toBeInTheDocument();
    });
  });

  describe('Add to Cart', () => {
    it('should render Add to Cart button', () => {
      renderWithRouter('1');
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    it('should call addToCart when button clicked', () => {
      renderWithRouter('1');
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      
      expect(mockAddToCart).toHaveBeenCalled();
    });

    it('should add multiple items based on quantity', () => {
      renderWithRouter('1');
      const plusButton = document.querySelectorAll('.qty-btn')[1];
      const addButton = screen.getByText('Add to Cart');
      
      fireEvent.click(plusButton);
      fireEvent.click(plusButton);
      fireEvent.click(addButton);
      
      expect(mockAddToCart).toHaveBeenCalledTimes(3);
    });

    it('should show "Added to Cart" message after adding', async () => {
      renderWithRouter('1');
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByText('Added to Cart')).toBeInTheDocument();
      });
    });

    it('should apply "added" class when item added', async () => {
      renderWithRouter('1');
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(addButton).toHaveClass('added');
      });
    });

    it('should revert to "Add to Cart" after timeout', async () => {
      renderWithRouter('1');
      const addButton = screen.getByText('Add to Cart');
      
      fireEvent.click(addButton);
      
      // Wait for the "Added to Cart" text to appear
      expect(await screen.findByText('Added to Cart')).toBeInTheDocument();
      
      // Wait for the timeout (2000ms) to revert back
      await waitFor(() => {
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Product Features', () => {
    it('should display Free Shipping feature', () => {
      renderWithRouter('1');
      expect(screen.getByText('Free Shipping')).toBeInTheDocument();
      expect(screen.getByText('On orders over $50')).toBeInTheDocument();
    });

    it('should display 30-Day Returns feature', () => {
      renderWithRouter('1');
      expect(screen.getByText('30-Day Returns')).toBeInTheDocument();
      expect(screen.getByText('Hassle-free returns')).toBeInTheDocument();
    });

    it('should display Secure Checkout feature', () => {
      renderWithRouter('1');
      expect(screen.getByText('Secure Checkout')).toBeInTheDocument();
      expect(screen.getByText('Safe & encrypted')).toBeInTheDocument();
    });

    it('should have product-features class', () => {
      renderWithRouter('1');
      const features = document.querySelector('.product-features');
      expect(features).toBeInTheDocument();
    });

    it('should have feature-item classes', () => {
      renderWithRouter('1');
      const items = document.querySelectorAll('.feature-item');
      expect(items).toHaveLength(3);
    });
  });

  describe('Related Products', () => {
    it('should display related products heading', () => {
      renderWithRouter('1');
      expect(screen.getByText('Related Products')).toBeInTheDocument();
    });

    it('should display related products from same category', () => {
      renderWithRouter('1');
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('should not display products from different categories', () => {
      renderWithRouter('1');
      expect(screen.queryByText('Test Product 3')).not.toBeInTheDocument();
    });

    it('should not display current product in related products', () => {
      renderWithRouter('1');
      const relatedSection = document.querySelector('.related-products-section');
      const currentProduct = relatedSection?.querySelector('h3:contains("Test Product 1")');
      expect(currentProduct).not.toBeInTheDocument();
    });

    it('should have related-products-grid class', () => {
      renderWithRouter('1');
      const grid = document.querySelector('.related-products-grid');
      expect(grid).toBeInTheDocument();
    });

    it('should link related products to detail pages', () => {
      renderWithRouter('1');
      const relatedLinks = document.querySelectorAll('.related-product-card');
      expect(relatedLinks.length).toBeGreaterThan(0);
    });

    it('should display related product prices', () => {
      renderWithRouter('1');
      expect(screen.getByText('$149.99')).toBeInTheDocument();
    });
  });

  describe('Lightbox Functionality', () => {
    it('should not display lightbox initially', () => {
      renderWithRouter('1');
      const lightbox = document.querySelector('.lightbox-overlay');
      expect(lightbox).not.toBeInTheDocument();
    });

    it('should open lightbox when image clicked', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const lightbox = document.querySelector('.lightbox-overlay');
      expect(lightbox).toBeInTheDocument();
    });

    it('should close lightbox when close button clicked', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const closeButton = document.querySelector('.lightbox-close');
      fireEvent.click(closeButton);
      
      const lightbox = document.querySelector('.lightbox-overlay');
      expect(lightbox).not.toBeInTheDocument();
    });

    it('should close lightbox when overlay clicked', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const overlay = document.querySelector('.lightbox-overlay');
      fireEvent.click(overlay);
      
      const lightboxAfter = document.querySelector('.lightbox-overlay');
      expect(lightboxAfter).not.toBeInTheDocument();
    });

    it('should navigate to next image', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const lightboxImage = document.querySelector('.lightbox-image');
      const initialSrc = lightboxImage?.getAttribute('src');
      
      const nextButton = document.querySelector('.lightbox-next');
      fireEvent.click(nextButton);
      
      const newSrc = document.querySelector('.lightbox-image')?.getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);
    });

    it('should navigate to previous image', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[1];
      fireEvent.click(firstImage);
      
      const prevButton = document.querySelector('.lightbox-prev');
      fireEvent.click(prevButton);
      
      const lightboxImage = document.querySelector('.lightbox-image');
      expect(lightboxImage).toBeInTheDocument();
    });

    it('should display lightbox counter', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const counter = document.querySelector('.lightbox-counter');
      expect(counter).toHaveTextContent('1 / 3');
    });

    it('should wrap to first image from last', () => {
      renderWithRouter('1');
      const lastImage = document.querySelectorAll('.image-grid-item')[2];
      fireEvent.click(lastImage);
      
      const nextButton = document.querySelector('.lightbox-next');
      fireEvent.click(nextButton);
      
      const counter = document.querySelector('.lightbox-counter');
      expect(counter).toHaveTextContent('1 / 3');
    });

    it('should wrap to last image from first', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const prevButton = document.querySelector('.lightbox-prev');
      fireEvent.click(prevButton);
      
      const counter = document.querySelector('.lightbox-counter');
      expect(counter).toHaveTextContent('3 / 3');
    });

    it('should prevent event propagation on lightbox content click', () => {
      renderWithRouter('1');
      const firstImage = document.querySelectorAll('.image-grid-item')[0];
      fireEvent.click(firstImage);
      
      const lightboxContent = document.querySelector('.lightbox-content');
      fireEvent.click(lightboxContent);
      
      const lightbox = document.querySelector('.lightbox-overlay');
      expect(lightbox).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should have product-details-container class', () => {
      renderWithRouter('1');
      const container = document.querySelector('.product-details-container');
      expect(container).toBeInTheDocument();
    });

    it('should have product-details-content class', () => {
      renderWithRouter('1');
      const content = document.querySelector('.product-details-content');
      expect(content).toBeInTheDocument();
    });

    it('should have product-image-section class', () => {
      renderWithRouter('1');
      const section = document.querySelector('.product-image-section');
      expect(section).toBeInTheDocument();
    });

    it('should have product-info-section class', () => {
      renderWithRouter('1');
      const section = document.querySelector('.product-info-section');
      expect(section).toBeInTheDocument();
    });

    it('should have product-quantity-section class', () => {
      renderWithRouter('1');
      const section = document.querySelector('.product-quantity-section');
      expect(section).toBeInTheDocument();
    });

    it('should have add-to-cart-detail-btn class', () => {
      renderWithRouter('1');
      const button = document.querySelector('.add-to-cart-detail-btn');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render product name as h1', () => {
      renderWithRouter('1');
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Test Product 1');
    });

    it('should have alt text for all images', () => {
      renderWithRouter('1');
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('should have button elements for controls', () => {
      renderWithRouter('1');
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have label for quantity', () => {
      renderWithRouter('1');
      expect(screen.getByText('Quantity:')).toBeInTheDocument();
    });
  });

  describe('Context Integration', () => {
    it('should use CartContext useCart hook', () => {
      renderWithRouter('1');
      expect(CartContext.useCart).toHaveBeenCalled();
    });

    it('should pass product to addToCart', () => {
      renderWithRouter('1');
      const addButton = screen.getByText('Add to Cart');
      fireEvent.click(addButton);
      
      expect(mockAddToCart).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          name: 'Test Product 1',
          price: 99.99,
        })
      );
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => renderWithRouter('1')).not.toThrow();
    });

    it('should render product found page', () => {
      renderWithRouter('1');
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('should render product not found page for invalid ID', () => {
      render(
        <MemoryRouter initialEntries={['/product/999']}>
          <ProductDetails />
        </MemoryRouter>
      );
      expect(screen.getByText('Product Not Found')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle product with single image', () => {
      renderWithRouter('2');
      const images = document.querySelectorAll('.image-grid-item');
      expect(images).toHaveLength(1);
    });

    it('should handle quantity increment multiple times', () => {
      renderWithRouter('1');
      const plusButton = document.querySelectorAll('.qty-btn')[1];
      const quantity = document.querySelector('.qty-display');
      
      for (let i = 0; i < 10; i++) {
        fireEvent.click(plusButton);
      }
      
      expect(quantity).toHaveTextContent('11');
    });

    it('should format price with two decimal places', () => {
      renderWithRouter('1');
      const price = document.querySelector('.product-detail-price');
      expect(price?.textContent).toMatch(/\$\d+\.\d{2}/);
    });

    it('should handle no related products scenario', () => {
      renderWithRouter('3');
      const relatedSection = document.querySelector('.related-products-section');
      expect(relatedSection).not.toBeInTheDocument();
    });
  });
});
