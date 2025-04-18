import '../styles/SearchNull.css';

const SearchNull = () => {
  return (
    <div className='empty-box'>
      <div className='empty-wrapper'>
        <img className='empty-image' src='/images/empty.png' />
        <div className='empty-text'>
          <p>검색결과가 없어요</p>
          <p>지금 프로필을 만들고 내 상품을 소개해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default SearchNull;
