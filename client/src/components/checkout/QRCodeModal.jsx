import React from 'react';
import Image from 'next/image';

const QRCodeModal = ({ isOpen, onClose, onConfirm, totalAmount }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Quét mã QR để thanh toán</h3>
        <p className="modal-description">
          Vui lòng sử dụng ứng dụng ngân hàng của bạn để quét mã QR dưới đây.
        </p>
        <div className="qr-code-wrapper">
          {/* 👉 THAY THẾ bằng đường dẫn đến ảnh QR của bạn */}
          <Image 
            src="/assets/img/qr/your-qr-code.png" 
            alt="Mã QR thanh toán" 
            width={250} 
            height={250} 
          />
        </div>
        <div className="modal-details">
          <p>Số tiền cần chuyển: <strong>{totalAmount.toLocaleString()}đ</strong></p>
          <p>Nội dung chuyển khoản: <strong style={{color: 'red'}}>TEN KHACH HANG</strong> (Hệ thống sẽ tự điền sau)</p>
        </div>
        <div className="modal-actions">
          <button onClick={onConfirm} className="tp-checkout-btn confirm-btn">
            Tôi đã chuyển khoản thành công
          </button>
          <button onClick={onClose} className="tp-checkout-btn cancel-btn">
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;