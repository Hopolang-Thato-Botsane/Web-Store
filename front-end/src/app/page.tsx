import styles from "./page.module.css";
import Hero from "@/components/Hero/Hero"
import ProductCard from "@/components/ProductCard/ProductCard";
import productsData from '@/data/products.json';
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";

interface ProductItem {
  Id: string;
  Category: string;
  Brand: string;
  Name: string;
  Price: string;
  RatingScore: number;
  GalleryImages: string[];
}

export default function Home() {

  const bestSellers: ProductItem[] = productsData.slice(0, 5);

  return (
    <div className={styles.page}>
      <Hero />
      <body>
        <section>
        <h2>Best Sellers:</h2>
          <div className={styles.grid}>
            {bestSellers.map((item: ProductItem) => (
              <ProductCard key={item.Id} product={item} />
            ))}
          </div>
        </section>
        <ShopByCategory/>
      </body>
    </div>
  );
}