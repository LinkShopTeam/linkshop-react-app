import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Shopbox.module.css';
import profile1 from '/images/profile1.png';

export default function Shopbox({ likes, img, alt, name, userId, urlName, href }) {
  const [imgSrc, setImgSrc] = useState(img);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const { linkshopId } = useParams(); // assumes route like /link/:linkshopId

  const handleError = () => setImgSrc(profile1);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handlePasswordConfirm = async () => {
    try {
      const res = await fetch(`https://linkshop-api.vercel.app/15-8/linkshops/${linkshopId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: inputPassword,
          name: name,
          userId: userId,
          products: [],
          shop: {
            shopUrl: href,
            imageUrl: img,
            urlName: urlName,
          },
        }),
      });

      if (!res.ok) throw new Error('Incorrect password');

      navigate(`/linkpost/${linkshopId}/edit`, {
        state: { currentPassword: inputPassword },
      });
    } catch (err) {
      setPasswordError('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className={styles.shopBox}>
      <div className={styles.icons}>
        <div className={styles.likes}>
          <img src="/icons/status=fill.png" className={styles.icon} />
          {likes}
        </div>

        <div className={styles.rightIcons}>
          <div onClick={() => {
            navigator.clipboard.writeText(href);
            alert('링크가 복사되었습니다.');
          }}>
            <img src="/icons/share.png" className={styles.icon} />
          </div>

          <div onClick={toggleDropdown} className={styles.meatballIconWrapper}>
            <img src="/icons/meatball.png" className={styles.icon} />
            {isDropdownVisible && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem} onClick={() => {
                  setShowPasswordModal(true);
                  setIsDropdownVisible(false);
                }}>
                  수정하기
                </button>
                <button className={styles.dropdownItemBottom}>삭제하기</button>
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

      {showPasswordModal && (
        <div className={styles.modal}>
          <h3>정말 수정하시겠습니까?</h3>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <div className={styles.modalButtons}>
            <button className={styles.cancelButton} onClick={() => {
              setShowPasswordModal(false);
              setInputPassword('');
              setPasswordError('');
            }}>
              취소
            </button>
            <button className={styles.confirmButton} onClick={handlePasswordConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
