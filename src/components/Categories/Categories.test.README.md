# Categories Component Tests

Comprehensive test suite for the Categories component using Vitest and React Testing Library.

## Test Coverage

### 1. Component Structure (5 tests)
- ✅ Renders the categories container
- ✅ Renders the categories title
- ✅ Renders the categories description
- ✅ Renders the shop all button
- ✅ Renders the categories grid

### 2. Shop All Button (2 tests)
- ✅ Links to the shop page
- ✅ Has the correct CSS class

### 3. Category Cards (6 tests)
- ✅ Renders all three category cards
- ✅ Renders Electronics category
- ✅ Renders Fashion category
- ✅ Renders Home & Living category
- ✅ Has correct links for each category
- ✅ Renders category cards with correct CSS class

### 4. Category Images (5 tests)
- ✅ Renders all category images
- ✅ Has correct alt text for Electronics image
- ✅ Has correct alt text for Fashion image
- ✅ Has correct alt text for Home & Living image
- ✅ Renders images with correct sources

### 5. Category Overlays (4 tests)
- ✅ Renders overlay elements for each category
- ✅ Renders category names inside overlays
- ✅ Displays correct category names
- ✅ Has correct heading level for category names

### 6. Data Structure (2 tests)
- ✅ Renders categories in correct order
- ✅ Has unique keys for each category card

### 7. Accessibility (3 tests)
- ✅ Has accessible navigation links
- ✅ Has proper semantic HTML structure
- ✅ Has descriptive alt text for all images

### 8. Content Validation (2 tests)
- ✅ Displays the full description text
- ✅ Renders description with line break

### 9. Component Integration (2 tests)
- ✅ NavLinks are clickable for each category
- ✅ Renders without crashing

## Test Results

**Total Tests: 31**
**Passed: 31 ✅**
**Failed: 0**

## Running the Tests

### Run all tests
```bash
npm test
```

### Run Categories tests only
```bash
npm test Categories.test.jsx
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

### Navigation
- Shop All button linking to `/shop`
- Electronics category linking to `/shop?category=electronics`
- Fashion category linking to `/shop?category=fashion`
- Home & Living category linking to `/shop?category=home`

### Visual Elements
- Three category cards with images from Unsplash
- Category overlays with names
- Descriptive text and title
- Proper CSS classes applied

### Accessibility
- Semantic HTML with proper heading hierarchy (h2 for main title, h3 for categories)
- Descriptive alt text for all images
- Accessible navigation links
- 4 total links (1 Shop All + 3 categories)

## Key Testing Patterns

1. **Router Integration**: Component wrapped in `BrowserRouter` for NavLink functionality
2. **DOM Queries**: Mix of accessible queries (`getByRole`, `getByText`, `getByAltText`) and direct DOM queries for CSS classes
3. **Content Validation**: Verifies all text content, images, and links are rendered correctly
4. **Structural Testing**: Ensures proper HTML structure and CSS classes
5. **Accessibility Testing**: Validates semantic HTML and ARIA compliance

## Dependencies

- `vitest`: Test framework
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom matchers for DOM elements
- `react-router-dom`: For NavLink navigation testing
