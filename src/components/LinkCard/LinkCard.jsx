// LinkCard.jsx
import { useNavigate } from 'react-router-dom';
import styles from './LinkCard.module.css';
import ProductList from '../ProductList/ProductList';
import React from 'react';

const LinkCard = React.forwardRef(({ data }, ref) => {
  const { name, userId, likes, products, shop, id } = data;
  const [imgSrc, setImgSrc] = React.useState(shop.imageUrl);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/link/${id}`);
  };

  const handleStoreImageError = () => {
    setImgSrc('/images/profile1.png'); //깨지면 기본이미지로
  };

  return (
    <div className={styles.container} ref={ref} onClick={handleClick}>
      <div className={styles.header}>
        <img
          src={imgSrc}
          alt='store icon'
          className={styles.avatar}
          onError={handleStoreImageError} // 이미지로드 실패시 기본이미지로 대체
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
