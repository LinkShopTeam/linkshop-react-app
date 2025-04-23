// LinkCard.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/LinkCard.module.css';
import ProductList from './ProductList';

const LinkCard = ({ data }) => {
  const { name, userId, likes, products, shop, id } = data;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/link/${id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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
