import React from 'react';
import Image from 'next/image';

const TryOnClothingPanel = ({ images, selectedClothing, onSelect }) => {
  return (
    <div className="try-on-clothing-panel">
      <h3 className="try-on-clothing-panel__title">1. Chọn trang phục</h3>
      <div className="try-on-clothing-panel__list">
        {images.map((item, index) => (
          <div
            key={index}
            className={`selection-item ${selectedClothing === item.img ? 'selected' : ''}`}
            onClick={() => onSelect(item.img)}
          >
            <Image
              src={item.img}
              alt={item.color?.name || `Trang phục ${index + 1}`}
              layout="fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryOnClothingPanel;