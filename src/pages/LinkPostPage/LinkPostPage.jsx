import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkPostPage.module.css';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Toast from '../../components/Toast/Toast';


const LinkPostPage = () => {
  const navigate = useNavigate();
  const [mainProducts, setMainProducts] = useState([{ name: '', price: '', image: null }]);
  const [shopInfo, setShopInfo] = useState({
    name: '',
    url: '',
    userId: '',
    password: '',
    image: null,
  });
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createdLinkId, setCreatedLinkId] = useState(null);

  const handleBack = () => navigate('/list');

  const handleAddProduct = () => {
    if (mainProducts.length < 3) {
      setMainProducts([...mainProducts, { name: '', price: '', image: null }]);
    }
  };

  const handleMainProductChange = (index, field, value) => {
    const updated = [...mainProducts];
    updated[index][field] = value;
    setMainProducts(updated);
  };

  const handleShopInfoChange = (field, value) => {
    setShopInfo((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('https://linkshop-api.vercel.app/images/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async () => {
    try {
      const shopImageUrl = shopInfo.image ? await uploadImage(shopInfo.image) : '';
      const productData = await Promise.all(
        mainProducts.map(async (product) => {
          const imageUrl = product.image ? await uploadImage(product.image) : '';
          return {
            name: product.name,
            price: Number(product.price),
            imageUrl,
          };
        })
      );

      const result = await fetch('https://linkshop-api.vercel.app/15-8/linkshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop: {
            imageUrl: shopImageUrl,
            urlName: shopInfo.name,
            shopUrl: shopInfo.url,
          },
          products: productData,
          name: shopInfo.name,
          userId: shopInfo.userId,
          password: shopInfo.password,
        }),
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error('🔴 링크샵 생성 실패:', errorText);
        alert(`링크샵 생성 실패: ${errorText}`);
        return;
      }

      const data = await result.json();
      setCreatedLinkId(data.id || data.linkId);
      setShowToast(true);
      setShowModal(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <img
          src="/images/logo.png"
          alt="Link Shop Logo"
          className={styles.logo}
          onClick={() => navigate('/list')}
          style={{ cursor: 'pointer' }}
        />
        <button className={styles.backButton} onClick={handleBack}>돌아가기</button>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>대표 상품</h2>
          <button className={styles.addButton} onClick={handleAddProduct}>추가</button>
        </div>

        {mainProducts.map((product, index) => (
          <div className={styles.card} key={index}>
            <p className={styles.label}>상품 대표 이미지</p>
            <p className={styles.hint}>상품 이미지를 첨부해주세요</p>

            {product.image && (
              <img
                className={styles.previewImage}
                src={URL.createObjectURL(product.image)}
                alt="preview"
              />
            )}

            <input
              type="file"
              accept="image/*"
              id={`product-image-${index}`}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const updated = [...mainProducts];
                  updated[index].image = file;
                  setMainProducts(updated);
                }
              }}
            />
            <label htmlFor={`product-image-${index}`} className={styles.fileButton}>
              파일 첨부
            </label>

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
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>내 쇼핑몰</h2>
        <div className={styles.card}>
          <p className={styles.label}>쇼핑몰 대표 이미지</p>
          <p className={styles.hint}>쇼핑몰 이미지를 첨부해주세요</p>

          {shopInfo.image && (
            <img
              src={URL.createObjectURL(shopInfo.image)}
              alt="preview"
              className={styles.previewImage}
            />
          )}

          <input
            type="file"
            accept="image/*"
            id="shop-image"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setShopInfo((prev) => ({ ...prev, image: file }));
              }
            }}
          />
          <label htmlFor="shop-image" className={styles.fileButton}>
            파일 첨부
          </label>

          <p className={styles.label}>이름</p>
          <input
            type="text"
            className={styles.input}
            value={shopInfo.name}
            onChange={(e) => handleShopInfoChange('name', e.target.value)}
            placeholder="표시하고 싶은 이름을 적어 주세요"
          />

          <p className={styles.label}>URL</p>
          <input
            type="text"
            className={styles.input}
            value={shopInfo.url}
            onChange={(e) => handleShopInfoChange('url', e.target.value)}
            placeholder="URL을 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요. (영문+숫자 6자 이상)"
          />
        </div>
      </section>

      <div className={styles.submitWrapper}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          생성하기
        </button>
      </div>

      <Toast show={showToast} message="등록 완료!" />
      <SuccessModal
        visible={showModal}
        message="등록이 완료되었습니다."
        onClose={() => navigate(`/link/${createdLinkId}`)}
      />
    </div>
  );
};

export default LinkPostPage;

