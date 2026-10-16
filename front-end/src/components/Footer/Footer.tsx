"use client"
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.container}>

            <div className={styles.newsletterSection}>
                <h2 className={styles.newsletterTitle}>Join The Syndicate</h2>
                <p className={styles.newsletterSubtitle}>
                    Get first access to limited lens drops, field guides, and exclusive member pricing.
                </p>
                <div className={styles.formWrapper}>
                    <input 
                        type="text"
                        placeholder=""
                        className={styles.emailInput}
                    />
                    <button className={styles.joinBtn}>JOIN</button>
                </div>
            </div>

            <div className={styles.linksGrid}>
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>SHOP</h3>
                    <ul className={styles.columnList}>
                        <li><Link href="/studio-camera">Cameras</Link></li>
                        <li><Link href="/studio-camera">Lighting</Link></li>
                        <li><Link href="/studio-camera">Lenses & Optics</Link></li>
                        <li><Link href="/studio-camera">Accessories</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>SUPPORT</h3>
                    <ul className={styles.columnList}>
                        <li><Link href="order-tracking">Order Tracking</Link></li>
                        <li><Link href="shipping">Shipping/Delivery</Link></li>
                        <li><Link href="/warranty">Warranty/Returns</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>COMPANY</h3>
                    <ul className={styles.columnList}>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="journal">Editorial Journal</Link></li>
                        <li><Link href="/sustainability">Sustainability</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>SOCIALS</h3>
                    <ul className={styles.columnList}>
                        <li><Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link></li>
                        <li><Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</Link></li>
                        <li><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">X / Twitter</Link></li>
                        <li><Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</Link></li>
                    </ul>
                </div>
                
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    <span>&copy; 2026</span>
                    <img src="logo.svg" alt="LUX IPSUM" className={styles.bottomLogo}/>
                    <span>All Rights Reserved.</span>
                </div>
                <div className={styles.legalLinks}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>

        </div>
    </footer>
  );
}