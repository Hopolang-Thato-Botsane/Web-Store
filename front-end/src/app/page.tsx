import styles from "./page.module.css";
import Header from '@/components/Header/Header';
import Hero from "@/components/Hero/Hero"
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/ProductCard/ProductCard";
import productsData from '@/data/products.json';

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
      <Header />
      <Hero /> 
      <section>
        <h2>Best Sellers</h2>
        <div className={styles.grid}>
          {bestSellers.map((item: ProductItem) => (
            <ProductCard key={item.Id} product={item} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}