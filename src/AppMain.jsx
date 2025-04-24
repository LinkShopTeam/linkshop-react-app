import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLinkShopList } from './api/linkShopApi';
import FilterModal from './components/FilterModal';
import LinkCard from './components/LinkCard/LinkCard';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import styles from './styles/AppMain.module.css';
import SearchNull from './components/SearchNull';

export default function AppMain() {
  // useState 훅을 사용하여 상태 관리
  const [linkShoplist, setLinkShopList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [orderBy, setOrderBy] = useState('recent'); // 기본 정렬 기준

  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialShops();
  }, [orderBy]);

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
      const res = await getLinkShopList({ keyword: customKeyword, orderBy });
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

  // 검색 결과를 가져오는 함수
  // keyword가 바뀔 때마다 호출되도록 설정
  const handleLinkShopList = async () => {
    const result = await getLinkShopList({ keyword });
    setLinkShopList(result.list); // 이렇게 수정!!
  };

  // 검색어가 바뀔 때마다 getLinkShopList 호출
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 검색어 전처리 함수: 공백 제거 + 소문자 변환
  const validateKeyword = (raw) => {
    return raw.trim().toLowerCase();
  };

  // 검색어가 비어있는지 확인
  const isKeywordEmpty = (term) => {
    return term.length === 0;
  };

  // 검색 전 상태 초기화: 리스트, 커서, 로딩 등 리셋
  const resetSearchState = () => {
    setLinkShopList([]);
    setCursor(null);
    setHasNextPage(true);
    setIsFetching(true);
  };

  // 서버에서 데이터 받아와서 상태 설정
  const fetchAndSetLinkList = async (term) => {
    try {
      const result = await getLinkShopList({ keyword: term }); // API로 검색 결과 가져오기
      setLinkShopList(result.list);
      setCursor(result.nextCursor);
      setHasNextPage(result.nextCursor !== null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  // 검색 폼 제출 처리
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 동작(새로고침) 방지

    const term = validateKeyword(keyword); // // 검색어 전처리

    if (isKeywordEmpty(term)) {
      // 검색어가 비어 있다면
      setHasSearched(false); // 검색하지 않은 상태로 표시
      await fetchInitialShops(''); // 전체 목록 요청
      return; // 빈 문자열이면 검색 중단
    }

    setHasSearched(true); // 검색 실행됨 표시
    resetSearchState(); // 상태 초기화
    await fetchAndSetLinkList(term); // 검색 결과 요청
  };

  // 컴포넌트가 마운트될 때 handleLinkShopList 호출
  useEffect(() => {
    handleLinkShopList();
  }, []);

  return (
    <>
      {/* 헤더 영역: 로고와 생성하기 버튼 */}
      <div className={styles.header}>
        {/* 로고 클릭 시 /list 이동 */}
        <h1 className={styles.logo} onClick={handleLogoClick}>
          LINK SHOP
        </h1>
        {/* 생성하기 버튼 클릭시 /linkpost로 이동 */}
        <h1>
          <button className={styles['create-button']} onClick={handleCreateClick}>
            생성하기
          </button>
        </h1>
      </div>

      {/* 검색 폼 */}
      <form onSubmit={handleSearchSubmit}>
        <div className={styles['search-box']}>
          <img className={styles.search} src='/images/search.svg' alt='검색 아이콘' />
          <input
            name='keyword'
            value={keyword}
            onChange={handleKeywordChange}
            className={styles.input}
            type='text'
            placeholder='샵 이름으로 검색해 보세요.'
          />
        </div>
      </form>

      {/* 상세 필터 UI (추가 기능 가능) */}
      <div className={styles.filter}>
        <span
          className={styles['filter-detail']}
          onClick={() => setShowFilter(true)} // 클릭하면 모달 오픈
        >
          상세필터
          <img className={styles['filter-button']} src='/images/filter.png' alt='필터 아이콘' />
        </span>
      </div>

      {/* 상세필터모달 렌더링 */}
      {showFilter && (
        <FilterModal orderBy={orderBy} setOrderBy={setOrderBy} setShowFilter={setShowFilter} />
      )}

      {/* 메인 컨텐츠: 검색 전/후, 결과 유무에 따른 조건부 렌더링 */}
      <main className={styles['main-container']}>
        {!hasSearched ? (
          // 검색 전: 전체 리스트
          linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
        ) : linkShoplist.length > 0 ? (
          // 검색 후 결과 있음
          linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
        ) : (
          // 검색 후 결과 없음
          <div className={styles['search-null']}>
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
