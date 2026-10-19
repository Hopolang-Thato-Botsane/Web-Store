'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, subtotal } = useCart();
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [instructionsText, setInstructionsText] = useState('');

  if (!isCartOpen) return null;

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA')}`;
  };

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Cart</h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Your cart is currently empty.</p>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageContainer}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemVariant}>{item.brand} {item.quantity > 1 ? `(x{item.quantity})` : ''}</p>
                    <p className={styles.itemPrice}>{formatCurrency(item.numericPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Instructions Accordion */}
          <div className={styles.instructionsSection}>
            <button 
              className={styles.instructionsToggle}
              onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
            >
              <span>Order Instructions</span>
              <span>{isInstructionsOpen ? '▲' : '▼'}</span>
            </button>
            {isInstructionsOpen && (
              <div className={styles.instructionsContent}>
                <textarea
                  className={styles.textarea}
                  placeholder="Special instructions for order..."
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer / Summary */}
        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Estimated total:</span>
            <span className={styles.totalValue}>
              {cart.length > 0 ? formatCurrency(subtotal) : 'Nill'}
            </span>
          </div>
          <p className={styles.taxNotice}>Tax included. Shipping & discounts calculated at checkout.</p>

          <div className={styles.actionButtons}>
            {cart.length > 0 ? (
              <>
                <button 
                  className={styles.secondaryBtn} 
                  onClick={() => cart.forEach(item => removeFromCart(item.id))}
                >
                  REMOVE ITEM
                </button>
                <button 
                  className={styles.primaryBtn}
                  onClick={() => {
                    alert('Proceeding to checkout...');
                  }}
                >
                  CHECKOUT
                </button>
              </>
            ) : (
              <button className={styles.primaryBtnFull} onClick={closeCart}>
                CLOSE
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}