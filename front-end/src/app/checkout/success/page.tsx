import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import styles from './Success.module.css';

interface ProductItem {
  Id: string;
  Name: string;
  Brand: string;
  Price: string;
  GalleryImages: string[];
}

function getSampleProducts(): ProductItem[] {
  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const products: ProductItem[] = JSON.parse(fileData);
    return products.slice(0, 2);
  } catch (e) {
    return [];
  }
}

export default function CheckoutSuccessPage() {
  const purchasedItems = getSampleProducts();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span>Check Out</span> &bull; <span className={styles.activeCrumb}>Success</span>
      </div>

      <div className={styles.successLayout}>
        
        <div className={styles.imageColumn}>
          <img 
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80" 
            alt="Success Hero" 
            className={styles.heroImage}
          />
        </div>

        <div className={styles.detailsColumn}>
          <h1 className={styles.heading}>Thank you for your purchase</h1>
          <p className={styles.subtext}>
            You can find your order details in your email address or by tracking it on our website using{' '}
            <span className={styles.orderNumber}>#121212</span> for your package status.
          </p>

          <div className={styles.itemsList}>
            {purchasedItems.map((item) => (
              <div key={item.Id} className={styles.itemCard}>
                <div className={styles.cardImageContainer}>
                  <img src={item.GalleryImages?.[0]} alt={item.Name} className={styles.cardImage} />
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.itemName}>{item.Brand}</h3>
                  <p className={styles.itemMeta}>{item.Name}</p>
                  <p className={styles.itemPrice}>{item.Price}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/" className={styles.backHomeBtn}>
            BACK HOME
          </Link>
        </div>

      </div>
    </div>
  );
}