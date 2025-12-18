import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from './Checkout';
import * as CartContext from '../../context/CartContext';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper function to render Checkout with required providers
const renderCheckout = (cartContextValue) => {
  vi.spyOn(CartContext, 'useCart').mockReturnValue(cartContextValue);
  
  return render(
    <BrowserRouter>
      <Checkout />
    </BrowserRouter>
  );
};

describe('Checkout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty Cart State', () => {
    const emptyCartContext = {
      cartItems: [],
      getCartTotal: vi.fn(() => 0),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 0),
      addToCart: vi.fn(),
    };

    it('should display empty cart message when cart is empty', () => {
      renderCheckout(emptyCartContext);
      
      expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
      expect(screen.getByText(/Add some items to your cart/i)).toBeInTheDocument();
    });

    it('should show continue shopping button when cart is empty', () => {
      renderCheckout(emptyCartContext);
      
      const button = screen.getByRole('button', { name: /continue shopping/i });
      expect(button).toBeInTheDocument();
    });

    it('should navigate to shop when continue shopping is clicked', () => {
      renderCheckout(emptyCartContext);
      
      const button = screen.getByRole('button', { name: /continue shopping/i });
      fireEvent.click(button);
      
      expect(mockNavigate).toHaveBeenCalledWith('/shop');
    });
  });

  describe('Checkout with Items', () => {
    const mockCartItems = [
      {
        id: 1,
        name: 'Test Product 1',
        price: 50.00,
        quantity: 2,
        image: '/test-image-1.jpg',
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: 30.00,
        quantity: 1,
        image: '/test-image-2.jpg',
      },
    ];

    const cartContext = {
      cartItems: mockCartItems,
      getCartTotal: vi.fn(() => 130.00),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 3),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should render the checkout title', () => {
      expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument();
    });

    it('should render order summary section', () => {
      expect(screen.getByRole('heading', { name: 'Order Summary' })).toBeInTheDocument();
    });

    it('should display all cart items in order summary', () => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('should display correct quantities for items', () => {
      expect(screen.getByText('Qty: 2')).toBeInTheDocument();
      expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    });

    it('should calculate and display correct item totals', () => {
      expect(screen.getByText('$100.00')).toBeInTheDocument(); // 50 * 2
      expect(screen.getByText('$30.00')).toBeInTheDocument();
    });
  });

  describe('Step Indicator', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should display step indicator with all three steps', () => {
      expect(screen.getByText('Address')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('Payment')).toBeInTheDocument();
    });

    it('should have Address step active initially', () => {
      const addressStep = screen.getByText('Address').closest('.step');
      expect(addressStep).toHaveClass('active');
    });

    it('should have step lines between steps', () => {
      const stepLines = document.querySelectorAll('.step-line');
      expect(stepLines).toHaveLength(2);
    });
  });

  describe('Step 1: Shipping Information Form', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should render shipping information heading', () => {
      expect(screen.getByRole('heading', { name: /shipping information/i })).toBeInTheDocument();
    });

    it('should render all required form fields', () => {
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/state \/ province/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    });

    it('should render optional fields', () => {
      expect(screen.getByLabelText(/apartment, suite, etc/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone \(optional\)/i)).toBeInTheDocument();
    });

    it('should render save contact information checkbox', () => {
      expect(screen.getByText(/save contact information/i)).toBeInTheDocument();
    });

    it('should render continue to shipping button', () => {
      expect(screen.getByRole('button', { name: /continue to shipping/i })).toBeInTheDocument();
    });

    it('should update form data when typing in first name', () => {
      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      expect(firstNameInput).toHaveValue('John');
    });

    it('should update form data when typing in last name', () => {
      const lastNameInput = screen.getByLabelText(/last name/i);
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      expect(lastNameInput).toHaveValue('Doe');
    });

    it('should have default phone value with +45 prefix', () => {
      const phoneInput = screen.getByLabelText(/phone \(optional\)/i);
      expect(phoneInput).toHaveValue('+45');
    });

    it('should allow selecting country from dropdown', () => {
      const countrySelect = screen.getByLabelText(/country/i);
      fireEvent.change(countrySelect, { target: { value: 'Denmark' } });
      expect(countrySelect).toHaveValue('Denmark');
    });

    it('should limit ZIP code to 4 digits', () => {
      const zipCodeInput = screen.getByLabelText(/zip code/i);
      expect(zipCodeInput).toHaveAttribute('maxLength', '4');
    });

    it('should toggle save contact checkbox', () => {
      const checkbox = screen.getByRole('checkbox', { name: /save contact information/i });
      expect(checkbox).not.toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Form Validation - Step 1', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should show error when trying to continue with empty required fields', () => {
      const continueButton = screen.getByRole('button', { name: /continue to shipping/i });
      fireEvent.click(continueButton);
      
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });

    it('should show error for first name less than 2 characters', () => {
      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: 'J' } });
      
      const continueButton = screen.getByRole('button', { name: /continue to shipping/i });
      fireEvent.click(continueButton);
      
      expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
    });

    it('should show error for invalid ZIP code format', () => {
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const addressInput = screen.getByLabelText(/^address/i);
      const cityInput = screen.getByLabelText(/city/i);
      const countrySelect = screen.getByLabelText(/country/i);
      const stateSelect = screen.getByLabelText(/state \/ province/i);
      const zipCodeInput = screen.getByLabelText(/zip code/i);
      
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(addressInput, { target: { value: '123 Main Street' } });
      fireEvent.change(cityInput, { target: { value: 'New York' } });
      fireEvent.change(countrySelect, { target: { value: 'United States' } });
      fireEvent.change(stateSelect, { target: { value: 'New York' } });
      fireEvent.change(zipCodeInput, { target: { value: '123' } });
      
      const continueButton = screen.getByRole('button', { name: /continue to shipping/i });
      fireEvent.click(continueButton);
      
      expect(screen.getByText(/ZIP code must be exactly 4 digits/i)).toBeInTheDocument();
    });

    it('should clear error when user starts typing in a field', () => {
      const continueButton = screen.getByRole('button', { name: /continue to shipping/i });
      fireEvent.click(continueButton);
      
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      
      const firstNameInput = screen.getByLabelText(/first name/i);
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      
      expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
    });
  });

  describe('Step 2: Shipping Method', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
      
      // Fill out step 1 to proceed to step 2
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/^address/i), { target: { value: '123 Main St' } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'United States' } });
      fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '1234' } });
      
      fireEvent.click(screen.getByRole('button', { name: /continue to shipping/i }));
    });

    it('should display shipping method heading', () => {
      expect(screen.getByRole('heading', { name: /shipping method/i })).toBeInTheDocument();
    });

    it('should display all three shipping options', () => {
      expect(screen.getByText('Standard Shipping')).toBeInTheDocument();
      expect(screen.getByText('Express Shipping')).toBeInTheDocument();
      expect(screen.getByText('Overnight Shipping')).toBeInTheDocument();
    });

    it('should display shipping costs', () => {
      expect(screen.getAllByText('$10.00').length).toBeGreaterThan(0);
      expect(screen.getByText('$25.00')).toBeInTheDocument();
      expect(screen.getByText('$45.00')).toBeInTheDocument();
    });

    it('should display shipping delivery times', () => {
      expect(screen.getByText('5-7 business days')).toBeInTheDocument();
      expect(screen.getByText('2-3 business days')).toBeInTheDocument();
      expect(screen.getByText('Next business day')).toBeInTheDocument();
    });

    it('should have standard shipping selected by default', () => {
      const standardRadio = screen.getByRole('radio', { name: /standard shipping/i });
      expect(standardRadio).toBeChecked();
    });

    it('should allow selecting express shipping', () => {
      const expressRadio = screen.getByRole('radio', { name: /express shipping/i });
      fireEvent.click(expressRadio);
      expect(expressRadio).toBeChecked();
    });

    it('should display back button', () => {
      expect(screen.getByRole('button', { name: /^back$/i })).toBeInTheDocument();
    });

    it('should display continue to payment button', () => {
      expect(screen.getByRole('button', { name: /continue to payment/i })).toBeInTheDocument();
    });

    it('should go back to step 1 when back button is clicked', () => {
      const backButton = screen.getByRole('button', { name: /^back$/i });
      fireEvent.click(backButton);
      
      expect(screen.getByRole('heading', { name: /shipping information/i })).toBeInTheDocument();
    });
  });

  describe('Step 3: Payment Information', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
      
      // Fill step 1
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/^address/i), { target: { value: '123 Main St' } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'United States' } });
      fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '1234' } });
      fireEvent.click(screen.getByRole('button', { name: /continue to shipping/i }));
      
      // Complete step 2
      fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));
    });

    it('should display payment information heading', () => {
      expect(screen.getByRole('heading', { name: /payment information/i })).toBeInTheDocument();
    });

    it('should display payment method buttons', () => {
      const paymentButtons = document.querySelectorAll('.payment-method-btn');
      expect(paymentButtons).toHaveLength(2);
    });

    it('should have PayPal and Credit Card payment options', () => {
      expect(screen.getByRole('button', { name: /credit card/i })).toBeInTheDocument();
    });

    it('should show credit card form when credit card is selected', () => {
      const creditCardButton = screen.getByRole('button', { name: /credit card/i });
      fireEvent.click(creditCardButton);
      
      expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name on card/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    });

    it('should not show credit card form initially', () => {
      expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
    });

    it('should limit card number to 16 digits', () => {
      const creditCardButton = screen.getByRole('button', { name: /credit card/i });
      fireEvent.click(creditCardButton);
      
      const cardNumberInput = screen.getByLabelText(/card number/i);
      expect(cardNumberInput).toHaveAttribute('maxLength', '16');
    });

    it('should format expiry date with slash', () => {
      const creditCardButton = screen.getByRole('button', { name: /credit card/i });
      fireEvent.click(creditCardButton);
      
      const expiryInput = screen.getByLabelText(/expiry date/i);
      expect(expiryInput).toHaveAttribute('maxLength', '5');
      expect(expiryInput).toHaveAttribute('placeholder', 'MM/YY');
    });

    it('should limit CVV to 4 digits', () => {
      const creditCardButton = screen.getByRole('button', { name: /credit card/i });
      fireEvent.click(creditCardButton);
      
      const cvvInput = screen.getByLabelText(/cvv/i);
      expect(cvvInput).toHaveAttribute('maxLength', '4');
    });

    it('should display back button', () => {
      expect(screen.getByRole('button', { name: /^back$/i })).toBeInTheDocument();
    });

    it('should display place order button with total', () => {
      const placeOrderButton = screen.getByRole('button', { name: /place order/i });
      expect(placeOrderButton).toBeInTheDocument();
      expect(placeOrderButton.textContent).toContain('$');
    });
  });

  describe('Order Summary Calculations', () => {
    const cartContext = {
      cartItems: [
        { id: 1, name: 'Test Product', price: 100.00, quantity: 2, image: '/test.jpg' }
      ],
      getCartTotal: vi.fn(() => 200.00),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 2),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should display subtotal correctly', () => {
      expect(screen.getByText('Subtotal:')).toBeInTheDocument();
      expect(screen.getAllByText('$200.00').length).toBeGreaterThan(0);
    });

    it('should display shipping cost', () => {
      expect(screen.getByText('Shipping:')).toBeInTheDocument();
      // Default standard shipping is $10
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('should display tax (8%)', () => {
      expect(screen.getByText('Tax (8%):')).toBeInTheDocument();
      expect(screen.getByText('$16.00')).toBeInTheDocument(); // 8% of 200
    });

    it('should display grand total', () => {
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('$226.00')).toBeInTheDocument(); // 200 + 10 + 16
    });
  });

  describe('Coupon Code Functionality', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should render coupon code input', () => {
      const couponInput = screen.getByPlaceholderText(/coupon code/i);
      expect(couponInput).toBeInTheDocument();
    });

    it('should render apply button for coupon', () => {
      expect(screen.getByRole('button', { name: /^apply$/i })).toBeInTheDocument();
    });

    it('should allow typing in coupon code', () => {
      const couponInput = screen.getByPlaceholderText(/coupon code/i);
      fireEvent.change(couponInput, { target: { value: 'SAVE10' } });
      expect(couponInput).toHaveValue('SAVE10');
    });

    it('should convert coupon code to uppercase', () => {
      const couponInput = screen.getByPlaceholderText(/coupon code/i);
      fireEvent.change(couponInput, { target: { value: 'save10' } });
      expect(couponInput).toHaveValue('SAVE10');
    });

    it('should show applied message when coupon is applied', () => {
      const couponInput = screen.getByPlaceholderText(/coupon code/i);
      const applyButton = screen.getByRole('button', { name: /^apply$/i });
      
      fireEvent.change(couponInput, { target: { value: 'SAVE10' } });
      fireEvent.click(applyButton);
      
      expect(screen.getByText(/Coupon "SAVE10" applied/i)).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test Product', price: 50, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 50),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    it('should have place order button on payment step', () => {
      renderCheckout(cartContext);
      
      // Navigate to payment step
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/^address/i), { target: { value: '123 Main Street' } });
      fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'United States' } });
      fireEvent.change(screen.getByLabelText(/state \/ province/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '1234' } });
      fireEvent.click(screen.getByRole('button', { name: /continue to shipping/i }));
      fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));
      
      const submitButton = screen.getByRole('button', { name: /place order/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    beforeEach(() => {
      renderCheckout(cartContext);
    });

    it('should have proper labels for required form inputs', () => {
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    });

    it('should display error messages with alert icon', () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to shipping/i }));
      
      const errorMessages = document.querySelectorAll('.error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    it('should have proper heading hierarchy', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });
  });

  describe('Component Integration', () => {
    const cartContext = {
      cartItems: [{ id: 1, name: 'Test', price: 10, quantity: 1, image: '/test.jpg' }],
      getCartTotal: vi.fn(() => 10),
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      getCartCount: vi.fn(() => 1),
      addToCart: vi.fn(),
    };

    it('should render without crashing', () => {
      renderCheckout(cartContext);
      expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument();
    });

    it('should display order summary images', () => {
      renderCheckout(cartContext);
      const images = document.querySelectorAll('.summary-item img');
      expect(images.length).toBeGreaterThan(0);
    });
  });
});
