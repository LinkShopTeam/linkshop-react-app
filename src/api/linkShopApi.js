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

// 커서 기반 링크샵 목록 API
export const getLinkShopList = async ({ cursor = null, keyword = '' }) => {
  const query = new URLSearchParams();
  if (cursor) query.append('cursor', cursor); // 다음 페이지를 요청할 때 필요한 커서
  if (keyword) query.append('keyword', keyword); // 검색어가 있을 경우 추가
  // 요청
  const response = await fetch(`${baseUrl}?${query.toString()}`);
  // 에러 처리
  if (!response.ok) {
    throw new Error('링크샵 목록을 불러오지 못했습니다.');
  }
  //파싱
  const data = await response.json();

  return {
    list: data.list, // 링크샵 배열
    nextCursor: data.nextCursor, // 다음 요청에 사용할 커서 (null이면 끝)
  };
};
