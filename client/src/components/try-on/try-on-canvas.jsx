import React from 'react';
import Image from 'next/image';

const TryOnCanvas = ({ bodyImg, clothingImg }) => {
  return (
    <div className="try-on-canvas">
      <div className="try-on-canvas__image-wrapper">
        {bodyImg ? (
          <Image src={bodyImg} alt="Ảnh người dùng hoặc người mẫu" layout="fill" />
        ) : (
          <div className="try-on-canvas__placeholder">
            <p>Chọn người mẫu hoặc tải ảnh của bạn từ slider bên dưới</p>
          </div>
        )}
      </div>
      <div className="try-on-canvas__image-wrapper">
        {clothingImg ? (
          <Image src={clothingImg} alt="Ảnh trang phục" layout="fill" />
        ) : (
          <div className="try-on-canvas__placeholder">
            <p>Chọn một trang phục từ slider bên dưới</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOnCanvas;