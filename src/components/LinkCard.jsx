// LinkCard.jsx
import styles from '../styles/components/LinkCard.module.css';
import ProductList from './ProductList';

const LinkCard = ({ data }) => {
  const { name, userId, likes, products, shop } = data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={shop.imageUrl} alt='store icon' className={styles.avatar} />
        <div>
          <h2 className={styles.storeName}>{name}</h2>
          <p className={styles.handle}>@{userId}</p>
        </div>
        <div className={styles.likes}>❤️ {likes}</div>
      </div>
      <p className={styles.productCount}>대표 상품 {products.length}</p>
      <ProductList products={products} />
    </div>
  );
};

export default LinkCard;
