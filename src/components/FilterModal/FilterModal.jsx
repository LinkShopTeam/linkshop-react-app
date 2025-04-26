import React from 'react';
import styles from './FilterModal.module.css';

export default function FilterModal({ orderBy, setOrderBy, setShowFilter }) {
  const options = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'likes' },
    { label: '등록된 상품순', value: 'productsCount' },
  ];

  // 정렬 버튼을 눌렀을 떄 값 바꾸기
  const handleSelect = (value) => {
    setOrderBy(value); // 선택한 값을 저장하고
    setShowFilter(false); // 모달창을 닫아준다
  };

  return (
    // 화면 전체를 덮는 반투명 검정 배경
    <div className={styles.overlay} onClick={() => setShowFilter(false)}>
      {/* 흰색 박스(필터창). 화면 가운데 뜬다 */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* 박스를 클릭해도 배경처럼 닫히지 않게 막는다 */}

        <div className={styles.title}>
          정렬
          <button className={styles.button} onClick={() => setShowFilter(false)}>
            <img src='/public/images/close.png' />
          </button>
        </div>

        {/* 이제 옵션을 하나씩 보여준다 */}
        {options.map((option) => (
          // option 하나는 예를 들면 '최신순' 같은것
          <div
            key={option.value} // React가 구분할 수 있게 하는 고유값
            className={`
            ${styles.option} 
            ${orderBy === option.value ? styles.selected : ''}
            `} // 내가 선택한 정렬이면 빨간 글씨로 보여줘
            onClick={() => handleSelect(option.value)}
            // 누르면 정렬 바꾸고 창 닫아
          >
            {/* 실제로 보이는 글자: 최신순, 좋아요순 등 */}
            {option.label}
            {/* ✔ 선택한 항목이면 오른쪽에 체크 표시! */}
            {orderBy === option.value && <span>✔</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
