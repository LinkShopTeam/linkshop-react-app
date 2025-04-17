// src/api/linkShopApi.js

const teamId = '15-8'; // teamId를 고정값으로 설정

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
