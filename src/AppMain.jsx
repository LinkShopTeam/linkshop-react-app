import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AppMain.css';
import { useEffect, useState } from 'react';
import SearchNull from './components/SearchNull';
import { getLinkShopList } from './api/linkShopApi';
import LinkCard from './components/LinkCard';

export default function AppMain() {
  // useState 훅을 사용하여 상태 관리
  const [linkShoplist, setLinkShopList] = useState([]);

  // 검색어를 저장할 상태 변수
  const [keyword, setKeyword] = useState('');

  // 검색 결과를 보여줄지 여부를 저장할 상태 변수
  // hasSearched는 검색어가 입력되었는지 여부를 나타냄
  const [hasSearched, setHasSearched] = useState(false);

  // 리액트 라우터의 navigate 함수 가져오기
  const navigate = useNavigate();

  // 로고 클릭 → /list로 이동
  const handleLogoClick = () => {
    navigate('/list');
  };

  // 생성하기 버튼 클릭 → /linkpost로 이동
  const handleCreateClick = () => {
    navigate('/linkpost');
  };

  // 검색 결과를 가져오는 함수
  // keyword가 바뀔 때마다 호출되도록 설정
  const handleLinkShopList = async () => {
    const result = await getLinkShopList(keyword);
    setLinkShopList(result);
  };

  // 검색어가 바뀔 때마다 getLinkShopList 호출
  const handleKewordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 검색 폼 제출 처리
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // 폼의 기본 동작(새로고침) 방지

    const term = keyword.trim().toLowerCase();
    if (!term) return; // 빈 문자열이면 검색 중단

    setHasSearched(true); // 검색 실행 플래그 설정

    const result = await getLinkShopList(term); // API로 검색 결과 가져오기
    const filtered = result.filter((shop) => shop.name.toLowerCase().includes(term)); //API가 부분 매칭을 지원하지 않을 경우, 클라이언트 필터링

    // 필터링된 결과를 상태에 저장
    setLinkShopList(filtered);

    // 검색 후에도 input 창에 키워드를 유지
    setKeyword(term);
  };

  // 컴포넌트가 마운트될 때 handleLinkShopList 호출
  useEffect(() => {
    handleLinkShopList();
  }, []);

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
          // 검색 전: 전체 리스트 혹은 기본 안내문구
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
      </main>
    </>
  );
}
