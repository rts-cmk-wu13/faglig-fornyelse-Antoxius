import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import React from 'react';

describe('CartContext', () => {
  function wrapper({ children }) {
    return <CartProvider>{children}</CartProvider>;
  }

  it('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test', price: 10 };
    act(() => {
      result.current.addToCart(product);
    });
    expect(result.current.cartItems).toEqual([
      { ...product, quantity: 1 },
    ]);
    expect(result.current.getCartCount()).toBe(1);
    expect(result.current.getCartTotal()).toBe(10);
  });

  it('should increment quantity if product is added again', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test', price: 10 };
    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });
    expect(result.current.cartItems).toEqual([
      { ...product, quantity: 2 },
    ]);
    expect(result.current.getCartCount()).toBe(2);
    expect(result.current.getCartTotal()).toBe(20);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test', price: 10 };
    act(() => {
      result.current.addToCart(product);
      result.current.removeFromCart(product.id);
    });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should update product quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test', price: 10 };
    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(product.id, 5);
    });
    expect(result.current.cartItems).toEqual([
      { ...product, quantity: 5 },
    ]);
    expect(result.current.getCartCount()).toBe(5);
    expect(result.current.getCartTotal()).toBe(50);
  });

  it('should remove product if quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, name: 'Test', price: 10 };
    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(product.id, 0);
    });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = { id: 1, name: 'Test1', price: 10 };
    const product2 = { id: 2, name: 'Test2', price: 20 };
    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
      result.current.clearCart();
    });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should throw if useCart is used outside provider', () => {
    // Suppress error output for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within a CartProvider');
    spy.mockRestore();
  });
});
