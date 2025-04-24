import styles from './RoofPattern.module.css';
import { useEffect, useState } from 'react';

export default function RoofPattern() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 32; // padding 고려
      const semicircleWidth = 40 + 2; // margin이 있다면 더 추가
      const newCount = Math.floor(width / semicircleWidth);
      setCount(newCount);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`${styles.semicircle} ${i % 2 === 0 ? styles.red : styles.blue}`} />
      ))}
    </div>
  );
}
