import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLinkShopDetail } from '../../api/linkShopApi';
import { Spinner } from '../../components/spinner/Spinner';
import ProductImage from '../../components/productimage/ProductImage';
import styles from './LinkDetailPage.module.css';
import Shopbox from './Shopbox';
import { useNavigate } from 'react-router-dom';
import RoofPattern from '../../components/roofpattern/RoofPattern';

function LinkDetailPage() {
  const { linkshopId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/list');
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchLinkShopDetail(linkshopId); // API 호출
        setData(result); // 성공 시 데이터 저장
        console.log(result);
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        setError(error.message); // 에러 발생 시 에러 메시지 설정
        setIsLoading(false); // 로딩 완료
      }
    };

    if (linkshopId) {
      fetchData(); // linkshopId가 있을 때만 호출
    }
  }, [linkshopId]); // linkshopId가 변경될 때마다 다시 호출

  // 로딩 중일 때
  if (isLoading) return <Spinner />;

  // 에러 발생 시
  if (error) return <p>{error}</p>;

  // 데이터가 정상적으로 로드되었을 때
  return (
    <>
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/reset-css@4.0.1/reset.min.css' />
      {/* 지붕 부분 */}
      <RoofPattern />

      <div className={styles.pageWrapper}>
        <div className={styles.back} onClick={handleClick}>
          <img src='/icons/back.png' alt='back' width={16} height={16} />
          돌아가기
        </div>

        {/* 컴포넌트에 api 데이터들을 넘겨주어 샵 정보 렌더링 */}
        <Shopbox
          likes={data.likes}
          img={data.shop.imageUrl}
          alt={data.shop.urlName}
          name={data.name}
          userId={data.userId}
          urlName={data.shop.urlName}
          href={data.shop.shopUrl}
        />

        <div className={styles.productsWrapper}>
          <div className={styles.productsTitle}>대표 상품</div>
          <div className={styles.products}>
            {/* api로 받아온 상품들 리스트를 map으로 렌더링 */}
            {data.products.map((product) => (
              <div className={styles.product} key={product.id}>
                {/* 이미지 (없을 경우 회색 배경) */}
                <ProductImage
                  className={styles.productImage}
                  imageUrl={product.imageUrl}
                  alt={product.name}
                  width={95}
                  height={95}
                />
                <div className={styles.productInfo}>
                  {/* 상품명 */}
                  <p className={styles.productName}>{product.name}</p>
                  {/* 가격은 toLocaleString을 통해 쉼표 표시 */}
                  <p className={styles.productPrice}>₩{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LinkDetailPage;
