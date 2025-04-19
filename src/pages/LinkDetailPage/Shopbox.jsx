import React, { useState } from 'react';
import styles from './ShopBox.module.css';
import profile1 from '/images/profile1.png';

export default function ShopBox({ likes, img, alt, name, userId, href }) {
  const [imgSrc, setImgSrc] = useState(img);

  const handleError = () => {
    setImgSrc(profile1); // 이미지 깨지면 교체
  };

  // 공유하기
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(href);
      alert('링크가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible); // 드롭다운 토글
  };

  return (
    <div className={styles.shopBox}>
      <div className={styles.icons}>
        <div className={styles.likes}>
          <img src='/icons/status=fill.png' className={styles.icon}></img>
          {likes}
        </div>
        {/* TODO: 좋아요 구현 */}
        <div className={styles.rightIcons}>
          <div onClick={handleCopyUrl}>
            <img src='/icons/share.png' className={styles.icon}></img>
          </div>
          <div onClick={toggleDropdown} className={styles.meatballIconWrapper}>
            <img src='/icons/meatball.png' className={styles.icon}></img>
            {/* 드롭다운 메뉴 */}
            {isDropdownVisible && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem}>수정하기</button>
                {/* TODO: 수정하기 구현 */}
                <button className={styles.dropdownItemBottom}>삭제하기</button>
                {/* TODO: 삭제하기 구현 */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <img src={imgSrc} alt={alt} onError={handleError} className={styles.image} />
        <div className={styles.name}>{name}</div>
        <div className={styles.userId}>@{userId}</div>
      </div>
    </div>
  );
}
