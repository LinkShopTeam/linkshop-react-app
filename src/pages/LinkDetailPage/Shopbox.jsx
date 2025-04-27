import React, { useState } from 'react';
import styles from './Shopbox.module.css';
import profile1 from '/images/profile1.png';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../../components/modal/ConfirmDeleteModal';
import ConfirmUpdateModal from '../../components/modal/ConfirmUpdateModal';
import {
  deleteLinkShop,
  fetchLinkShopDetail,
  validateLinkShopPassword,
} from '../../api/linkShopApi';

export default function ShopBox({ likes, img, alt, name, userId, href, urlName }) {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(img);
  const { linkshopId } = useParams();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleError = () => setImgSrc(profile1);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(href);
      alert('링크가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleUpdateClick = () => {
    setShowUpdateConfirm(true);
  };

  const handleUpdateConfirm = async (password) => {
    try {
      const existingData = await fetchLinkShopDetail(linkshopId);
      await validateLinkShopPassword(linkshopId, password, existingData);
      navigate(`/linkpost/${linkshopId}/edit`, {
        state: { password },
      });
      setShowUpdateConfirm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (password) => {
    try {
      await deleteLinkShop(linkshopId, password);
      alert('삭제되었습니다.');
      navigate('/list');
    } catch (err) {
      alert('삭제 실패: ' + err.message);
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
        <div className={styles.likes}>
          <img src='/icons/status=fill.png' className={styles.icon} />
          {likes}
        </div>
        <div className={styles.rightIcons}>
          <div onClick={handleCopyUrl}>
            <img src='/icons/share.png' className={styles.icon} />
          </div>
          <div onClick={toggleDropdown} className={styles.meatballIconWrapper}>
            <img src='/icons/meatball.png' className={styles.icon} />
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
