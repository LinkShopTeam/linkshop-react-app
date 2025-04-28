import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchLinkShopDetail } from '../../api/linkShopApi';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Toast from '../../components/Toast/Toast';
import styles from './LinkEditPage.module.css';

export default function LinkEditPage() {
  const { linkshopId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state?.currentPassword || '';

  const [shopInfo, setShopInfo] = useState({
    name: '',
    url: '',
    userId: '',
    image: null,
    imageUrl: '',
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLinkShopDetail(linkshopId);
        setShopInfo({
          name: data.name,
          url: data.shop.shopUrl,
          userId: data.userId,
          image: null,
          imageUrl: data.shop.imageUrl,
        });
        setProducts(
          data.products.map((product) => ({
            ...product,
            image: null,
            imageUrl: product.imageUrl,
          }))
        );
      } catch (err) {
        setError('정보를 불러오지 못했습니다.');
      }
    };
    fetchData();
  }, [linkshopId]);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('https://linkshop-api.vercel.app/images/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('이미지 업로드 실패');
      }
      const data = await res.json();
      return data.url;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleSubmit = async () => {
    try {
      const shopImageUrl = shopInfo.image
        ? await uploadImage(shopInfo.image)
        : shopInfo.imageUrl;

      const productData = await Promise.all(
        products.map(async (product) => {
          const imageUrl = product.image
            ? await uploadImage(product.image)
            : product.imageUrl;
          return {
            name: product.name,
            price: Number(product.price),
            imageUrl,
          };
        })
      );

      const res = await fetch(`https://linkshop-api.vercel.app/15-8/linkshops/${linkshopId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: password,
          name: shopInfo.name,
          userId: shopInfo.userId,
          products: productData,
          shop: {
            shopUrl: shopInfo.url,
            imageUrl: shopImageUrl,
            urlName: shopInfo.name,
          },
        }),
      });

      if (!res.ok) throw new Error('수정 실패');

      setShowToast(true);
      setShowModal(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setError('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div 
      className={styles.pageWrapper}>
      <header className={styles.header}>
        <h1
          className={styles.logo}
          onClick={() => navigate('/list')}
          style={{ cursor: 'pointer' }}
        >
          LINK SHOP
        </h1>
        <button
          className={styles.backButton}
          onClick={() => navigate('/list')}
        >
          돌아가기
        </button>
      </header>


      {/* 대표 상품 수정 */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>대표 상품</h2>
        </div>

        {products.map((product, index) => (
          <div className={styles.card} key={index}>
            <p className={styles.label}>상품 대표 이미지</p>
            <p className={styles.hint}>상품 이미지를 첨부해주세요</p>

            {/* 미리보기 */}
            {(product.image || product.imageUrl) && (
              <img
                src={product.image ? URL.createObjectURL(product.image) : product.imageUrl}
                alt="product preview"
                className={styles.previewImage}
              />
            )}

            <label htmlFor={`product-image-${index}`} className={styles.fileButton}>파일 첨부</label>
            <input
              type="file"
              id={`product-image-${index}`}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const updated = [...products];
                  updated[index].image = file;
                  updated[index].imageUrl = URL.createObjectURL(file);
                  setProducts(updated);
                }
              }}
            />

            <p className={styles.label}>상품 이름</p>
            <input
              className={styles.input}
              value={product.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="상품 이름을 입력해 주세요."
            />

            <p className={styles.label}>상품 가격</p>
            <input
              className={styles.input}
              type="number"
              value={product.price}
              onChange={(e) => handleChange(index, 'price', e.target.value)}
              placeholder="원화로 표기해 주세요."
            />
          </div>
        ))}
      </section>

      {/* 쇼핑몰 정보 수정 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>내 쇼핑몰</h2>
        <div className={styles.card}>
          <p className={styles.label}>쇼핑몰 대표 이미지</p>
          <p className={styles.hint}>쇼핑몰 이미지를 첨부해주세요</p>

          {/* 쇼핑몰 미리보기 */}
          {(shopInfo.image || shopInfo.imageUrl) && (
            <img
              src={shopInfo.image ? URL.createObjectURL(shopInfo.image) : shopInfo.imageUrl}
              alt="shop preview"
              className={styles.previewImage}
            />
          )}

          <label htmlFor="shop-image" className={styles.fileButton}>파일 첨부</label>
          <input
            type="file"
            id="shop-image"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setShopInfo((prev) => ({
                  ...prev,
                  image: file,
                  imageUrl: URL.createObjectURL(file),
                }));
              }
            }}
          />

          <p className={styles.label}>이름</p>
          <input
            className={styles.input}
            value={shopInfo.name}
            onChange={(e) => setShopInfo({ ...shopInfo, name: e.target.value })}
            placeholder="표시하고 싶은 이름을 적어 주세요"
          />

          <p className={styles.label}>URL</p>
          <input
            className={styles.input}
            value={shopInfo.url}
            onChange={(e) => setShopInfo({ ...shopInfo, url: e.target.value })}
            placeholder="URL을 입력해주세요"
          />

          <p className={styles.label}>유저 ID</p>
          <input
            className={styles.input}
            value={shopInfo.userId}
            onChange={(e) => setShopInfo({ ...shopInfo, userId: e.target.value })}
            placeholder="유저 ID를 입력해주세요"
          />

          <p className={styles.label}>비밀번호</p>
          <input
            className={styles.input}
            value={password}
            disabled
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
      </section>

      {/* 제출 버튼 */}
      <div className={styles.submitWrapper}>
        <button className={styles.submitButton} onClick={handleSubmit}>수정하기</button>
      </div>

      {/* 알림 토스트 & 성공 모달 */}
      <Toast show={showToast} message="수정이 완료되었습니다!" />
      <SuccessModal
        visible={showModal}
        message="수정이 완료되었습니다."
        onClose={() => navigate(`/link/${linkshopId}`)}
      />

      {/* 에러 메시지 */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

