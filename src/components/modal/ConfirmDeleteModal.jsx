import React, { useState } from 'react';
import styles from './Modal.module.css';

export default function ConfirmDeleteModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState('');

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p>정말 삭제하시겠습니까?</p>
        <input
          type='password'
          placeholder='비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancel}>
            취소
          </button>
          <button onClick={() => onConfirm(password)} className={styles.confirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
