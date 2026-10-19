'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cart, removeFromCart, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingCost = shippingMethod === 'express' ? 1000 : 0;
  const finalTotal = subtotal + shippingCost;

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA')}`;
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span>Shopping Cart</span> &bull; <span className={styles.activeCrumb}>Check Out</span>
      </div>

      <h1 className={styles.heading}>CHECKOUT</h1>

      <form onSubmit={handleCompletePayment} className={styles.checkoutLayout}>
        
        <div className={styles.formColumn}>
          
          <div className={styles.sectionBox}>
            <h3 className={styles.sectionTitle}>Express Checkout</h3>
            <div className={styles.expressButtons}>
              <button type="button" className={styles.expressBtn}>Apple Pay</button>
              <button type="button" className={styles.expressBtn}>Google Pay</button>
              <button type="button" className={styles.expressBtn}>Samsung Pay</button>
            </div>
          </div>

          <div className={styles.sectionBox}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.inputGrid}>
              <input type="text" placeholder="First Name" required className={styles.input} />
              <input type="text" placeholder="Last Name" required className={styles.input} />
              <input type="tel" placeholder="Phone Number" required className={styles.input} />
              <input type="email" placeholder="Email" required className={styles.input} />
            </div>
          </div>

          <div className={styles.sectionBox}>
            <h3 className={styles.sectionTitle}>Shipping Information</h3>
            <div className={styles.inputGrid}>
              <input type="text" placeholder="Country" required className={styles.input} />
              <input type="text" placeholder="City" required className={styles.input} />
              <input type="text" placeholder="Address" required className={`${styles.input} ${styles.fullWidth}`} />
              <input type="text" placeholder="Zip Code" required className={styles.input} />
            </div>

            <div className={styles.deliverySubSection}>
              <h4 className={styles.subTitle}>Delivery</h4>
              
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="delivery" 
                  checked={shippingMethod === 'standard'} 
                  onChange={() => setShippingMethod('standard')} 
                />
                <div className={styles.radioTextRow}>
                  <span><strong>Standard Delivery</strong><br/><small>Delivery within 5 - 7 Days</small></span>
                  <span>Free</span>
                </div>
              </label>

              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="delivery" 
                  checked={shippingMethod === 'express'} 
                  onChange={() => setShippingMethod('express')} 
                />
                <div className={styles.radioTextRow}>
                  <span><strong>Express Delivery</strong><br/><small>Delivery within 5 - 7 Days</small></span>
                  <span>R 1 000</span>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.sectionBox}>
            <h3 className={styles.sectionTitle}>Payment Information</h3>
            <div className={styles.inputGrid}>
              <input type="text" placeholder="Card Number" required className={`${styles.input} ${styles.fullWidth}`} />
              <input type="text" placeholder="Cardholder Name" required className={styles.input} />
              <input type="text" placeholder="Expiration Date (MM/YY)" required className={styles.input} />
              <input type="text" placeholder="CVV Number" required className={styles.input} />
            </div>
          </div>

          <button type="submit" className={styles.completeBtn}>
            {formatCurrency(finalTotal)} - Complete Payment
          </button>
        </div>

        <div className={styles.summaryColumn}>
          <h3 className={styles.summaryHeading}>
            Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h3>

          {cart.length === 0 ? (
            <p className={styles.emptyCartText}>Your cart is empty. Add items to checkout.</p>
          ) : (
            <div className={styles.summaryItemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.summaryCard}>
                  <div className={styles.summaryImageContainer}>
                    <img src={item.image} alt={item.name} className={styles.summaryImage} />
                  </div>
                  <div className={styles.summaryDetails}>
                    <h4 className={styles.summaryItemName}>{item.name}</h4>
                    <p className={styles.summaryItemMeta}>{item.brand} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                    <p className={styles.summaryItemPrice}>{formatCurrency(item.numericPrice * item.quantity)}</p>
                    <button 
                      type="button" 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      REMOVE ITEM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </form>
    </div>
  );
}