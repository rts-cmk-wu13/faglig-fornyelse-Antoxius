import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { z } from 'zod';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import './Checkout.css';

// Zod validation schema
const checkoutSchema = z.object({
  // Customer Information
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().optional(),
  phone: z.string().optional(),
  
  // Shipping Address
  address: z.string().min(1, 'Address is required').min(5, 'Address must be at least 5 characters'),
  city: z.string().min(1, 'City is required').min(2, 'City must be at least 2 characters'),
  state: z.string().min(1, 'State is required').min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(1, 'ZIP code is required').regex(/^\d{4}$/, 'ZIP code must be exactly 4 digits'),
  country: z.string().min(1, 'Country is required'),
  
  // Shipping Method
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  
  // Payment Information
  cardNumber: z.string().min(1, 'Card number is required').regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardName: z.string().min(1, 'Name on card is required').min(3, 'Name on card must be at least 3 characters'),
  expiryDate: z.string().min(1, 'Expiry date is required').regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z.string().min(1, 'CVV is required').regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+45',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    saveContact: false,
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const subtotal = getCartTotal();
  const getShippingCost = () => {
    switch(formData.shippingMethod) {
      case 'standard': return 10;
      case 'express': return 25;
      case 'overnight': return 45;
      default: return 10;
    }
  };
  const shipping = getShippingCost();
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Your Cart is Empty</h1>
        <p>Add some items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/shop')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setFormData(prev => ({ ...prev, cardNumber: value }));
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
    if (errors.expiryDate) {
      setErrors(prev => ({ ...prev, expiryDate: undefined }));
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, cvv: value }));
    if (errors.cvv) {
      setErrors(prev => ({ ...prev, cvv: undefined }));
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, zipCode: value }));
    if (errors.zipCode) {
      setErrors(prev => ({ ...prev, zipCode: undefined }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // Always keep +45 prefix
    if (!value.startsWith('+45')) {
      value = '+45';
    }
    // Only allow digits after +45
    const digits = value.slice(3).replace(/\D/g, '').slice(0, 8);
    value = '+45' + digits;
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const validateStep = (step) => {
    const fieldsByStep = {
      1: ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'],
      2: ['shippingMethod'],
      3: ['cardNumber', 'cardName', 'expiryDate', 'cvv']
    };

    const fieldsToValidate = fieldsByStep[step];
    const stepData = {};
    fieldsToValidate.forEach(field => {
      stepData[field] = formData[field];
    });

    const validationResult = checkoutSchema.pick(
      Object.fromEntries(fieldsToValidate.map(f => [f, true]))
    ).safeParse(stepData);

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.issues.forEach(issue => {
        const fieldName = issue.path[0];
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate entire form data with Zod
      const validationResult = checkoutSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const fieldErrors = {};
        validationResult.error.issues.forEach(issue => {
          const fieldName = issue.path[0];
          if (fieldName && !fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const orderNumber = 'ORD' + Date.now().toString().slice(-8);
      
      // Prepare order data
      const orderData = {
        orderNumber: orderNumber,
        orderDate: new Date().toISOString(),
        customerName: `${formData.firstName} ${formData.lastName}`,
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        totalAmount: total,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        items: cartItems
      };
      
      // Clear cart
      clearCart();
      
      // Redirect to orders page with order data
      navigate('/my-orders', { state: { orderData } });
      
    } catch (error) {
      console.error('Checkout error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h1>Checkout</h1>
          
          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span>Address</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span>Shipping</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span>Payment</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <section className="form-section">
                <h2>Shipping information</h2>
                
                {/* First Name and Last Name */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Address */}
                <div className="form-group full-width">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && (
                    <span className="error-message">
                      <FiAlertCircle /> {errors.address}
                    </span>
                  )}
                </div>
                
                {/* Apartment, suite, etc (Optional) */}
                <div className="form-group full-width">
                  <label htmlFor="apartment">Apartment, suite, etc (Optional)</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                {/* City */}
                <div className="form-group full-width">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && (
                    <span className="error-message">
                      <FiAlertCircle /> {errors.city}
                    </span>
                  )}
                </div>
                
                {/* Country, State, ZIP Code */}
                <div className="form-row form-row-three">
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={errors.country ? 'error' : ''}
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Denmark">Denmark</option>
                    </select>
                    {errors.country && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.country}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State / Province *</label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                    >
                      <option value="">Select State</option>
                      <option value="California">California</option>
                      <option value="Texas">Texas</option>
                      <option value="New York">New York</option>
                      <option value="Florida">Florida</option>
                    </select>
                    {errors.state && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.state}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleZipCodeChange}
                      className={errors.zipCode ? 'error' : ''}
                      placeholder="1234"
                      maxLength="4"
                    />
                    {errors.zipCode && (
                      <span className="error-message">
                        <FiAlertCircle /> {errors.zipCode}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Phone (Optional) */}
                <div className="form-group full-width">
                  <label htmlFor="phone">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+45 12345678"
                  />
                </div>
                
                {/* Save contact information checkbox */}
                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="saveContact"
                      checked={formData.saveContact || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, saveContact: e.target.checked }))}
                    />
                    <span>Save contact information</span>
                  </label>
                </div>
                
                {/* Continue to shipping button */}
                <button type="button" onClick={handleNext} className="continue-btn-full">
                  Continue to shipping
                </button>
              </section>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <section className="form-section">
                <h2>Shipping Method</h2>
                
                <div className="shipping-options">
                  <label className={`shipping-option ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                    />
                    <div className="option-content">
                      <div className="option-header">
                        <span className="option-name">Standard Shipping</span>
                        <span className="option-price">$10.00</span>
                      </div>
                      <p className="option-description">5-7 business days</p>
                    </div>
                  </label>

                  <label className={`shipping-option ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                    />
                    <div className="option-content">
                      <div className="option-header">
                        <span className="option-name">Express Shipping</span>
                        <span className="option-price">$25.00</span>
                      </div>
                      <p className="option-description">2-3 business days</p>
                    </div>
                  </label>

                  <label className={`shipping-option ${formData.shippingMethod === 'overnight' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="overnight"
                      checked={formData.shippingMethod === 'overnight'}
                      onChange={handleInputChange}
                    />
                    <div className="option-content">
                      <div className="option-header">
                        <span className="option-name">Overnight Shipping</span>
                        <span className="option-price">$45.00</span>
                      </div>
                      <p className="option-description">Next business day</p>
                    </div>
                  </label>
                </div>
                
                {errors.shippingMethod && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.shippingMethod}
                  </span>
                )}
                
                <div className="form-navigation">
                  <button type="button" onClick={handleBack} className="back-btn">
                    Back
                  </button>
                  <button type="button" onClick={handleNext} className="next-btn">
                    Continue to Payment
                  </button>
                </div>
              </section>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <section className="form-section">
              <h2>Payment Information</h2>
              
              {/* Payment Method Selection */}
              <div className="payment-methods">
                <button
                  type="button"
                  className={`payment-method-btn paypal ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.653h8.53c1.395 0 2.496.146 3.302.438.808.293 1.383.713 1.725 1.26.342.547.513 1.225.513 2.034 0 .62-.097 1.163-.29 1.63-.194.467-.476.867-.848 1.2-.371.333-.816.593-1.336.78-.52.187-1.097.304-1.734.351a7.6 7.6 0 0 1-1.006.065H11.39c-.467 0-.82.15-1.058.45-.238.3-.405.72-.502 1.26l-.807 5.096a.48.48 0 0 1-.475.412zm10.637-9.486c-.413.207-.86.37-1.342.489-.482.119-1.002.179-1.56.179H12.86a.77.77 0 0 0-.76.653l-.807 5.096a.641.641 0 0 0 .633.74h2.925c.414 0 .747-.24.833-.6l.694-4.376c.055-.346.292-.653.633-.653h1.006c.56 0 1.08-.06 1.56-.179.481-.119.929-.282 1.342-.489.824-.413 1.474-1.022 1.95-1.827.475-.805.713-1.787.713-2.946 0-.62-.097-1.163-.29-1.63-.194-.467-.476-.867-.848-1.2-.371-.333-.816-.593-1.336-.78-.52-.187-1.097-.304-1.734-.351a7.6 7.6 0 0 0-1.006-.065h-2.95c-.467 0-.82.15-1.058.45-.238.3-.405.72-.502 1.26l-.807 5.096h3.064c.56 0 1.08-.06 1.56-.179.481-.119.929-.282 1.342-.489.824-.413 1.474-1.022 1.95-1.827z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className={`payment-method-btn credit-card ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('credit-card')}
                >
                  Credit Card
                </button>
              </div>
              
              {/* Credit Card Form - Only show when credit card is selected */}
              {paymentMethod === 'credit-card' && (
              <>
              <div className="form-group full-width">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234567890123456"
                  maxLength="16"
                />
                {errors.cardNumber && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.cardNumber}
                  </span>
                )}
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="cardName">Name on Card *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={errors.cardName ? 'error' : ''}
                  placeholder="John Doe"
                />
                {errors.cardName && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.cardName}
                  </span>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expiryDate && (
                    <span className="error-message">
                      <FiAlertCircle /> {errors.expiryDate}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleCvvChange}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && (
                    <span className="error-message">
                      <FiAlertCircle /> {errors.cvv}
                    </span>
                  )}
                </div>
              </div>
              </> 
              )}
              
              <div className="form-navigation">
                <button type="button" onClick={handleBack} className="back-btn">
                  Back
                </button>
                <button 
                  type="submit" 
                  className="submit-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                </button>
              </div>
            </section>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          
          {/* Coupon Code Input */}
          <div className="coupon-section">
            <div className="coupon-input-group">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="coupon-input"
              />
              <button
                type="button"
                onClick={() => {
                  if (couponCode.trim()) {
                    // Add coupon validation logic here
                    setAppliedCoupon(couponCode);
                  }
                }}
                className="apply-coupon-btn"
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div className="coupon-applied">
                <FiCheck /> Coupon "{appliedCoupon}" applied
              </div>
            )}
          </div>
          
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
