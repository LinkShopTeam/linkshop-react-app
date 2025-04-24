import styles from './SearchNull.module.css';

const SearchNull = () => {
  return (
    <div className={styles.emptyBox}>
      <div className={styles.emptyWrapper}>
        <img className={styles.emptyImage} src='/images/empty.png' />
        <div className={styles.emptyText}>
          <p>검색결과가 없어요</p>
          <p>지금 프로필을 만들고 내 상품을 소개해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default SearchNull;
