# Cart Component Tests

Comprehensive test suite for the Cart component using Vitest and React Testing Library.

## Test Coverage

### 1. Empty Cart (2 tests)
- ✅ Displays empty cart message when cart is empty
- ✅ Shows link to shop page when cart is empty

### 2. Cart with Items (6 tests)
- ✅ Renders cart items correctly
- ✅ Displays correct prices for each item
- ✅ Displays correct quantities
- ✅ Calculates and displays correct item totals
- ✅ Displays cart header with clear cart button
- ✅ Calls clearCart when clear cart button is clicked

### 3. Quantity Controls (3 tests)
- ✅ Calls updateQuantity with increased quantity when plus button is clicked
- ✅ Calls updateQuantity with decreased quantity when minus button is clicked
- ✅ Calls removeFromCart when remove button is clicked

### 4. Order Summary (6 tests)
- ✅ Displays order summary section
- ✅ Displays subtotal correctly
- ✅ Displays free shipping
- ✅ Displays total amount
- ✅ Has checkout button linking to checkout page
- ✅ Has continue shopping link

### 5. Accordion Functionality (6 tests)
- ✅ Displays order information section
- ✅ Displays all accordion headers
- ✅ Toggles accordion content when header is clicked
- ✅ Displays return policy content when opened
- ✅ Displays shipping options content when opened
- ✅ Closes one accordion when another is opened

### 6. Multiple Items Display (2 tests)
- ✅ Renders all cart items
- ✅ Renders correct number of remove buttons

## Running the Tests

### Run all tests
```bash
npm test
```

### Run Cart tests only
```bash
npm test Cart.test.jsx
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

## Test Structure

The tests use mocked CartContext to isolate the component behavior and avoid dependencies on the actual context implementation. Each test suite sets up appropriate mock data and context values to test specific scenarios.

### Key Testing Patterns

1. **Context Mocking**: Uses `vi.spyOn` to mock the `useCart` hook
2. **Router Wrapping**: Wraps component in `BrowserRouter` for NavLink functionality
3. **User Interactions**: Tests button clicks, accordion toggles, and navigation
4. **Assertions**: Verifies DOM elements, function calls, and user interface behavior

## Dependencies

- `vitest`: Test framework
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom matchers for DOM elements
- `@testing-library/user-event`: User interaction simulation
- `jsdom`: DOM environment for tests
