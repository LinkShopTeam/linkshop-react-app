// src/api/linkShopApi.js
const teamId = '15-8'; // teamId를 고정값으로 설정
const baseUrl = `https://linkshop-api.vercel.app/${teamId}/linkshops`;

// 링크샵 상세 정보 가져오기
export const fetchLinkShopDetail = async (linkShopId) => {
  const response = await fetch(`https://linkshop-api.vercel.app/${teamId}/linkshops/${linkShopId}`);

  // 404 에러 처리
  if (response.status === 404) {
    throw new Error('존재하지 않는 링크샵입니다.');
  }

  // 그 외의 에러 처리
  if (!response.ok) {
    throw new Error('상세 정보를 불러오지 못했습니다.');
  }

  return response.json();
};

export const getLinkShopList = async (keyword = '', orderBy = 'recent') => {
  console.log(orderBy);
  const url = `${baseUrl}?keyword=${encodeURIComponent(keyword)}&orderBy=${orderBy}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('링크샵 리스트 요청 실패');
  }

  const data = await response.json();
  return data.list;
};
