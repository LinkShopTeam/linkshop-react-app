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

  return response.json();
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

export const createLinkShop = async ({ shopInfo, mainProducts }) => {
  const formData = new FormData();

  // Add text fields
  formData.append(
    'shopInfo',
    JSON.stringify({
      name: shopInfo.name,
      url: shopInfo.url,
      userId: shopInfo.userId,
      password: shopInfo.password,
    }),
  );

  // Add shop image if exists
  if (shopInfo.image) {
    formData.append('shopImage', shopInfo.image);
  }

  // Add each product as JSON
  mainProducts.forEach((product, index) => {
    formData.append(
      `mainProducts[${index}]`,
      JSON.stringify({
        name: product.name,
        price: product.price,
      }),
    );

    if (product.image) {
      formData.append(`mainProductImages[${index}]`, product.image);
    }
  });

  const response = await fetch(baseUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('API Error:', error);
    throw new Error('링크샵 생성에 실패했습니다.');
  }

  return await response.json();
};

export const deleteLinkShop = async (linkShopId, currentPassword) => {
  const response = await fetch(`${baseUrl}/${linkShopId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword }),
  });

  if (response.status === 404) {
    throw new Error('존재하지 않는 링크샵입니다.');
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('삭제 실패:', errorText);
    throw new Error('링크샵 삭제에 실패했습니다.');
  }

  return await response.json(); // 성공 메시지 반환
};

// 수정하기 전 비밀번호 확인
export const validateLinkShopPassword = async (linkShopId, password, existingData) => {
  const response = await fetch(`${baseUrl}/${linkShopId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword: password,
      shop: {
        imageUrl: existingData.shop.imageUrl,
        urlName: existingData.shop.urlName,
        shopUrl: existingData.shop.shopUrl,
      },
      userId: existingData.userId,
      name: existingData.name,
      products: existingData.products.map((p) => ({
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
      })),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json(); // JSON 응답 파싱

    // details?.name?.message 에 안전하게 접근
    const customMessage =
      errorData?.details?.name?.message || '비밀번호 확인 중 오류가 발생했습니다.';

    // console.error('🔴 PUT 요청 실패 내용:', errorData); // 디버깅용 출력
    throw new Error(customMessage); // 에러 메시지 던짐
  }

  return await response.json(); // 성공 시 반환값
};
