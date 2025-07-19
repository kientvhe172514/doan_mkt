import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import CSS
import 'swiper/css';
import 'swiper/css/navigation';

// SỬA LỖI: Thêm `sampleModels = []` để đặt giá trị mặc định, chống lỗi
const TryOnOptionsPanel = ({ sampleModels = [], selectedBodyImg, onImageUpload, onSelectModel, isLoading }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="try-on-options-panel">
      <div className="container">
        <h3 className="try-on-options-panel__title">2. Chọn người mẫu hoặc tải ảnh của bạn</h3>
        
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={'auto'}
          navigation
          className="model-swiper" 
        >
          <SwiperSlide>
            <div
              className="selection-item selection-item--upload"
              onClick={handleUploadClick}
            >
              {isLoading ? 'Đang tải...' : 'Tải ảnh lên'}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/jpeg, image/png"
                onChange={onImageUpload}
                disabled={isLoading}
              />
            </div>
          </SwiperSlide>

          {/* Giờ đây, kể cả khi sampleModels không được truyền, nó sẽ là mảng rỗng và không gây lỗi */}
          {sampleModels.map((modelSrc, index) => (
            <SwiperSlide key={index}>
              <div
                className={`selection-item ${selectedBodyImg === modelSrc ? 'selected' : ''}`}
                onClick={() => onSelectModel(modelSrc)}
              >
                <Image
                  src={modelSrc}
                  alt={`Người mẫu ${index + 1}`}
                  layout="fill"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TryOnOptionsPanel;
