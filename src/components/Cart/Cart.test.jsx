import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from './Cart';
import * as CartContext from '../../context/CartContext';
import '@testing-library/jest-dom';

// Helper function to render Cart with required providers
const renderCart = (cartContextValue) => {
  vi.spyOn(CartContext, 'useCart').mockReturnValue(cartContextValue);
  
  return render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
};

describe('Cart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty Cart', () => {
    it('should display empty cart message when cart is empty', () => {
      const emptyContext = {
        cartItems: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 0),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 0),
        addToCart: vi.fn(),
      };
      
      renderCart(emptyContext);
      
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
      expect(screen.getByText('Your cart is currently empty')).toBeInTheDocument();
      expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    });

    it('should have a link to shop page when cart is empty', () => {
      const emptyContext = {
        cartItems: [],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 0),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 0),
        addToCart: vi.fn(),
      };
      
      renderCart(emptyContext);
      
      const shopLink = screen.getByRole('link', { name: /continue shopping/i });
      expect(shopLink).toHaveAttribute('href', '/shop');
    });
  });

  describe('Cart with Items', () => {
    const mockItems = [
      {
        id: 1,
        name: 'Test Product 1',
        price: 29.99,
        quantity: 2,
        image: '/test-image-1.jpg',
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: 49.99,
        quantity: 1,
        image: '/test-image-2.jpg',
      },
    ];

    const cartContextWithItems = {
      cartItems: mockItems,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 109.97),
      clearCart: vi.fn(),
      getCartCount: vi.fn(() => 3),
      addToCart: vi.fn(),
    };

    it('should render cart items correctly', () => {
      renderCart(cartContextWithItems);
      
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('should display correct prices for each item', () => {
      renderCart(cartContextWithItems);
      
      expect(screen.getAllByText('$29.99').length).toBeGreaterThan(0);
      expect(screen.getAllByText('$49.99').length).toBeGreaterThan(0);
    });

    it('should display correct quantities', () => {
      renderCart(cartContextWithItems);
      
      const quantities = screen.getAllByText(/^[0-9]+$/).filter(el => 
        el.className.includes('quantity-display')
      );
      
      expect(quantities).toHaveLength(2);
    });

    it('should calculate and display correct item totals', () => {
      renderCart(cartContextWithItems);
      
      // Item 1: 29.99 * 2 = 59.98
      expect(screen.getAllByText('$59.98').length).toBeGreaterThan(0);
      // Item 2: 49.99 * 1 = 49.99
      expect(screen.getAllByText('$49.99').length).toBeGreaterThan(0);
    });

    it('should display cart header with clear cart button', () => {
      renderCart(cartContextWithItems);
      
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear cart/i })).toBeInTheDocument();
    });

    it('should call clearCart when clear cart button is clicked', () => {
      const mockContext = {
        cartItems: mockItems,
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 109.97),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 3),
        addToCart: vi.fn(),
      };
      
      renderCart(mockContext);
      
      const clearButton = screen.getByRole('button', { name: /clear cart/i });
      fireEvent.click(clearButton);
      
      expect(mockContext.clearCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Quantity Controls', () => {
    const singleItem = {
      id: 1,
      name: 'Test Product',
      price: 19.99,
      quantity: 3,
      image: '/test-image.jpg',
    };

    const contextWithItem = {
      cartItems: [singleItem],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 59.97),
      clearCart: vi.fn(),
      getCartCount: vi.fn(() => 3),
      addToCart: vi.fn(),
    };

    it('should call updateQuantity with increased quantity when plus button is clicked', () => {
      const mockContext = {
        cartItems: [singleItem],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 59.97),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 3),
        addToCart: vi.fn(),
      };
      
      renderCart(mockContext);
      
      const plusButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('svg')?.parentElement?.className?.includes('quantity-btn')
      );
      
      // Click the plus button (second quantity button)
      fireEvent.click(plusButtons[1]);
      
      expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 4);
    });

    it('should call updateQuantity with decreased quantity when minus button is clicked', () => {
      const mockContext = {
        cartItems: [singleItem],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 59.97),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 3),
        addToCart: vi.fn(),
      };
      
      renderCart(mockContext);
      
      const minusButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('svg')?.parentElement?.className?.includes('quantity-btn')
      );
      
      // Click the minus button (first quantity button)
      fireEvent.click(minusButtons[0]);
      
      expect(mockContext.updateQuantity).toHaveBeenCalledWith(1, 2);
    });

    it('should call removeFromCart when remove button is clicked', () => {
      const mockContext = {
        cartItems: [singleItem],
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        getCartTotal: vi.fn(() => 59.97),
        clearCart: vi.fn(),
        getCartCount: vi.fn(() => 3),
        addToCart: vi.fn(),
      };
      
      renderCart(mockContext);
      
      const removeButtons = screen.getAllByRole('button').filter(btn =>
        btn.className.includes('remove-btn')
      );
      
      fireEvent.click(removeButtons[0]);
      
      expect(mockContext.removeFromCart).toHaveBeenCalledWith(1);
    });
  });

  describe('Order Summary', () => {
    const mockItems = [
      {
        id: 1,
        name: 'Test Product',
        price: 50.00,
        quantity: 2,
        image: '/test-image.jpg',
      },
    ];

    const contextWithTotal = {
      cartItems: mockItems,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 100.00),
      clearCart: vi.fn(),
      getCartCount: vi.fn(() => 2),
      addToCart: vi.fn(),
    };

    it('should display order summary section', () => {
      renderCart(contextWithTotal);
      
      expect(screen.getByText('Order Summary')).toBeInTheDocument();
    });

    it('should display subtotal correctly', () => {
      renderCart(contextWithTotal);
      
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getAllByText('$100.00').length).toBeGreaterThan(0);
    });

    it('should display free shipping', () => {
      renderCart(contextWithTotal);
      
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('should display total amount', () => {
      renderCart(contextWithTotal);
      
      const totalElements = screen.getAllByText('Total');
      expect(totalElements.length).toBeGreaterThan(0);
    });

    it('should have checkout button linking to checkout page', () => {
      renderCart(contextWithTotal);
      
      const checkoutLink = screen.getByRole('link', { name: /proceed to checkout/i });
      expect(checkoutLink).toHaveAttribute('href', '/checkout');
    });

    it('should have continue shopping link', () => {
      renderCart(contextWithTotal);
      
      const shopLink = screen.getByRole('link', { name: /continue shopping/i });
      expect(shopLink).toHaveAttribute('href', '/shop');
    });
  });

  describe('Accordion Functionality', () => {
    const mockItem = {
      id: 1,
      name: 'Test Product',
      price: 20.00,
      quantity: 1,
      image: '/test-image.jpg',
    };

    const contextWithItem = {
      cartItems: [mockItem],
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 20.00),
      clearCart: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    it('should display order information section', () => {
      renderCart(contextWithItem);
      
      expect(screen.getByText('Order Information')).toBeInTheDocument();
    });

    it('should display all accordion headers', () => {
      renderCart(contextWithItem);
      
      expect(screen.getByText('Return Policy')).toBeInTheDocument();
      expect(screen.getByText('Shipping Options')).toBeInTheDocument();
      expect(screen.getByText('Shipping Options 2')).toBeInTheDocument();
    });

    it('should toggle accordion content when header is clicked', () => {
      renderCart(contextWithItem);
      
      const returnPolicyButton = screen.getByRole('button', { name: /return policy/i });
      
      // Initially, content should not be visible
      expect(screen.queryByText(/30-day return policy/i)).not.toBeInTheDocument();
      
      // Click to open
      fireEvent.click(returnPolicyButton);
      
      // Content should now be visible
      expect(screen.getByText(/30-day return policy/i)).toBeInTheDocument();
      
      // Click again to close
      fireEvent.click(returnPolicyButton);
      
      // Content should be hidden again
      expect(screen.queryByText(/30-day return policy/i)).not.toBeInTheDocument();
    });

    it('should display return policy content when opened', () => {
      renderCart(contextWithItem);
      
      const returnPolicyButton = screen.getByRole('button', { name: /return policy/i });
      fireEvent.click(returnPolicyButton);
      
      expect(screen.getByText(/We offer a 30-day return policy/i)).toBeInTheDocument();
      expect(screen.getByText(/Products must be unused/i)).toBeInTheDocument();
    });

    it('should display shipping options content when opened', () => {
      renderCart(contextWithItem);
      
      const shippingButton = screen.getAllByRole('button').find(btn => 
        btn.textContent.includes('Shipping Options') && !btn.textContent.includes('2')
      );
      
      fireEvent.click(shippingButton);
      
      expect(screen.getByText(/Standard Shipping/i)).toBeInTheDocument();
      expect(screen.getByText(/Express Shipping/i)).toBeInTheDocument();
      expect(screen.getByText(/Next Day Delivery/i)).toBeInTheDocument();
    });

    it('should close one accordion when another is opened', () => {
      renderCart(contextWithItem);
      
      const returnPolicyButton = screen.getByRole('button', { name: /return policy/i });
      const shippingButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent.includes('Shipping Options')
      );
      
      // Open return policy
      fireEvent.click(returnPolicyButton);
      expect(screen.getByText(/30-day return policy/i)).toBeInTheDocument();
      
      // Open shipping options
      fireEvent.click(shippingButtons[0]);
      
      // Return policy should be closed
      expect(screen.queryByText(/30-day return policy/i)).not.toBeInTheDocument();
      // Shipping options should be open
      expect(screen.getByText(/Standard Shipping/i)).toBeInTheDocument();
    });
  });

  describe('Multiple Items Display', () => {
    const multipleItems = [
      { id: 1, name: 'Item 1', price: 10.00, quantity: 1, image: '/img1.jpg' },
      { id: 2, name: 'Item 2', price: 20.00, quantity: 2, image: '/img2.jpg' },
      { id: 3, name: 'Item 3', price: 30.00, quantity: 3, image: '/img3.jpg' },
    ];

    const contextWithMultiple = {
      cartItems: multipleItems,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartTotal: vi.fn(() => 130.00),
      clearCart: vi.fn(),
      getCartCount: vi.fn(() => 6),
      addToCart: vi.fn(),
    };

    it('should render all cart items', () => {
      renderCart(contextWithMultiple);
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render correct number of remove buttons', () => {
      renderCart(contextWithMultiple);
      
      const removeButtons = screen.getAllByRole('button').filter(btn =>
        btn.className.includes('remove-btn')
      );
      
      expect(removeButtons).toHaveLength(3);
    });
  });
});
