'use client';

import React, { useState } from 'react';
import ProductCard from "@/components/ProductCard/ProductCard";
import productsData from '@/data/products.json';
import styles from "./Catalogue.module.css";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [priceSort, setPriceSort] = useState<'LOWEST' | 'HIGHEST' | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filterModalCategory, setFilterModalCategory] = useState<string | null>(null);

  const navCategories = ['ALL', 'CAMERAS', 'AUDIO', 'LENSES & OPTICS', 'ACCESSORIES'];
  const priceRanges = ['BELOW R 1000', 'R 1000 - R 5000', 'R 5000 - R 10 000', 'ABOVE R 10 000'];
  const brands = ['NIKON', 'SONY', 'CANON', 'FUJIFILM', 'PANASONIC', 'SIGMA'];
  const modalCategories = ['CAMERA', 'LIGHTING', 'LENSES & OPTICS', 'AUDIO', 'ACCESSORIES'];

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  const filteredProducts = productsData.filter((item: any) => {
    const activeCat = filterModalCategory || (selectedCategory === 'ALL' ? null : selectedCategory);
    const matchesCategory = !activeCat || item.Category?.toUpperCase().includes(activeCat.replace('&', '').trim());
    const matchesBrand = !selectedBrand || item.Brand?.toUpperCase() === selectedBrand;

    const numericPrice = parsePrice(item.Price || '0');
    let matchesRange = true;
    if (priceRange === 'BELOW R 1000') matchesRange = numericPrice < 1000;
    if (priceRange === 'R 1000 - R 5000') matchesRange = numericPrice >= 1000 && numericPrice <= 5000;
    if (priceRange === 'R 5000 - R 10 000') matchesRange = numericPrice > 5000 && numericPrice <= 10000;
    if (priceRange === 'ABOVE R 10 000') matchesRange = numericPrice > 10000;

    return matchesCategory && matchesBrand && matchesRange;
  }).sort((a: any, b: any) => {
    if (!priceSort) return 0;
    const priceA = parsePrice(a.Price);
    const priceB = parsePrice(b.Price);
    return priceSort === 'LOWEST' ? priceA - priceB : priceB - priceA;
  });

  return (
    <div className={styles.container}>
      
      <div className={styles.headerRow}>
        <h1 className={styles.title}>STORE</h1>
        <button 
          className={styles.goldenPillBtn}
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filters <span className={styles.filterIcon}>⚙</span>
        </button>
      </div>

      <div className={styles.categoryNav}>
        {navCategories.map((cat) => (
          <button
            key={cat}
            className={`${styles.catTab} ${selectedCategory === cat ? styles.activeCatTab : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setFilterModalCategory(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.Id} product={product} />
        ))}
      </div>

      <section className={styles.newsletterSection}>
        <h2 className={styles.newsletterHeading}>Join The Syndicate</h2>
        <p className={styles.newsletterSubtext}>
          Get first access to limited lens drops, field guides, and exclusive member pricing.
        </p>
        <div className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Enter Email Address" 
            className={styles.newsletterInput} 
          />
          <button className={styles.newsletterBtn}>JOIN</button>
        </div>
      </section>

      {isFilterModalOpen && (
        <div className={styles.fullScreenModalOverlay}>
          <div className={styles.fullScreenModalContent}>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Filter By</h2>
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsFilterModalOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              
              <div className={styles.filterGroup}>
                <label className={styles.groupLabel}>By Price:</label>
                <div className={styles.chipRow}>
                  {['LOWEST', 'HIGHEST'].map((type) => (
                    <button
                      key={type}
                      className={`${styles.chip} ${priceSort === type ? styles.chipActiveDark : ''}`}
                      onClick={() => setPriceSort(priceSort === type ? null : (type as 'LOWEST' | 'HIGHEST'))}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.groupLabel}>By Range:</label>
                <div className={styles.chipRow}>
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      className={`${styles.chip} ${priceRange === range ? styles.chipActiveGoldText : ''}`}
                      onClick={() => setPriceRange(priceRange === range ? null : range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.groupLabel}>By Brand:</label>
                <div className={styles.chipGridSix}>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      className={`${styles.chip} ${selectedBrand === brand ? styles.chipActiveDark : ''}`}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.groupLabel}>By Category:</label>
                <div className={styles.chipGridFive}>
                  {modalCategories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.chip} ${filterModalCategory === cat ? styles.chipActiveGoldText : ''}`}
                      onClick={() => setFilterModalCategory(filterModalCategory === cat ? null : cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <button 
              className={styles.applyFilterBtn}
              onClick={() => setIsFilterModalOpen(false)}
            >
              FILTER
            </button>

          </div>
        </div>
      )}

    </div>
  );
}