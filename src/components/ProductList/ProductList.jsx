// ProductList.jsx
// 상품 이미지를 보여주는 컴포넌트입니다.
// 상품 이미지를 최대 3개까지만 보여줍니다.

import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
  const limited = products.slice(0, 3); // 최대 3개까지만 보여줌

  return (
    <div className={styles.productList}>
      {limited.map((item) => (
        <img key={item.id} src={item.imageUrl} alt={item.name} className={styles.productImage} />
      ))}
    </div>
  );
};

export default ProductList;
