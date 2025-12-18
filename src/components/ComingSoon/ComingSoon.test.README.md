# ComingSoon Component Tests

Comprehensive test suite for the ComingSoon component using Vitest and React Testing Library.

## Test Coverage

### 1. Default Rendering (8 tests)
- ✅ Renders the coming soon container
- ✅ Renders the coming soon content
- ✅ Renders the "Coming Soon" heading
- ✅ Displays default page name message
- ✅ Displays check back soon message
- ✅ Renders back to home link
- ✅ Has correct href for back to home link
- ✅ Has correct CSS class for back to home link

### 2. Custom Page Name (7 tests)
- ✅ Displays custom page name when provided
- ✅ Displays "About Us" page name
- ✅ Displays "Contact" page name
- ✅ Displays "Services" page name
- ✅ Displays custom page name with special characters
- ✅ Handles empty string as page name
- ✅ Handles long page name

### 3. Content Structure (3 tests)
- ✅ Renders all text paragraphs
- ✅ Renders heading before paragraphs
- ✅ Renders link as last element

### 4. NavLink Integration (2 tests)
- ✅ Uses NavLink component for navigation
- ✅ Maintains NavLink with custom page name

### 5. Props Handling (4 tests)
- ✅ Uses default pageName when no props provided
- ✅ Accepts and uses pageName prop
- ✅ Overrides default with provided pageName
- ✅ Handles numeric pageName

### 6. Accessibility (4 tests)
- ✅ Has proper heading hierarchy
- ✅ Has accessible link with descriptive text
- ✅ Has only one h1 heading
- ✅ Renders semantic HTML structure

### 7. CSS Classes (3 tests)
- ✅ Applies coming-soon-container class
- ✅ Applies coming-soon-content class
- ✅ Applies back-home-link class to link

### 8. Text Content (4 tests)
- ✅ Displays "Coming Soon" as main heading
- ✅ Displays construction message
- ✅ Displays updates message
- ✅ Displays "Back to Home" link text

### 9. Component Rendering (3 tests)
- ✅ Renders without crashing
- ✅ Renders with custom props without crashing
- ✅ Renders multiple instances independently

### 10. Edge Cases (4 tests)
- ✅ Handles undefined pageName gracefully
- ✅ Handles null pageName gracefully
- ✅ Handles whitespace-only pageName
- ✅ Handles pageName with numbers and letters

### 11. Integration (2 tests)
- ✅ Works within BrowserRouter
- ✅ Is a functional component

## Test Results

**Total Tests: 44**
**Passed: 44 ✅**
**Failed: 0**

## Running the Tests

### Run all tests
```bash
npm test
```

### Run ComingSoon tests only
```bash
npm test ComingSoon.test.jsx
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

### Props
- **pageName** (optional): Custom page name to display
  - Default: "This Page"
  - Can be any string value
  - Handles edge cases (empty, null, undefined, numeric, special characters)

### Content
- Main heading: "Coming Soon"
- Dynamic message: "[pageName] is currently under construction."
- Static message: "Check back soon for updates!"
- Navigation link: "Back to Home"

### Navigation
- NavLink component linking to "/"
- CSS class: `back-home-link`

### CSS Classes
- `.coming-soon-container` - Main container
- `.coming-soon-content` - Content wrapper
- `.back-home-link` - Navigation link

### Accessibility
- Proper heading hierarchy (single h1)
- Semantic HTML structure
- Descriptive link text
- Clear content organization

## Usage Examples Tested

### Default Usage
```jsx
<ComingSoon />
// Displays: "This Page is currently under construction."
```

### With Custom Page Name
```jsx
<ComingSoon pageName="Our Blog" />
// Displays: "Our Blog is currently under construction."
```

### Various Page Names Tested
- "About Us"
- "Contact"
- "Services"
- "Gallery"
- "Version 2.0" (with numbers)
- "Our Team & Partners" (with special characters)
- Empty string
- Long page names

## Key Testing Patterns

1. **Component Rendering**: Tests basic rendering and structure
2. **Props Testing**: Validates default and custom prop handling
3. **Content Verification**: Ensures correct text is displayed
4. **Navigation Testing**: Verifies NavLink integration
5. **Edge Case Handling**: Tests various input scenarios
6. **Accessibility Validation**: Ensures semantic HTML and proper structure
7. **CSS Class Testing**: Validates correct styling classes applied
8. **Integration Testing**: Ensures component works within routing context

## Dependencies

- `vitest`: Test framework
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom matchers for DOM elements
- `react-router-dom`: For NavLink navigation testing
