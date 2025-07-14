import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import logo from '@assets/img/logo/logo.png';
import pay from '@assets/img/footer/footer-pay.png';
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';

const Footer = ({ style_2 = false, style_3 = false,primary_style=false }) => {
  return (
    <footer>
      <div className={`tp-footer-area ${primary_style?'tp-footer-style-2 tp-footer-style-primary tp-footer-style-6':''} ${style_2 ?'tp-footer-style-2':style_3 ? 'tp-footer-style-2 tp-footer-style-3': ''}`}
        data-bg-color={`${style_2 ? 'footer-bg-white' : 'footer-bg-grey'}`}>
        <div className="tp-footer-top">
          <div className="container">
          <div className="tp-footer-logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                    </div>
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-50">
                    <div className="tp-footer-widget-content">
                    <ul>
                      <li>
                        <i className="fa-solid fa-building"></i> 
                        <strong> CÔNG TY TNHH L’Muse</strong>
                      </li>
                      <li>
                        <i className="fa-solid fa-envelope"></i> 
                        <a href="mailto:lmuse.contact@gmail.com">lmuse.contact@gmail.com</a>
                      </li>
                      <li>
                        <i className="fa-solid fa-phone"></i> 
                        <a href="tel:0363697288">0363.697.288</a>
                      </li>
                    </ul>
                    <div className="tp-footer-social">
                    {social_data.map(s => <a href={s.link} key={s.id} target="_blank">
                    <i className={s.icon}></i>
                    </a>
                    )}  
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-2 mb-50">
                  <h4 className="tp-footer-widget-title">THƯƠNG HIỆU</h4>
                  <div className="tp-footer-widget-content">
                    <ul>               
                      <li><Link href="/blog">Câu chuyện thương hiệu</Link></li>
                      <li><Link href="/contact">Liên hệ</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 mb-50">
                  <h4 className="tp-footer-widget-title">HỖ TRỢ</h4>
                  <div className="tp-footer-widget-content">
                    <ul>
                      <li><Link href="/policy-shop">Chính sách mua hàng online</Link></li>
                      <li><Link href="/policy-return">Chính sách đổi/trả hàng</Link></li>
                      <li><Link href="/policy-vip">Chính sách thẻ thành viên - thẻ vip</Link></li>                    
                     
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-50">
                  <h4 className="tp-footer-widget-title">LIÊN HỆ VỚI CHÚNG TÔI</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-contact "> 
                    <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                           <i className='fa-solid fa-phone'></i>
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="tel:0363.697.288"> 0363.697.288</a></p>
                        </div>
                      </div> 
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="mailto:lmuse.contact@gmail.com">lmuse.contact@gmail.com</a></p>
                        </div>
                      </div>
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p><a href="https://maps.app.goo.gl/A8iyKuqCoCmGBnSq8" target="_blank">HHA Building, 43 Pham Van Dong, Bac Tu Liem, Ha Noi</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="tp-footer-copyright">
                    <p>© {new Date().getFullYear()} 
                      <Link href="/">{" "}❤</Link>.
                    </p>
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div className="tp-footer-payment text-md-end">
                    <p>
                      <Image src={pay} alt="pay" />
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;