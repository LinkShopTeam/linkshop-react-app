import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLinkShopDetail } from '../../api/linkShopApi';
import { Spinner } from '../../components/Spinner';
import styles from './LinkDetailPage.module.css';
import Shopbox from './Shopbox';

function LinkDetailPage() {
  const { linkshopId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className={styles.pageWrapper}>
      <Shopbox
        likes={data.likes}
        img={data.shop.imageUrl}
        alt={data.shop.urlName}
        name={data.name}
        userId={data.userId}
        urlName={data.shop.urlName}
        href={data.shop.shopUrl}
      />
      <h1>{data.name}</h1>
      <p>사용자 ID: {data.userId}</p>
      <p>좋아요 수: {data.likes}</p>

      <h2>쇼핑몰 정보</h2>
      <div>
        <img src={data.shop.imageUrl} alt={data.shop.urlName} width={100} />
        <p>쇼핑몰 이름: {data.shop.urlName}</p>
        <a href={data.shop.shopUrl} target='_blank' rel='noopener noreferrer'>
          쇼핑몰 방문
        </a>
      </div>

      <h2>제품</h2>
      <div>
        {data.products.map((product) => (
          <div key={product.id}>
            <img src={product.imageUrl} alt={product.name} width={100} />
            <p>제품 이름: {product.name}</p>
            <p>가격: {product.price} 원</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkDetailPage;
