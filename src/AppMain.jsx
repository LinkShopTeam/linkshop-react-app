import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AppMain.css';
import { useEffect, useState } from 'react';
import SearchNull from './components/SearchNull';

export default function AppMain() {
  // useState 훅을 사용하여 상태 관리
  const [linkShoplist, setLinkShopList] = useState([]);

  // 검색어를 저장할 상태 변수
  const [keyword, setKeyword] = useState('');

  // 검색 결과를 보여줄지 여부를 저장할 상태 변수
  // hasSearched는 검색어가 입력되었는지 여부를 나타냄
  const [hasSearched, setHasSearched] = useState(false);

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
  const getLinkShopList = async () => {
    const response = await fetch(
      `http://linkshop-api.vercel.app/15-8/linkshops?keyword=${keyword}`,
    );
    const data = await response.json();
    setLinkShopList(data);
  };

  // 검색어가 바뀔 때마다 getLinkShopList 호출
  const handleKewordChange = (event) => {
    setKeyword(event.target.value);
  };

  // form의 submit 이벤트를 처리하는 함수
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setHasSearched(true);
    setKeyword(event.target['keyword'].value);
  };

  // 컴포넌트가 마운트될 때 getLinkShopList 호출
  useEffect(() => {
    getLinkShopList();
  }, []);

  return (
    <>
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

      <div className='filter'>
        <span className='filter-detail'>
          상세필터
          <img className='filter-button' src='/images/filter.png' />
        </span>
      </div>

      {/* 조건부 렌더링 */}
      {!hasSearched ? (
        <div>카드를 보여주세요</div>
      ) : linkShoplist?.length > 0 ? (
        <div>카드를 보여주세요</div>
      ) : (
        <div>
          {/* 검색 결과가 없을 때 보여줄 component */}
          <SearchNull />
        </div>
      )}
    </>
  );
}
