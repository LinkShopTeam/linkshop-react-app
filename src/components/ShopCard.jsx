// import React from 'react';
// import './ShopCard.css';

// export default function ShopCard({ shop }) {
//   // 기본 상품 이미지 배열
//   const defaultProductImages = ['/images/item1.png', '/images/item2.png', '/images/item3.png'];

//   // shop.products가 존재하고 길이가 1~2개밖에 없어도 3개까지 채워주도록 확장
//   const productImages =
//     shop.products && shop.products.length > 0
//       ? [...shop.products, ...defaultProductImages].slice(0, 3)
//       : defaultProductImages;

//   return (
//     <div className='shop-card'>
//       <div className='shop-header'>
//         <div className='shop-profile'>
//           <img
//             className='profile-img'
//             src={shop.profileImage || '/images/profile1.png'}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/images/profile1.png';
//             }}
//             alt='프로필'
//           />
//           <div>
//             <div className='shop-name'>{shop.name || '너구리 상점'}</div>
//             <div className='shop-username'>@{shop.username || 'pumpkinraccoon'}</div>
//           </div>
//         </div>
//         <div className='shop-likes'>
//           <img
//             src='/images/heart.png'
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/images/heart.png';
//             }}
//             alt='하트'
//             className='heart-icon'
//           />
//           {shop.likeCount ?? 30}
//         </div>
//       </div>

//       <div className='shop-products-label'>대표 상품 {productImages.length}</div>

//       <div className='shop-products'>
//         {productImages.map((src, idx) => (
//           <img
//             key={idx}
//             className='product-img'
//             src={src}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = defaultProductImages[idx] || '/images/item1.png';
//             }}
//             alt={`상품 ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
