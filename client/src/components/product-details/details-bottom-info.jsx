import React ,{ useState, useEffect } from "react";
import Image from "next/image";
import payment_option_img from '@assets/img/product/icons/payment-option.png';

const DetailsBottomInfo = ({sku,category,tag}) => {
  const [facebookShareUrl, setFacebookShareUrl] = useState('');

  // BƯỚC 3: Dùng useEffect để lấy URL của trang hiện tại một cách an toàn
  useEffect(() => {
    // Code bên trong useEffect chỉ chạy ở phía trình duyệt (client-side)
    const currentUrl = window.location.href;
    // Tạo link chia sẻ cho Facebook
    setFacebookShareUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`);
  }, []); // Mảng rỗng `[]` đảm bảo code chỉ chạy 1 lần sau khi component được render
  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        {/* <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div> */}
        {/* <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p>{tag}</p>
        </div> */}
      </div>

      {/*  product-details-social*/}

      <div className="tp-product-details-social">
        <span>Chia sẻ: </span>
        {/* BƯỚC 4: Sử dụng state cho href và thêm các thuộc tính cần thiết */}
        <a 
          href={facebookShareUrl}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a 
          href="https://www.tiktok.com/" // <-- Thay bằng link TikTok của bạn
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-tiktok"></i>
        </a>
        <a 
          href="https://www.instagram.com/" // <-- Thay bằng link Instagram của bạn
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>

      {/* product-details-msg */}

      {/* <div className="tp-product-details-msg mb-15">
        <ul>
          <li>30 days easy returns</li>
          <li>Order yours before 2.30pm for same day dispatch</li>
        </ul>
      </div> */}
      {/* product-details-payment */}
      {/* <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Guaranteed safe <br /> & secure checkout
        </p>
        <Image src={payment_option_img} alt="payment_option_img" />
      </div> */}
    </>
  );
};

export default DetailsBottomInfo;
