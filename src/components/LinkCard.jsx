// LinkCard.jsx
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/LinkCard.module.css';
import ProductList from './ProductList';
import React from 'react';

<<<<<<< HEAD
const LinkCard = React.forwardRef(({ data }, ref) => {
  const { name, userId, likes, products, shop } = data;

=======
const LinkCard = ({ data }) => {
  const { name, userId, likes, products, shop, id } = data;
>>>>>>> ed8aaefa8235daf27f17b45946c2abd945c6f368
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/link/${id}`);
  };

  return (
    <div className={styles.container} ref={ref} onClick={handleClick}>
      <div className={styles.header}>
        <img
          src={shop.imageUrl !== 'https://example.com/...' ? shop.imageUrl : '/images/profile1.png'}
          alt='store icon'
          className={styles.avatar}
        />
        <div>
          <h2 className={styles.storeName}>{name}</h2>
          <p className={styles.handle}>@{userId}</p>
        </div>
        <div className={styles.likes}>
          <img src='/icons/status=fill.png' alt='heart' className={styles.heartIcon} /> {likes}
        </div>
      </div>
      <p className={styles.productCount}>대표 상품 {products.length}</p>
      <ProductList products={products} />
    </div>
  );
});

export default LinkCard;
