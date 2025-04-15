import React from 'react';
import './styles/AppMain.css';

export default function AppMain() {
  return (
    <>
      <div className='header'>
        <h1 className='logo'>LINK SHOP</h1>
        <h1>
          <button className='create-button'>생성하기</button>
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
