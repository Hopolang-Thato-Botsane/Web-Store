import styles from './ShopByCategory.module.css';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

const categories: CategoryItem[] = [
  {
    id: 'cameras',
    name: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1588648027764-ce268527a233?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ShopByCategory() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Shop By Category</h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img 
                src={category.image} 
                alt={category.name} 
                className={styles.image} 
              />
              <div className={styles.overlay} />
            </div>
            
            <h3 className={styles.titleBox}>{category.name}</h3>
            
            <div className={styles.actionBar}>
              Shop All
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}