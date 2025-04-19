import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLinkShopList } from './api/linkShopApi';
import FilterModal from './components/FilterModal';
import LinkCard from './components/LinkCard';
import SearchNull from './components/SearchNull';
import styles from './styles/AppMain.module.css'; // ← 모듈 스타일로 불러옴

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
  }, [keyword, orderBy]);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.logo} onClick={handleLogoClick}>
          LINK SHOP
        </h1>
        <h1>
          <button className={styles['create-button']} onClick={handleCreateClick}>
            생성하기
          </button>
        </h1>
      </div>

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

      <div className={styles.filter}>
        <span className={styles['filter-detail']} onClick={() => setShowFilter(true)}>
          상세필터
          <img className={styles['filter-button']} src='/images/filter.png' alt='필터 아이콘' />
        </span>
      </div>

      {showFilter && (
        <FilterModal orderBy={orderBy} setOrderBy={setOrderBy} setShowFilter={setShowFilter} />
      )}

      <main className={styles['main-container']}>
        {linkShoplist?.length > 0
          ? linkShoplist.map((shop) => <LinkCard key={shop.id} data={shop} />)
          : hasSearched && <SearchNull />}
      </main>
    </>
  );
}
