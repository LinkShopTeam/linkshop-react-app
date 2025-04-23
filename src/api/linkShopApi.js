// src/api/linkShopApi.js
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

export const getLinkShopList = async (keyword, orderBy) => {
  const response = await fetch(`${baseUrl}?keyword=${keyword}&orderBy=${orderBy}`);
  const data = await response.json();
  return data.list;
};

export const createLinkShop = async ({ shopInfo, mainProducts }) => {
  const formData = new FormData();

  // Add text fields
  formData.append('shopInfo', JSON.stringify({
    name: shopInfo.name,
    url: shopInfo.url,
    userId: shopInfo.userId,
    password: shopInfo.password,
  }));

  // Add shop image if exists
  if (shopInfo.image) {
    formData.append('shopImage', shopInfo.image);
  }

  // Add each product as JSON
  mainProducts.forEach((product, index) => {
    formData.append(`mainProducts[${index}]`, JSON.stringify({
      name: product.name,
      price: product.price
    }));

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
