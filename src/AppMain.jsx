import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLinkShopList } from './api/linkShopApi';
import FilterModal from './components/FilterModal';
import LinkCard from './components/LinkCard';
import SearchNull from './components/SearchNull';
import './styles/AppMain.css';

export default function AppMain() {
  const [showFilter, setShowFilter] = useState(false);
  const [orderBy, setOrderBy] = useState('recent');
  const [linkShoplist, setLinkShopList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/list');
  };

  const handleCreateClick = () => {
    navigate('/linkpost');
  };

  const handleLinkShopList = async () => {
    const result = await getLinkShopList(keyword, orderBy);
    setLinkShopList(result || []);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setHasSearched(true);
    setKeyword(event.target['keyword'].value);
  };

  useEffect(() => {
    handleLinkShopList();
  }, [keyword, orderBy]); // 🔁 정렬 기준 바뀔 때마다 호출됨

  return (
    <>
      <div className='header'>
        <h1 className='logo' onClick={handleLogoClick}>
          LINK SHOP
        </h1>
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
            onChange={handleKeywordChange}
            className='input'
            type='text'
            placeholder='샵 이름으로 검색해 보세요.'
          />
        </div>
      </form>

      <div className='filter'>
        <span className='filter-detail' onClick={() => setShowFilter(true)}>
          상세필터
          <img className='filter-button' src='/images/filter.png' alt='필터 아이콘' />
        </span>
      </div>

      {showFilter && (
        <FilterModal orderBy={orderBy} setOrderBy={setOrderBy} setShowFilter={setShowFilter} />
      )}

      <main className='main-container'>
        {linkShoplist?.length > 0
          ? linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
          : hasSearched && <SearchNull />}
      </main>
    </>
  );
}
