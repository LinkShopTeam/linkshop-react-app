import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ show }) => {
  return (
    <div className={`${styles.toast} ${show ? styles.visible : ''}`}>
      등록 완료!
    </div>
  );
};

export default Toast;
