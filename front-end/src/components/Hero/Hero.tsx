import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.heroSection}>

        <section className={styles.hero}>
            <div className={styles.overlay}/>
            <div className={styles.container}>
                <span className={styles.badge}>NEW RELEASE</span>
                <h1 className={styles.title}>Canon EOS R8 MARK 11</h1>
                <p className={styles.subtitle}>
                    Capture richer travel stories and everyday adventures your way, with a full-frame, compact Canon mirrorless camera that changes everything.
                </p>
            </div>
        </section>

        <div className={styles.perksBar}>
            <div className={styles.perksContainer}>
                <div className={styles.perkItem}>
                    <div className={styles.perkIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                    </div>

                    <div className={styles.perkText}>
                        <span className={styles.perkTitle}>FREE SHIPPING</span>
                        <span className={styles.perkDesc}>On all South African orders above R1 000</span>
                    </div>
                </div>

                <div className={styles.perkItem}>
                    <div className={styles.perkIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 14L4 9l5-5" />
                            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                        </svg>
                    </div>
                    <div className={styles.perkText}>
                        <span className={styles.perkTitle}>HASSLE FREE RETURNS POLICY</span>
                        <span className={styles.perkDesc}>Giving our Customers Peace of Mind</span>
                    </div>
                </div>

                <div className={styles.perkItem}>
                    <div className={styles.perkIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    
                    <div className={styles.perkText}>
                        <span className={styles.perkTitle}>100% SECURE PAYMENT</span>
                        <span className={styles.perkDesc}>We Offer Various Secure Payment Options</span>
                    </div>
                </div>
            </div>
        </div>



    </div>
  );
}