// src/hooks/useInfiniteScroll.js
//스크롤 하단에 도달하면 자동으로 다음 데이터를 불러오는 훅
import React from 'react';
import { useInView } from 'react-intersection-observer'; //뷰포트 내 감지를 위한 라이브러리

const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetching }) => {
  // ref: 감시할 요소에 연결됨
  // inView: 요소가 화면에 들어오면 true
  const { ref, inView } = useInView({
    threshold: 0, // 0이면 요소가 조금이라도 보이면 감지됨
    rootMargin: '100px', // 화면 하단 100px 전부터 미리 감지 시작 (미리 불러오기용)
  });

  // inView가 true이고(요소가 보이고), 다음 페이지가 있고, 현재 로딩 중이 아닐 때
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage(); // 다음 페이지 요청
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);
  // console.log('fetchMoreShops() 호출!');
  return { ref };
};

export default useInfiniteScroll;
