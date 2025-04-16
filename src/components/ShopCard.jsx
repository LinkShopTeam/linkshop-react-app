// src/components/ShopCard.jsx
import React from 'react';
import styles from '../styles/ShopCard.css';

export default function ShopCard({ shop }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={shop.profileImage} alt='프로필' className={styles.profile} />
          <div>
            <div className={styles.name}>{shop.shopName}</div>
            <div className={styles.username}>@{shop.username}</div>
          </div>
        </div>
        <div className={styles.likes}>
          <img src='/images/heart.png' alt='좋아요' className={styles.heartIcon} />
          <span className={styles.likeCount}>{shop.likeCount}</span>
        </div>
      </div>

      <div className={styles.label}>대표 상품 {shop.products.length}</div>

      <div className={styles.products}>
        {shop.products.slice(0, 3).map((img, idx) => (
          <img key={idx} src={img} alt={`상품 ${idx + 1}`} className={styles.productImage} />
        ))}
      </div>
    </div>
  );
}
