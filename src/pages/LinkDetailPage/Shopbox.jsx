import React, { useState } from 'react';
import styles from './Shopbox.module.css';
import profile1 from '/images/profile1.png';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';
import ConfirmUpdateModal from '../../components/modal/ConfirmUpdateModal';
import {
  deleteLinkShop,
  fetchLinkShopDetail,
  validateLinkShopPassword,
  likeLinkShop,
} from '../../api/linkShopApi';

export default function ShopBox({ likes, img, alt, name, userId, href }) {
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState(img);

  const { linkshopId } = useParams();

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

  // 수정하기 모달
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  const handleUpdateClick = () => {
    setShowUpdateConfirm(true);
  };

  const handleUpdateConfirm = async (password) => {
    try {
      // 현재 데이터를 먼저 가져옴
      const existingData = await fetchLinkShopDetail(linkshopId);

      // no-op PUT 요청으로 비밀번호 검증
      await validateLinkShopPassword(linkshopId, password, existingData);

      // 비밀번호 유효하면 수정 페이지로 이동
      navigate(`/linkpost/${linkshopId}/edit}`, {
        state: { password },
      });

      setShowUpdateConfirm(false);
    } catch (err) {
      alert(err.message); // 비밀번호 틀림 or 기타 오류
    }
  };

  // 삭제하기 모달
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (password) => {
    try {
      await deleteLinkShop(linkshopId, password);
      alert('삭제되었습니다.');
      navigate('/list'); // 리스트로 이동
    } catch (err) {
      alert(err.message); // 실패 메시지 출력
    }
  };

  // 좋아요
  const [clickedLikes, setclickedLikes] = useState(likes); // 처음 props로 받은 likes

  const handleLikeClick = async () => {
    if (!linkshopId) return;

    try {
      const message = await likeLinkShop(Number(linkshopId));
      alert(message); // 예: "좋아요 성공"

      // 좋아요 수를 직접 +1
      setclickedLikes((prev) => prev + 1);
    } catch (err) {
      alert('좋아요 실패: ' + err.message);
    }
  };

  return (
    <div className={styles.shopBox}>
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {showUpdateConfirm && (
        <ConfirmUpdateModal
          onClose={() => setShowUpdateConfirm(false)}
          onConfirm={handleUpdateConfirm}
        />
      )}

      <div className={styles.icons}>
        {/* 좋아요 */}
        <div className={styles.likes} onClick={handleLikeClick}>
          <img src='/icons/status=fill.png' className={styles.icon}></img>
          {clickedLikes}
        </div>
        <div className={styles.rightIcons}>
          <div onClick={handleCopyUrl}>
            <img src='/icons/share.png' className={styles.icon}></img>
          </div>
          <div onClick={toggleDropdown} className={styles.meatballIconWrapper}>
            <img src='/icons/meatball.png' className={styles.icon}></img>
            {/* 드롭다운 메뉴 */}
            {isDropdownVisible && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem} onClick={handleUpdateClick}>
                  수정하기
                </button>
                <button className={styles.dropdownItemBottom} onClick={handleDeleteClick}>
                  삭제하기
                </button>
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
