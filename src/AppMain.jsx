import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AppMain.css';

export default function AppMain() {
  const navigate = useNavigate();

  // 로고 클릭 → /list로 이동
  const handleLogoClick = () => {
    navigate('/list');
  };

  // 생성하기 버튼 클릭 → /linkpost로 이동
  const handleCreateClick = () => {
    navigate('/linkpost');
  };

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

      <div className='search-box'>
        <img className='search' src='/images/search.svg' />
        <input className='input' type='text' placeholder='샵 이름으로 검색해 보세요.' />
      </div>

      <div className='filter'>
        <span className='filter-detail'>
          상세필터
          <img className='filter-button' src='/images/filter.png' />
        </span>
      </div>
    </>
  );
}
