import { useState } from 'react';

export default function ProductImage({ imageUrl, alt }) {
  const [isError, setIsError] = useState(false);

  if (isError || !imageUrl) {
    return (
      <div
        style={{
          width: 95,
          height: 95,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: 12,
          borderRadius: 10,
        }}
      >
        No Image
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={95}
      height={95}
      style={{ objectFit: 'cover', borderRadius: 10 }}
      onError={() => setIsError(true)}
    />
  );
}
