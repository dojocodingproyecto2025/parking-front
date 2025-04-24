import { useEffect, useState } from 'react';
import styles from './loadpage.module.css';

const Loadpage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>
        Cargando App Parking...
      </div>
    </div>
  );
}

export default Loadpage;