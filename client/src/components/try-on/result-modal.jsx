import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const ResultModal = ({ imageUrl, onClose, onSave, isVisible, loadingMessage }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleContentClick = (e) => e.stopPropagation();

  // Chỉ render modal ở phía client và khi isVisible là true
  if (!isMounted || !isVisible) {
    return null;
  }

  // Dùng createPortal để render modal vào #modal-root
  return createPortal(
    <div className="result-modal-overlay" onClick={onClose}>
      <div className="result-modal-content" onClick={handleContentClick}>
        <button className="result-modal__close-btn" onClick={onClose}>&times;</button>
        <div className="result-modal__image-container">
          {loadingMessage ? (
            <div className="result-modal__loader">
              <div className="spinner"></div>
              <p>{loadingMessage}</p>
            </div>
          ) : (
            <Image src={imageUrl} alt="Ảnh kết quả từ AI" layout="fill" objectFit="contain" />
          )}
        </div>
        <div className="result-modal__actions">
          <button 
            className="result-modal__save-btn" 
            onClick={onSave}
            disabled={loadingMessage || !imageUrl}
          >
            Lưu ảnh
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ResultModal;
