// src/components/SuccessModal.jsx
import React from 'react';
import styles from './SuccessModal.module.css';

const SuccessModal = ({ visible, onClose, message = '완료되었습니다.' }) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button className={styles.confirmButton} onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default SuccessModal;
