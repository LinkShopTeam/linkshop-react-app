// React에서 컴포넌트를 만들기 위해 필요한 기능을 불러와요
import React from 'react';
// CSS 모듈을 불러와서 스타일을 적용할 수 있게 해줘요
import styles from '../styles/Header.css';

// Header 컴포넌트를 만들어요
export default function Header() {
  // 로고를 클릭했을 때 /list 페이지로 이동하는 함수예요
  const goToList = () => {
    window.location.href = '/list';
  };

  // '생성하기' 버튼을 클릭하면 /linkpost 페이지로 이동해요
  const goToCreate = () => {
    window.location.href = '/linkpost';
  };

  // 실제로 화면에 보여질 내용이에요
  return (
    <header className={styles.header}>
      {/* 위쪽 줄: 로고 + 생성하기 버튼 */}
      <div className={styles.topRow}>
        {/* 로고 텍스트, 클릭하면 리스트 페이지로 이동 */}
        <h1 className={styles.logo} onClick={goToList}>
          LINK SHOP
        </h1>

        {/* '생성하기' 버튼, 클릭하면 링크 생성 페이지로 이동 */}
        <button className={styles.button} onClick={goToCreate}>
          생성하기
        </button>
      </div>

      {/* 아래쪽 줄: 검색창 */}
      <div className={styles.searchBox}>
        {/* 돋보기 아이콘 (텍스트 대신 이모지 사용) */}
        <span className={styles.searchIcon}>🔍</span>

        {/* 입력창 - 사용자가 샵 이름을 검색할 수 있어요 */}
        <input type='text' className={styles.input} placeholder='샵 이름으로 검색해 보세요.' />
      </div>
    </header>
  );
}
