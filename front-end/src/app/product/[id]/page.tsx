import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { Suspense } from 'react';
import styles from './ProductPage.module.css';

interface Review {
  Author: string;
  IsVerified: boolean;
  Rating: number;
  Comment: string;
}

interface Product {
  Id: string;
  Category: string;
  Brand: string;
  Name: string;
  Price: string;
  RatingScore: number;
  ReviewCount: number;
  Description: string;
  GalleryImages: string[];
  TechnicalSpecifications?: string[];
  KeyFeatures?: string[];
  Reviews?: Review[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProductContent({ id }: { id: string }) {
  let product: Product | undefined;
  let allProducts: Product[] = [];

  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    allProducts = JSON.parse(fileData);
    product = allProducts.find((p) => p.Id === id);
  } catch (error) {
    console.error('Error reading products.json:', error);
  }

  if (!product) {
    notFound();
  }

  const accessories = allProducts
    .filter((p) => p.Id !== product?.Id)
    .slice(0, 3);

  const rating = product.RatingScore || 4.9;
  const reviewCount = product.ReviewCount || 128;

  return (
    <div className={styles.pageWrapper}>

      <div className={styles.heroSection}>
        <div className={styles.galleryColumn}>
          <div className={styles.mainImageContainer}>
            <img 
              src={product.GalleryImages?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'} 
              alt={product.Name} 
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailRow}>
            {product.GalleryImages?.slice(0, 4).map((imgUrl, index) => (
              <div 
                key={index} 
                className={`${styles.thumbnailBox} ${index === 0 ? styles.activeThumb : ''}`}
              >
                <img src={imgUrl} alt={`${product?.Name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.brandTitleRow}>
            <span className={styles.brand}>{product.Brand}</span>
            <span className={styles.dotSeparator}>▪</span>
            <h1 className={styles.title}>{product.Name}</h1>
          </div>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{'★'.repeat(Math.floor(rating))}</span>
            <span className={styles.ratingText}>
              {rating} / 5 from {reviewCount} reviews
            </span>
          </div>

          <div className={styles.descriptionBlock}>
            <h3 className={styles.sectionHeading}>Description</h3>
            <p className={styles.descriptionText}>
              {product.Description || 'Designed for extreme versatility, combining ultra-telephoto optics with rapid autofocus. Delivers professional-grade clarity and depth in a compact, weather-sealed body.'}
            </p>
          </div>

          <div className={styles.priceTag}>{product.Price}</div>

          <button className={styles.addToCartBtn}>
            ADD TO CART
          </button>

          <div className={styles.shippingNotice}>
            <p>Free shipping within South Africa</p>
            <p>Shipping times between 3 - 5 business days</p>
          </div>
        </div>
      </div>

      <div className={styles.specsContainer}>
        <div className={styles.accordionBox}>
          <div className={styles.accordionHeader}>
            <span>Technical Specifications</span>
            <span>▲</span>
          </div>
          <div className={styles.accordionContent}>
            <ul className={styles.bulletList}>
              {product.TechnicalSpecifications?.map((spec, index) => (
                <li key={index}>{spec}</li>
              )) || (
                <>
                  <li><strong>24–600mm Ultra-Telephoto Zeiss Lens</strong> — Large aperture optics deliver smooth bokeh.</li>
                  <li><strong>20.1 MP Stacked CMOS Sensor</strong> — Enables high-speed continuous shooting.</li>
                  <li><strong>Optical SteadyShot™ Stabilization</strong> — Provides up to 4.5 stops of compensation.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.accordionBox}>
          <div className={styles.accordionHeader}>
            <span>Key Features</span>
            <span>▲</span>
          </div>
          <div className={styles.accordionContent}>
            <ul className={styles.bulletList}>
              {product.KeyFeatures?.map((feat, index) => (
                <li key={index}>{feat}</li>
              )) || (
                <>
                  <li><strong>Sensor Type:</strong> 1.0-type Exmor RS CMOS</li>
                  <li><strong>Effective Pixels:</strong> Approx. 20.1 Megapixels</li>
                  <li><strong>Viewfinder:</strong> 0.39-type XGA OLED Tru-Finder</li>
                  <li><strong>Weight:</strong> Approx. 1095g (with battery and media)</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        <div className={styles.reviewsGrid}>
          {product.Reviews && product.Reviews.length > 0 ? (
            product.Reviews.map((rev, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewerName}>
                    {rev.Author} {rev.IsVerified && <span className={styles.verifiedTag}>(Verified Buyer)</span>}
                  </span>
                  <div className={styles.stars}>{'★'.repeat(rev.Rating)}</div>
                </div>
                <p className={styles.reviewComment}>"{rev.Comment}"</p>
              </div>
            ))
          ) : (
            <p className={styles.noReviews}>No customer reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </section>

      <section className={styles.accessoriesSection}>
        <h2 className={styles.sectionTitle}>Accessories</h2>
        <div className={styles.accessoriesGrid}>
          {accessories.map((acc) => (
            <div key={acc.Id} className={styles.accessoryCard}>
              <div className={styles.accessoryImageContainer}>
                <img src={acc.GalleryImages?.[0]} alt={acc.Name} />
              </div>
              <div className={styles.accessoryInfo}>
                <h4 className={styles.accessoryTitle}>{acc.Name}</h4>
                <p className={styles.accessoryVendor}>{acc.Brand}</p>
                <p className={styles.accessoryPrice}>{acc.Price}</p>
                <button className={styles.bundleBtn}>BUNDLE ITEM</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

async function ProductLoader({ params }: PageProps) {
  const { id } = await params;
  return <ProductContent id={id} />;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <main className={styles.mainContainer}>
      <Suspense fallback={<div className={styles.loaderState}>Loading product details...</div>}>
        <ProductLoader params={params} />
      </Suspense>
    </main>
  );
}