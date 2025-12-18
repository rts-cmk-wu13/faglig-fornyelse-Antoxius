# Footer Component Tests

Comprehensive test suite for the Footer component using Vitest and React Testing Library.

## Test Coverage

### 1. Component Structure (4 tests)
- ✅ Renders the footer element
- ✅ Renders footer content section
- ✅ Renders footer bottom section
- ✅ Renders all four footer sections

### 2. Newsletter Section (9 tests)
- ✅ Renders newsletter heading
- ✅ Renders newsletter description
- ✅ Renders newsletter form
- ✅ Renders email input field
- ✅ Has correct CSS class for email input
- ✅ Renders subscribe button
- ✅ Has correct CSS class for subscribe button
- ✅ Allows typing in email input
- ✅ Prevents default form submission

### 3. Quick Links Section (7 tests)
- ✅ Renders Quick Links heading
- ✅ Renders all quick links
- ✅ Has correct href for Home link
- ✅ Has correct href for Shop link
- ✅ Has correct href for Store link
- ✅ Has correct href for Support link
- ✅ Renders quick links as list items

### 4. Categories Section (7 tests)
- ✅ Renders Categories heading
- ✅ Renders all category links
- ✅ Has correct href for Ziyarat link
- ✅ Has correct href for Qura'an link
- ✅ Has correct href for Dua link
- ✅ Has correct href for Amal link
- ✅ Renders category links as list items

### 5. Contact Section (10 tests)
- ✅ Renders Contact heading
- ✅ Renders email information
- ✅ Renders phone information
- ✅ Renders social links container
- ✅ Renders all three social media icons
- ✅ Renders Facebook icon
- ✅ Renders Twitter icon
- ✅ Renders Instagram icon
- ✅ Has # href for social media links
- ✅ Has social-icon class for all social links

### 6. Footer Bottom (3 tests)
- ✅ Renders copyright text
- ✅ Has correct year in copyright
- ✅ Renders footer bottom with correct class

### 7. Footer Headings (2 tests)
- ✅ Renders all section headings as h3
- ✅ Has correct heading text for all sections

### 8. CSS Classes (5 tests)
- ✅ Has footer-content class
- ✅ Has footer-section class on all sections
- ✅ Has footer-heading class on all headings
- ✅ Has footer-text class on descriptive text
- ✅ Has footer-links class on link lists

### 9. Navigation Links (2 tests)
- ✅ Renders all 8 navigation links
- ✅ Uses NavLink component for navigation

### 10. Accessibility (6 tests)
- ✅ Has proper semantic HTML structure
- ✅ Has form with proper structure
- ✅ Has email input with proper type
- ✅ Has submit button with proper type
- ✅ Has navigation lists with proper structure
- ✅ Renders all links as anchor elements

### 11. Form Interaction (3 tests)
- ✅ Updates email input value on change
- ✅ Clears email input value
- ✅ Handles multiple email changes

### 12. Content Validation (4 tests)
- ✅ Displays complete newsletter description
- ✅ Displays complete email contact
- ✅ Displays complete phone contact
- ✅ Displays complete copyright text

### 13. Component Rendering (2 tests)
- ✅ Renders without crashing
- ✅ Renders all required sections

### 14. Social Media Integration (3 tests)
- ✅ Renders social media section
- ✅ Renders exactly 3 social media links
- ✅ Renders social icons as anchor tags

## Test Results

**Total Tests: 67**
**Passed: 67 ✅**
**Failed: 0**

## Running the Tests

### Run all tests
```bash
npm test
```

### Run Footer tests only
```bash
npm test Footer.test.jsx
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

### Newsletter Subscription
- Email input field with type="email"
- Subscribe button with type="submit"
- Form structure
- Input interaction and value updates
- CSS classes: `.newsletter-form`, `.newsletter-input`, `.newsletter-button`

### Quick Links Navigation
- **Home**: `/`
- **Shop**: `/shop`
- **Store**: `/store`
- **Support**: `/support`

### Categories Navigation
- **Ziyarat**: `/ziyarat`
- **Qura'an**: `/quraan`
- **Dua**: `/dua`
- **Amal**: `/amal`

### Contact Information
- Email: info@example.com
- Phone: +1 234 567 890
- Social Media Icons:
  - Facebook (FaFacebook)
  - Twitter (FaTwitter)
  - Instagram (FaInstagram)

### Footer Bottom
- Copyright text: "© 2025 Your Company. All rights reserved."
- Current year display

### CSS Classes
- `.footer` - Main footer element
- `.footer-content` - Content wrapper
- `.footer-section` - Individual sections (4 sections)
- `.footer-heading` - Section headings (h3)
- `.footer-text` - Descriptive text
- `.footer-links` - Navigation link lists
- `.footer-bottom` - Bottom section
- `.newsletter-form` - Newsletter form
- `.newsletter-input` - Email input
- `.newsletter-button` - Subscribe button
- `.social-links` - Social media container
- `.social-icon` - Social media links

### Structure
- 4 main sections:
  1. Newsletter signup
  2. Quick links navigation
  3. Categories navigation
  4. Contact information with social media
- Footer bottom with copyright
- Semantic HTML with `<footer>` element
- Proper list structure (`<ul>`, `<li>`)

## Accessibility Features Tested

- Semantic HTML structure (footer, form, lists)
- Proper heading hierarchy (h3 for section headings)
- Email input type for newsletter
- Submit button type for form
- Navigation lists with proper structure
- All links as anchor elements
- Descriptive link text

## Integration Testing

- NavLink integration with React Router
- Form submission handling
- Input value updates
- Navigation link routing
- Social media icon rendering (react-icons)

## Key Testing Patterns

1. **Component Structure**: Tests overall layout and sections
2. **Content Verification**: Ensures all text is displayed correctly
3. **Navigation Testing**: Verifies all links and routing
4. **Form Testing**: Tests input interaction and submission
5. **CSS Classes**: Validates correct styling classes
6. **Accessibility**: Ensures semantic HTML and proper structure
7. **Social Media Integration**: Tests icon rendering and links
8. **Props and State**: Tests form input state changes

## Dependencies

- `vitest`: Test framework
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom matchers for DOM elements
- `react-router-dom`: For NavLink navigation testing
- `react-icons`: For social media icons (FaFacebook, FaTwitter, FaInstagram)
