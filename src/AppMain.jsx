import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AppMain.css';
import { useEffect, useState } from 'react';
import SearchNull from './components/SearchNull';
import { getLinkShopList } from './api/linkShopApi';
import LinkCard from './components/LinkCard';
import useInfiniteScroll from './hooks/useInfiniteScroll';

export default function AppMain() {
  const [linkShoplist, setLinkShopList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialShops();
  }, []);

  const handleLogoClick = () => {
    navigate('/list');
  };

  const handleCreateClick = () => {
    navigate('/linkpost');
  };

  // 처음 데이터 요청(초기 로딩 또는 검색 시 사용됨)
  const fetchInitialShops = async (customKeyword = keyword) => {
    try {
      setIsFetching(true);
      const res = await getLinkShopList({ keyword: customKeyword });
      setLinkShopList(res.list);
      setCursor(res.nextCursor);
      setHasNextPage(res.nextCursor !== null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  // 무한스크롤 감지될 때 다음 페이지 로드
  const fetchMoreShops = async () => {
    if (!hasNextPage || isFetching) return; //이미 로딩 중이거나 끝이라면 중단
    try {
      setIsFetching(true);
      const res = await getLinkShopList({ cursor, keyword });
      setLinkShopList((prev) => [...prev, ...res.list]); // 기존 리스트에 추가
      setCursor(res.nextCursor); //커서 업데이트
      setHasNextPage(res.nextCursor !== null); // 다음 페이지 여부 업데이트
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };
  // 무한스크롤 훅 사용: 감지되면 fetchMoreShops 자동 실행
  const { ref: infiniteScrollRef } = useInfiniteScroll({
    fetchNextPage: fetchMoreShops,
    hasNextPage,
    isFetching,
  });

  // 검색어 입력 시 상태 업데이트
  const handleKewordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 검색 폼 제출 처리
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 동작(새로고침) 방지

    const term = keyword.trim().toLowerCase();
    if (!term) return; // 빈 문자열이면 검색 중단

    setHasSearched(true);
    setLinkShopList([]); // 기존 리스트 초기화
    setCursor(null); // 커서 초기화
    setHasNextPage(true); //  페이징 초기화
    await fetchInitialShops(term); // 검색어로 다시 fetch
  };

  return (
    <>
      {/* 헤더 영역: 로고와 생성하기 버튼 */}
      <div className='header'>
        {/* 로고 클릭 시 /list 이동 */}
        <h1 className='logo' onClick={handleLogoClick}>
          LINK SHOP
        </h1>
        {/* 생성하기 버튼 클릭시 /linkpost로 이동 */}
        <h1>
          <button className='create-button' onClick={handleCreateClick}>
            생성하기
          </button>
        </h1>
      </div>

      {/* 검색 폼 */}
      <form onSubmit={handleSearchSubmit}>
        <div className='search-box'>
          <img className='search' src='/images/search.svg' />
          <input
            name='keyword'
            value={keyword}
            onChange={handleKewordChange}
            className='input'
            type='text'
            placeholder='샵 이름으로 검색해 보세요.'
          />
        </div>
      </form>

      {/* 상세 필터 UI (추가 기능 가능) */}
      <div className='filter'>
        <span className='filter-detail'>
          상세필터
          <img className='filter-button' src='/images/filter.png' />
        </span>
      </div>

      {/* 메인 컨텐츠: 검색 전/후, 결과 유무에 따른 조건부 렌더링 */}
      <main className='main-container'>
        {!hasSearched ? (
          // 검색 전: 전체 리스트
          linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
        ) : linkShoplist.length > 0 ? (
          // 검색 후 결과 있음
          linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
        ) : (
          // 검색 후 결과 없음
          <div className='search-null'>
            <SearchNull />
          </div>
        )}
        {/* 무한스크롤 트리거 역할 */}
        {/* hasNextPage가 true일때만 렌더링됨 (= 더 불러올 데이터가 있을때만) */}
        {/* useInfiniteScroll 훅에서 fetchMoreShops(다음페이지요청) 실행됨 */}
        {hasNextPage && <div ref={infiniteScrollRef} style={{ height: '20px' }} />}
      </main>
    </>
  );
}
