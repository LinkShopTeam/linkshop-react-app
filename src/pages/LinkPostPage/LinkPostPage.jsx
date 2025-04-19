import React from 'react';
import styles from './LinkPostPage.module.css';

const LinkPostPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <h1 className={styles.logo}>LINK SHOP</h1>
        <button className={styles.backButton}>돌아가기</button>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>대표 상품</h2>
          <button className={styles.addButton}>추가</button>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>상품 대표 이미지</p>
          <p className={styles.hint}>상품 이미지를 첨부해주세요</p>
          <p className={styles.label}>상품 이름</p>
          <p className={styles.hint}>상품 이름을 입력해 주세요.</p>
          <p className={styles.label}>상품 가격</p>
          <p className={styles.hint}>원화로 표기해 주세요.</p>
          <button className={styles.uploadButton}>파일 첨부</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>내 쇼핑몰</h2>
        <div className={styles.card}>
          <p className={styles.label}>상품 대표 이미지</p>
          <p className={styles.hint}>상품 이미지를 첨부해주세요</p>
          <p className={styles.label}>이름</p>
          <p className={styles.hint}>표시하고 싶은 이름을 적어 주세요</p>
          <p className={styles.label}>Url</p>
          <p className={styles.hint}>Url을 입력해주세요</p>
          <p className={styles.label}>유저 ID</p>
          <p className={styles.hint}>유저 ID를 입력해주세요</p>
          <p className={styles.label}>비밀번호</p>
          <p className={styles.hint}>비밀번호를 입력해주세요.</p>
          <button className={styles.uploadButton}>파일 첨부</button>
        </div>
      </section>

      <div className={styles.submitWrapper}>
        <button className={styles.submitButton}>수정하기</button>
      </div>
    </div>
  );
};

export default LinkDetailPage;
