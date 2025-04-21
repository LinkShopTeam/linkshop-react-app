// src/pages/LinkDetailPage/LinkDetailPage.jsx
import React, { useState } from 'react';
import styles from './LinkDetailPage.module.css';
import { fetchLinkShopDetail } from '../../api/linkShopApi';

const LinkDetailPage = () => {
  const [mainProducts, setMainProducts] = useState([
    { name: '', price: '', image: null },
    { name: '', price: '', image: null },
    { name: '', price: '', image: null },
  ]);

  const [shopInfo, setShopInfo] = useState({
    name: '',
    url: '',
    userId: '',
    password: '',
    image: null,
  });

  const handleAddProduct = () => {
    if (mainProducts.length < 3) {
      setMainProducts([...mainProducts, { name: '', price: '', image: null }]);
    }
  };

  const handleMainProductChange = (index, field, value) => {
    const updatedProducts = [...mainProducts];
    updatedProducts[index][field] = value;
    setMainProducts(updatedProducts);
  };

  const handleShopInfoChange = (field, value) => {
    setShopInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      mainProducts,
      shopInfo,
    };

    try {
      const result = await fetchLinkShopDetail(payload);
      alert('링크샵 생성 완료!');
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <img src="/images/logo.png" alt="Link Shop Logo" className={styles.logo} />
        <button className={styles.iconButton}>
          <img src="/images/frame5.png" alt="돌아가기" />
        </button>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>대표 상품</h2>
          <button className={styles.iconButton} onClick={handleAddProduct}>
            <img src="/images/adder.png" alt="추가" />
          </button>
        </div>

        {mainProducts.map((product, index) => (
          <div className={styles.card} key={index}>
            <p className={styles.label}>상품 대표 이미지</p>
            <p className={styles.hint}>상품 이미지를 첨부해주세요</p>
            <p className={styles.label}>상품 이름</p>
            <input
              type="text"
              className={styles.input}
              value={product.name}
              onChange={(e) => handleMainProductChange(index, 'name', e.target.value)}
              placeholder="상품 이름을 입력해 주세요."
            />
            <p className={styles.label}>상품 가격</p>
            <input
              type="text"
              className={styles.input}
              value={product.price}
              onChange={(e) => handleMainProductChange(index, 'price', e.target.value)}
              placeholder="원화로 표기해 주세요."
            />
            <button className={styles.iconButton}>
              <img src="/images/fileadder.png" alt="파일 첨부" />
            </button>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>내 쇼핑몰</h2>
        <div className={styles.card}>
          <p className={styles.label}>상품 대표 이미지</p>
          <p className={styles.hint}>상품 이미지를 첨부해주세요</p>
          <p className={styles.label}>이름</p>
          <input
            type="text"
            className={styles.input}
            value={shopInfo.name}
            onChange={(e) => handleShopInfoChange('name', e.target.value)}
            placeholder="표시하고 싶은 이름을 적어 주세요"
          />
          <p className={styles.label}>Url</p>
          <input
            type="text"
            className={styles.input}
            value={shopInfo.url}
            onChange={(e) => handleShopInfoChange('url', e.target.value)}
            placeholder="Url을 입력해주세요"
          />
          <p className={styles.label}>유저 ID</p>
          <input
            type="text"
            className={styles.input}
            value={shopInfo.userId}
            onChange={(e) => handleShopInfoChange('userId', e.target.value)}
            placeholder="유저 ID를 입력해주세요"
          />
          <p className={styles.label}>비밀번호</p>
          <input
            type="password"
            className={styles.input}
            value={shopInfo.password}
            onChange={(e) => handleShopInfoChange('password', e.target.value)}
            placeholder="비밀번호를 입력해주세요."
          />
          <button className={styles.iconButton}>
            <img src="/images/fileadder.png" alt="파일 첨부" />
          </button>
        </div>
      </section>

      <div className={styles.submitWrapper}>
        <button className={styles.iconButton} onClick={handleSubmit}>
          <img src="/images/btn.png" alt="생성하기" />
        </button>
      </div>
    </div>
  );
};

export default LinkDetailPage;
