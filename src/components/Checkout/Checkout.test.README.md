# Checkout Component Tests

Comprehensive test suite for the Checkout component using Vitest and React Testing Library.

## Test Coverage

### 1. Empty Cart State (3 tests)
- ✅ Displays empty cart message when cart is empty
- ✅ Shows continue shopping button when cart is empty
- ✅ Navigates to shop when continue shopping is clicked

### 2. Checkout with Items (5 tests)
- ✅ Renders the checkout title
- ✅ Renders order summary section
- ✅ Displays all cart items in order summary
- ✅ Displays correct quantities for items
- ✅ Calculates and displays correct item totals

### 3. Step Indicator (3 tests)
- ✅ Displays step indicator with all three steps
- ✅ Has Address step active initially
- ✅ Has step lines between steps

### 4. Step 1: Shipping Information Form (11 tests)
- ✅ Renders shipping information heading
- ✅ Renders all required form fields
- ✅ Renders optional fields
- ✅ Renders save contact information checkbox
- ✅ Renders continue to shipping button
- ✅ Updates form data when typing in first name
- ✅ Updates form data when typing in last name
- ✅ Has default phone value with +45 prefix
- ✅ Allows selecting country from dropdown
- ✅ Limits ZIP code to 4 digits
- ✅ Toggles save contact checkbox

### 5. Form Validation - Step 1 (4 tests)
- ✅ Shows error when trying to continue with empty required fields
- ✅ Shows error for first name less than 2 characters
- ✅ Shows error for invalid ZIP code format
- ✅ Clears error when user starts typing in a field

### 6. Step 2: Shipping Method (9 tests)
- ✅ Displays shipping method heading
- ✅ Displays all three shipping options
- ✅ Displays shipping costs
- ✅ Displays shipping delivery times
- ✅ Has standard shipping selected by default
- ✅ Allows selecting express shipping
- ✅ Displays back button
- ✅ Displays continue to payment button
- ✅ Goes back to step 1 when back button is clicked

### 7. Step 3: Payment Information (10 tests)
- ✅ Displays payment information heading
- ✅ Displays payment method buttons
- ✅ Has PayPal and Credit Card payment options
- ✅ Shows credit card form when credit card is selected
- ✅ Does not show credit card form initially
- ✅ Limits card number to 16 digits
- ✅ Formats expiry date with slash (MM/YY)
- ✅ Limits CVV to 4 digits
- ✅ Displays back button
- ✅ Displays place order button with total

### 8. Order Summary Calculations (4 tests)
- ✅ Displays subtotal correctly
- ✅ Displays shipping cost
- ✅ Displays tax (8%)
- ✅ Displays grand total

### 9. Coupon Code Functionality (5 tests)
- ✅ Renders coupon code input
- ✅ Renders apply button for coupon
- ✅ Allows typing in coupon code
- ✅ Converts coupon code to uppercase
- ✅ Shows applied message when coupon is applied

### 10. Form Submission (1 test)
- ✅ Has place order button on payment step

### 11. Accessibility (3 tests)
- ✅ Has proper labels for required form inputs
- ✅ Displays error messages with alert icon
- ✅ Has proper heading hierarchy

### 12. Component Integration (2 tests)
- ✅ Renders without crashing
- ✅ Displays order summary images

## Test Results

**Total Tests: 60**
**Passed: 60 ✅**
**Failed: 0**

## Running the Tests

### Run all tests
```bash
npm test
```

### Run Checkout tests only
```bash
npm test Checkout.test.jsx
```

### Run tests in watch mode
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Component Features Tested

### Multi-Step Checkout Flow
- **Step 1: Address** - Shipping information collection
- **Step 2: Shipping** - Shipping method selection
- **Step 3: Payment** - Payment information and order placement

### Form Validation (Zod)
- First name (required, min 2 characters)
- Last name (required, min 2 characters)
- Address (required, min 5 characters)
- City (required, min 2 characters)
- State (required, min 2 characters)
- ZIP code (required, exactly 4 digits)
- Country (required)
- Card number (16 digits)
- Card name (required, min 3 characters)
- Expiry date (MM/YY format)
- CVV (3-4 digits)

### Input Formatting
- ZIP code: Limited to 4 digits
- Phone: +45 prefix maintained
- Card number: Numeric only, max 16 digits
- Expiry date: Auto-formatted to MM/YY
- CVV: Numeric only, max 4 digits
- Coupon code: Converted to uppercase

### Shipping Options
- Standard Shipping: $10 (5-7 business days)
- Express Shipping: $25 (2-3 business days)
- Overnight Shipping: $45 (Next business day)

### Order Calculations
- Subtotal: Sum of all items
- Shipping: Based on selected method
- Tax: 8% of subtotal
- Grand Total: Subtotal + Shipping + Tax

### Payment Methods
- PayPal
- Credit Card (with form fields)

### Navigation
- Step progression with validation
- Back button to previous steps
- Navigation to shop when cart is empty
- Navigation to orders after successful checkout

## Key Testing Patterns

1. **Context Mocking**: Uses `vi.spyOn` to mock the `useCart` hook
2. **Navigation Mocking**: Mocks `useNavigate` from react-router-dom
3. **Multi-Step Forms**: Tests progression through 3 checkout steps
4. **Form Validation**: Tests Zod schema validation on each step
5. **Input Formatting**: Tests real-time input formatting and restrictions
6. **Error Handling**: Tests error display and clearing
7. **Conditional Rendering**: Tests payment form visibility based on selection

## Dependencies

- `vitest`: Test framework
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom matchers for DOM elements
- `react-router-dom`: For navigation testing
- `zod`: Form validation schema
- `react-icons`: Icon components (FiCheck, FiAlertCircle)
