import styles from './ProductCard.module.css';

interface Product {
  Id: string;
  Category: string;
  Brand: string;
  Name: string;
  Price: string;
  RatingScore: number;
  GalleryImages: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const renderStars = (rating = 5) => {
    return '★'.repeat(Math.floor(rating));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.GalleryImages?.[0] || '/placeholder.jpg'} 
          alt={product.Name} 
          className={styles.image} 
        />
      </div>
      
      <div className={styles.contentWrapper}>
        <div>
          <p className={styles.brand}>{product.Brand}</p>
          <div className={styles.headerRow}>
            <h3 className={styles.title}>{product.Name}</h3>
            <span className={styles.stars}>{renderStars(product.RatingScore)}</span>
          </div>
        </div>

        <div className={styles.priceBox}>
          <span>{product.Price || 'Price on Request'}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.addToCartText}>Add to Cart</span>
        </div>
      </div>
    </div>
  );
}