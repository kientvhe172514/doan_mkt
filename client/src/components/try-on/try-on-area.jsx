import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TryOnClothingPanel from './try-on-clothing-panel';
import TryOnCanvas from './try-on-canvas';
import TryOnOptionsPanel from './try-on-options-panel';
import ResultModal from './result-modal';
import { uploadImage, startVirtualTryOnJob, checkJobStatus } from '../../redux/features/lightxApi';

const TryOnArea = () => {
  const product = useSelector((state) => state.tryOn?.product);

  const [selectedClothingImg, setSelectedClothingImg] = useState('');
  const [userBodyImgUrl, setUserBodyImgUrl] = useState(null);
  const [userBodyFile, setUserBodyFile] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pollingIntervalId, setPollingIntervalId] = useState(null);
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    imageUrl: null,
    loadingMessage: '',
  });
  
  const [error, setError] = useState('');
  
  const sampleModels = [
    '/assets/img/model/model1.png',
    '/assets/img/model/model2.png',
    '/assets/img/model/model3.png',
    '/assets/img/model/model4.png',
    '/assets/img/model/model5.png',
    '/assets/img/model/model6.png',
  ];
  const dummyProduct = {
    title: 'Áo Mẫu',
    imageURLs: [
      { img: '/assets/img/product/trending/trending-1.jpg', color: { name: 'Đen' } },
      { img: '/assets/img/product/trending/trending-2.jpg', color: { name: 'Đen' } },
      { img: '/assets/img/product/trending/trending-3.jpg', color: { name: 'Đen' } },
    ]
  };
  const currentProduct = product || dummyProduct;

  useEffect(() => {
    if (currentProduct.imageURLs?.length > 0 && !selectedClothingImg) {
      setSelectedClothingImg(currentProduct.imageURLs[0].img);
    }
  }, [currentProduct, selectedClothingImg]);
  
  useEffect(() => {
    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
    };
  }, [pollingIntervalId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUserBodyImgUrl(URL.createObjectURL(file));
    setUserBodyFile(file);
  };
  
  const handleSelectModel = (modelUrl) => {
    setUserBodyImgUrl(modelUrl);
    setUserBodyFile(null);
  };

  const handleGenerateClick = async () => {
    if (!userBodyImgUrl || !selectedClothingImg) {
      alert("Vui lòng chọn ảnh người và ảnh trang phục.");
      return;
    }
    
    setIsGenerating(true);
    setError('');
    setModalState({ isOpen: true, imageUrl: null, loadingMessage: 'Đang tải ảnh lên...' });

    try {
      const humanImageSource = userBodyFile || userBodyImgUrl;
      const [humanUrl, garmentUrl] = await Promise.all([
        uploadImage(humanImageSource),
        uploadImage(selectedClothingImg)
      ]);
      
      setModalState(prev => ({ ...prev, loadingMessage: 'Đang khởi tạo AI...' }));
      const orderId = await startVirtualTryOnJob(humanUrl, garmentUrl);

      setModalState(prev => ({ ...prev, loadingMessage: 'AI đang xử lý, vui lòng chờ...' }));
      
      let retries = 0;
      const maxRetries = 15;

      const intervalId = setInterval(async () => {
        retries++;
        if (retries > maxRetries) {
          clearInterval(intervalId);
          setPollingIntervalId(null);
          setIsGenerating(false);
          alert('Tác vụ AI mất quá nhiều thời gian để xử lý. Vui lòng thử lại.');
          handleCloseModal();
          return;
        }
        try {
          const result = await checkJobStatus(orderId);
          if (result.status === 'active' && result.outputUrl) {
            clearInterval(intervalId);
            setPollingIntervalId(null);
            setModalState({ isOpen: true, imageUrl: result.outputUrl, loadingMessage: '' });
            setIsGenerating(false);
          } else if (result.status === 'failed') {
            clearInterval(intervalId);
            throw new Error('Tác vụ AI thất bại từ phía server.');
          }
        } catch (pollError) {
          clearInterval(intervalId);
          setIsGenerating(false);
          alert(pollError.message);
          handleCloseModal();
        }
      }, 3000);
      setPollingIntervalId(intervalId);

    } catch (err) {
      setError(err.message);
      alert(`Quá trình thất bại: ${err.message}`);
      setIsGenerating(false);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    if (pollingIntervalId) clearInterval(pollingIntervalId);
    setPollingIntervalId(null);
    setModalState({ isOpen: false, imageUrl: null, loadingMessage: '' });
  };

  const handleSaveImage = () => {
    if (!modalState.imageUrl) return;
    const link = document.createElement('a');
    link.href = modalState.imageUrl;
    link.download = `ket-qua-thu-do-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="try-on-area">
        <div className="container">
          <div className="try-on-container">
            <div className="try-on-main-view">
              <TryOnClothingPanel
                images={currentProduct.imageURLs}
                selectedClothing={selectedClothingImg}
                // SỬA LỖI: Gán đúng hàm `setSelectedClothingImg`
                onSelect={setSelectedClothingImg}
              />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <TryOnCanvas
                  bodyImg={userBodyImgUrl}
                  clothingImg={selectedClothingImg}
                />
                <div className="try-on-generate-button-wrapper">
                  <button 
                    className="try-on-generate-btn" 
                    onClick={handleGenerateClick}
                    disabled={!userBodyImgUrl || !selectedClothingImg || isGenerating}
                  >
                    {isGenerating ? 'Đang xử lý...' : 'Thử đồ với AI'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TryOnOptionsPanel
          sampleModels={sampleModels}
          selectedBodyImg={userBodyImgUrl}
          onImageUpload={handleImageUpload}
          onSelectModel={handleSelectModel}
          isLoading={isLoading}
        />
      </section>

      <ResultModal
        isVisible={modalState.isOpen}
        imageUrl={modalState.imageUrl}
        loadingMessage={modalState.loadingMessage}
        onClose={handleCloseModal}
        onSave={handleSaveImage}
      />
    </>
  );
};

export default TryOnArea;
