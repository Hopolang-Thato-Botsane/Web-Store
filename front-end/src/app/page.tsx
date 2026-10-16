import styles from "./page.module.css";
import Header from '@/components/Header/Header';
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <Footer/>
    </div>
  );
}
