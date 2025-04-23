//src/api/linkShopApi.js
const teamId = '15-8'; // teamId를 고정값으로 설정
const baseUrl = `https://linkshop-api.vercel.app/${teamId}/linkshops`;

export const fetchLinkShopDetail = async (linkShopId) => {
  const response = await fetch(`${baseUrl}/${linkShopId}`);

  // 404 에러 처리
  if (response.status === 404) {
    throw new Error('존재하지 않는 링크샵입니다.');
  }

  // 그 외의 에러 처리
  if (!response.ok) {
    throw new Error('상세 정보를 불러오지 못했습니다.');
  }
};

export const getLinkShopList = async ({ cursor = null, keyword = '', orderBy = '' }) => {
  const query = new URLSearchParams();

  if (cursor) query.append('cursor', cursor); // 🔁 무한스크롤용
  if (keyword) query.append('keyword', keyword); // 🔍 검색어
  if (orderBy) query.append('orderBy', orderBy); // 🧭 정렬 조건

  const response = await fetch(`${baseUrl}?${query.toString()}`);

  if (!response.ok) {
    throw new Error('링크샵 목록을 불러오지 못했습니다.');
  }

  const data = await response.json();

  return {
    list: data.list,
    nextCursor: data.nextCursor, // 무한스크롤에서 다음 요청 시 사용
  };
};
