"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <Link href="/" className={styles.logo}>
          <img src="/logo.svg" alt="LUX IPSUM" className={styles.logoImg} />
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/cameras">Cameras</Link>
          <Link href="/lighting">Lighting</Link>
          <Link href="/lenses">Lenses & Optics</Link>
          <Link href="/accessories">Accessories</Link>
        </nav>

        <div className={styles.actions}>
          <button aria-label="Search" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          
          <Link href="/cart" aria-label="Cart" className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>

          <Link href="/profile" aria-label="Profile" className={styles.profileAvatar}>
            <img src="/avatar-placeholder.png" alt="User profile" />
          </Link>
        </div>

      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavLinks}>
          <Link href="/studio-cameras" onClick={() => setIsMenuOpen(false)}>
            STUDIO CAMERAS <span>&rarr;</span>
          </Link>
          <Link href="/compact-cameras" onClick={() => setIsMenuOpen(false)}>
            COMPACT CAMERAS <span>&rarr;</span>
          </Link>
          <Link href="/action-cameras" onClick={() => setIsMenuOpen(false)}>
            ACTION CAMERAS <span>&rarr;</span>
          </Link>
          <Link href="/lenses" onClick={() => setIsMenuOpen(false)}>
            LENSES & OPTICS <span>&rarr;</span>
          </Link>
        </div>

        <div className={styles.mobileSearchContainer}>
          <input 
            type="text" 
            placeholder="Search by brand, product type & more..." 
            className={styles.mobileSearchInput}
          />
          <button className={styles.mobileSearchBtn}>SEARCH</button>
        </div>
      </div>
    </header>
  );
}