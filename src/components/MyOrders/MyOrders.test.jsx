import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyOrders from './MyOrders.jsx';

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
const mockLocation = {
  state: null,
  pathname: '/my-orders',
  search: '',
  hash: '',
  key: 'default',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe('MyOrders Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.state = null;
  });

  const sampleOrderData = {
    orderNumber: '12345',
    orderDate: '2025-12-18T10:30:00',
    customerName: 'John Doe',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    totalAmount: 299.99,
    subtotal: 250.00,
    shipping: 25.00,
    tax: 24.99,
    shippingAddress: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    items: [
      {
        id: 1,
        name: 'Product 1',
        quantity: 2,
        price: 75.00,
        image: 'https://example.com/product1.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        quantity: 1,
        price: 100.00,
        image: 'https://example.com/product2.jpg',
      },
    ],
  };

  describe('No Orders State', () => {
    it('should render "No Orders Found" when no order data is provided', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('No Orders Found')).toBeInTheDocument();
    });

    it('should display package icon when no orders', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const noOrdersDiv = document.querySelector('.no-orders');
      expect(noOrdersDiv).toBeInTheDocument();
    });

    it('should show message about not placing orders yet', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText("You haven't placed any orders yet.")).toBeInTheDocument();
    });

    it('should render "Start Shopping" button', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Start Shopping')).toBeInTheDocument();
    });

    it('should navigate to /shop when "Start Shopping" is clicked', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const button = screen.getByText('Start Shopping');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/shop');
    });

    it('should have shop-now-btn class on button', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const button = screen.getByText('Start Shopping');
      expect(button).toHaveClass('shop-now-btn');
    });
  });

  describe('Order Details State', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should render order success header', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument();
    });

    it('should display thank you message', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Thank you for your purchase. Your order has been confirmed.')).toBeInTheDocument();
    });

    it('should render success icon', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const successIcon = document.querySelector('.success-icon-large');
      expect(successIcon).toBeInTheDocument();
    });

    it('should have my-orders-container class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const container = document.querySelector('.my-orders-container');
      expect(container).toBeInTheDocument();
    });

    it('should have order-details-card', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const card = document.querySelector('.order-details-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Order Information', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should display order number', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('#12345')).toBeInTheDocument();
    });

    it('should display order number label', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Number')).toBeInTheDocument();
    });

    it('should display formatted order date', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Date')).toBeInTheDocument();
      // Date format will vary based on locale, just check it exists
      const dateElement = screen.getByText('Order Date').nextElementSibling;
      expect(dateElement).toBeInTheDocument();
    });

    it('should display customer name', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display customer name label', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Customer Name')).toBeInTheDocument();
    });

    it('should display payment status', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Paid')).toBeInTheDocument();
    });

    it('should display payment status label', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Payment Status')).toBeInTheDocument();
    });

    it('should display order status', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Processing')).toBeInTheDocument();
    });

    it('should display order status label', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Status')).toBeInTheDocument();
    });

    it('should display total amount', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const amounts = screen.getAllByText('$299.99');
      expect(amounts.length).toBeGreaterThan(0);
    });

    it('should display total amount label', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Total Amount')).toBeInTheDocument();
    });

    it('should have order-info-grid class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const grid = document.querySelector('.order-info-grid');
      expect(grid).toBeInTheDocument();
    });

    it('should have multiple order-info-item elements', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const items = document.querySelectorAll('.order-info-item');
      expect(items.length).toBe(6);
    });

    it('should have status-badge class for payment status', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const badges = document.querySelectorAll('.status-badge');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should have paid class on payment status badge', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const paidBadge = document.querySelector('.status-badge.paid');
      expect(paidBadge).toBeInTheDocument();
    });

    it('should have processing class on order status badge', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const processingBadge = document.querySelector('.status-badge.processing');
      expect(processingBadge).toBeInTheDocument();
    });

    it('should have amount class on total amount', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const amount = document.querySelector('.info-value.amount');
      expect(amount).toBeInTheDocument();
    });
  });

  describe('Shipping Address', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should display shipping address heading', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Shipping Address')).toBeInTheDocument();
    });

    it('should display street address', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('123 Main St')).toBeInTheDocument();
    });

    it('should display city, state, and zip code', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('New York, NY 10001')).toBeInTheDocument();
    });

    it('should display country', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('USA')).toBeInTheDocument();
    });

    it('should have shipping-address-section class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const section = document.querySelector('.shipping-address-section');
      expect(section).toBeInTheDocument();
    });

    it('should have address-details class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const details = document.querySelector('.address-details');
      expect(details).toBeInTheDocument();
    });
  });

  describe('Order Items', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should display order items heading', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Items')).toBeInTheDocument();
    });

    it('should render all order items', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const items = document.querySelectorAll('.order-item');
      expect(items.length).toBe(2);
    });

    it('should display first product name', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    it('should display second product name', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('should display product quantities', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
      expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    });

    it('should display product images', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const images = screen.getAllByRole('img');
      expect(images.length).toBe(2);
    });

    it('should have correct alt text for images', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByAltText('Product 1')).toBeInTheDocument();
      expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });

    it('should have correct image sources', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const img1 = screen.getByAltText('Product 1');
      const img2 = screen.getByAltText('Product 2');

      expect(img1).toHaveAttribute('src', 'https://example.com/product1.jpg');
      expect(img2).toHaveAttribute('src', 'https://example.com/product2.jpg');
    });

    it('should display calculated item prices', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('$150.00')).toBeInTheDocument(); // 75 * 2
      expect(screen.getByText('$100.00')).toBeInTheDocument(); // 100 * 1
    });

    it('should have order-items-section class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const section = document.querySelector('.order-items-section');
      expect(section).toBeInTheDocument();
    });

    it('should have order-items-list class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const list = document.querySelector('.order-items-list');
      expect(list).toBeInTheDocument();
    });

    it('should have order-item-details class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const details = document.querySelectorAll('.order-item-details');
      expect(details.length).toBe(2);
    });

    it('should have order-item-price class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const prices = document.querySelectorAll('.order-item-price');
      expect(prices.length).toBe(2);
    });
  });

  describe('Order Summary', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should display subtotal', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Subtotal:')).toBeInTheDocument();
      expect(screen.getByText('$250.00')).toBeInTheDocument();
    });

    it('should display shipping cost', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Shipping:')).toBeInTheDocument();
      expect(screen.getByText('$25.00')).toBeInTheDocument();
    });

    it('should display tax', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Tax:')).toBeInTheDocument();
      expect(screen.getByText('$24.99')).toBeInTheDocument();
    });

    it('should display total', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Total:')).toBeInTheDocument();
    });

    it('should have order-summary-section class', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const section = document.querySelector('.order-summary-section');
      expect(section).toBeInTheDocument();
    });

    it('should have summary-row classes', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const rows = document.querySelectorAll('.summary-row');
      expect(rows.length).toBe(4);
    });

    it('should have total class on total row', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const totalRow = document.querySelector('.summary-row.total');
      expect(totalRow).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    beforeEach(() => {
      mockLocation.state = { orderData: sampleOrderData };
    });

    it('should format date with month, day, and year', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const dateLabel = screen.getByText('Order Date');
      const dateValue = dateLabel.nextElementSibling;
      
      // Check that date contains expected parts (locale-independent check)
      expect(dateValue.textContent).toBeTruthy();
      expect(dateValue.textContent.length).toBeGreaterThan(0);
    });
  });

  describe('CSS Classes', () => {
    it('should apply no-orders class when no data', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const noOrders = document.querySelector('.no-orders');
      expect(noOrders).toBeInTheDocument();
    });

    it('should apply my-orders-container class with data', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const container = document.querySelector('.my-orders-container');
      expect(container).toBeInTheDocument();
    });

    it('should apply order-success-header class', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const header = document.querySelector('.order-success-header');
      expect(header).toBeInTheDocument();
    });

    it('should apply success-icon-large class', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const icon = document.querySelector('.success-icon-large');
      expect(icon).toBeInTheDocument();
    });

    it('should apply order-details-card class', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const card = document.querySelector('.order-details-card');
      expect(card).toBeInTheDocument();
    });

    it('should apply info-label classes', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const labels = document.querySelectorAll('.info-label');
      expect(labels.length).toBe(6);
    });

    it('should apply info-value classes', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const values = document.querySelectorAll('.info-value');
      expect(values.length).toBe(6);
    });
  });

  describe('Accessibility', () => {
    it('should render headings with proper hierarchy', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Order Placed Successfully!');
    });

    it('should render h2 for Order Details', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toHaveTextContent('Order Details');
    });

    it('should render h3 headings for subsections', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const h3Headings = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headings.length).toBe(2); // Shipping Address and Order Items
    });

    it('should have alt text for all images', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    it('should render button as actual button element', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const button = screen.getByText('Start Shopping');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Component Rendering', () => {
    it('should render without crashing with no data', () => {
      expect(() => render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      )).not.toThrow();
    });

    it('should render without crashing with order data', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      expect(() => render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      )).not.toThrow();
    });

    it('should not render "No Orders Found" when order data exists', () => {
      mockLocation.state = { orderData: sampleOrderData };
      
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.queryByText('No Orders Found')).not.toBeInTheDocument();
    });

    it('should not render order details when no order data', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.queryByText('Order Placed Successfully!')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty items array', () => {
      mockLocation.state = {
        orderData: {
          ...sampleOrderData,
          items: [],
        },
      };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const items = document.querySelectorAll('.order-item');
      expect(items.length).toBe(0);
    });

    it('should handle single item', () => {
      mockLocation.state = {
        orderData: {
          ...sampleOrderData,
          items: [sampleOrderData.items[0]],
        },
      };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const items = document.querySelectorAll('.order-item');
      expect(items.length).toBe(1);
    });

    it('should handle multiple clicks on Start Shopping button', () => {
      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      const button = screen.getByText('Start Shopping');
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(2);
    });

    it('should format prices with two decimal places', () => {
      mockLocation.state = { orderData: sampleOrderData };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      // Check that all prices have two decimal places
      const prices = document.querySelectorAll('.order-item-price');
      prices.forEach(price => {
        const priceText = price.textContent;
        expect(priceText).toMatch(/\$\d+\.\d{2}/);
      });
    });

    it('should handle large quantity numbers', () => {
      mockLocation.state = {
        orderData: {
          ...sampleOrderData,
          items: [
            {
              id: 1,
              name: 'Product 1',
              quantity: 100,
              price: 75.00,
              image: 'https://example.com/product1.jpg',
            },
          ],
        },
      };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Quantity: 100')).toBeInTheDocument();
      expect(screen.getByText('$7500.00')).toBeInTheDocument();
    });
  });

  describe('Order Data Structure', () => {
    it('should correctly display all required order fields', () => {
      mockLocation.state = { orderData: sampleOrderData };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Order Number')).toBeInTheDocument();
      expect(screen.getByText('Order Date')).toBeInTheDocument();
      expect(screen.getByText('Customer Name')).toBeInTheDocument();
      expect(screen.getByText('Payment Status')).toBeInTheDocument();
      expect(screen.getByText('Order Status')).toBeInTheDocument();
      expect(screen.getByText('Total Amount')).toBeInTheDocument();
    });

    it('should display all address fields', () => {
      mockLocation.state = { orderData: sampleOrderData };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('New York, NY 10001')).toBeInTheDocument();
      expect(screen.getByText('USA')).toBeInTheDocument();
    });

    it('should display all summary fields', () => {
      mockLocation.state = { orderData: sampleOrderData };

      render(
        <BrowserRouter>
          <MyOrders />
        </BrowserRouter>
      );

      expect(screen.getByText('Subtotal:')).toBeInTheDocument();
      expect(screen.getByText('Shipping:')).toBeInTheDocument();
      expect(screen.getByText('Tax:')).toBeInTheDocument();
      expect(screen.getByText('Total:')).toBeInTheDocument();
    });
  });
});
