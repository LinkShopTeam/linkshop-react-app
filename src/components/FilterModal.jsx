// src/components/FilterModal.jsx
import React from 'react';
import './FilterModal.css';

export default function FilterModal({ orderBy, setOrderBy, setShowFilter }) {
  const options = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'likes' },
    { label: '등록된 상품순', value: 'productsCount' },
  ];

  const handleSelect = (value) => {
    setOrderBy(value);
    setShowFilter(false);
  };

  return (
    <div className='modal-overlay' onClick={() => setShowFilter(false)}>
      <div className='modal-box' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <div className='modal-title'>정렬</div>
          <button className='modal-close' onClick={() => setShowFilter(false)}>
            ✕
          </button>
        </div>
        {options.map((option) => (
          <div
            key={option.value}
            className={`modal-option ${orderBy === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option.value)}
          >
            <span>{option.label}</span>
            {orderBy === option.value && <span className='check'>✔</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
