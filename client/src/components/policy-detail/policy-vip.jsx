import React from 'react';
import Image from 'next/image';
// internal
import shape_line from '@assets/img/blog/details/shape/line.png';
import shape_line_2 from '@assets/img/blog/details/shape/quote.png';
import blog_details_big_img from '@assets/img/blog/details/blog-big-1.jpg';
import blog_details_sm_img from '@assets/img/blog/details/blog-details-sm-1.jpg';
import blogData from '@/data/blog-data';
import GridItem from '../blog/blog-grid/grid-item';
import BlogDetailsComments from '../blog-details/blog-details-comments';
import BlogPostCommentForm from '../forms/blog-post-comment-form';
import BlogDetailsAuthor from '../blog-details/blog-details-author';
import PostboxDetailsNav from '../blog-details/postbox-details-nav';
import PostboxDetailsTop from '../blog-details/postbox-details-top';
import social_data from '@/data/social-data';
// related_blogs
const related_blogs = blogData.filter(b => b.blog === 'blog-grid').slice(0, 3)

const PolicyDetail = ({blog}) => {
            return (
              <>
                <section className="tp-postbox-details-area pb-120 pt-95">
                  <div className="container">
                    <div className="row">
                      {/* <div className="col-xl-9">
                        <PostboxDetailsTop blog={blog} />
                      </div> */}
                      {/* <div className="col-xl-12">
                        <div className="tp-postbox-details-thumb">
                          <Image src={blog_details_big_img} alt="blog-big-img" />
                        </div>
                      </div> */}
                      <div className="tp-postbox-details-content">
                          <h4 className="tp-postbox-details-heading">Chính Thẻ Thành Viên - Thẻ Vip</h4>
                          <h5 className="">
                          L’Muse – Trân quý từng khoảnh khắc đồng hành
            </h5>
            <p>
              Nhằm tri ân khách hàng đã tin tưởng lựa chọn L’Muse, chúng tôi xây dựng chương trình Thẻ thành viên – Thẻ VIP với nhiều quyền lợi ưu đãi và trải nghiệm mua sắm đặc quyền dành riêng cho bạn.
            </p>

            {/* Phần I */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">I. CÁC HẠNG MỨC THẺ</h5>
                        <div className="tp-postbox-details-thumb">
                                        <Image src={blog_details_big_img} alt="blog-big-img" />
                        </div>
            </div>

            {/* Phần II */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">II. QUY ĐỊNH TÍCH ĐIỂM</h5>
              <div className="tp-postbox-details-list">
                <ul>
                  <li>Với mỗi 1.000.000đ mua hàng, bạn tích lũy 1 điểm.</li>
                  <li>Điểm có thể dùng để đổi quà, giảm giá hoặc nâng hạng thành viên.</li>
                  <li>Điểm tích lũy không có giá trị quy đổi thành tiền mặt và có hiệu lực trong vòng 12 tháng kể từ ngày phát sinh.</li>
                </ul>
              </div>
            </div>

            {/* Phần III */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">III. QUYỀN LỢI CHUNG CHO MỌI THÀNH VIÊN</h5>
              <div className="tp-postbox-details-list">
                <ul>
                  <li>Nhận thông báo sớm về các bộ sưu tập, ưu đãi riêng.</li>
                  <li>Tham gia sự kiện dành riêng cho khách thân thiết.</li>
                  <li>Được chăm sóc bởi trợ lý thời trang cá nhân (áp dụng từ hạng Gold trở lên).</li>
                </ul>
              </div>
            </div>

            {/* Phần IV */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">IV. ĐĂNG KÝ VÀ THEO DÕI HẠNG THẺ</h5>
              <div className="tp-postbox-details-list">
                <ul>
                  <li>Hệ thống sẽ tự động cập nhật hạng thẻ dựa trên tổng giá trị mua hàng.</li>
                  <li>Đăng ký thành viên nhanh chóng qua website, fanpage, hoặc tại cửa hàng.</li>
                  <li>Lịch sử điểm & ưu đãi sẽ được cập nhật qua tài khoản khách hàng và email/SMS.</li>
                </ul>
              </div>
            </div>

            {/* Phần V */}
            <div className="tp-postbox-details-item mt-40">
                <h5 className="">V. LIÊN HỆ HỖ TRỢ</h5>
                <div className="tp-postbox-details-list">
                    <ul>
                    <li>
                        <strong>Facebook:</strong>
                        {/* Mở link trong tab mới */}
                        <a href="https://www.facebook.com/lmuse.official" target="_blank" rel="noopener noreferrer"> L'Muse</a>
                    </li>
                    <li>
                        <strong>Instagram:</strong>
                        <a href="https://www.instagram.com/LMuse.official" target="_blank" rel="noopener noreferrer"> LMuse.official</a>
                    </li>
                    <li>
                        <strong>Tiktok:</strong>
                        <a href="https://www.tiktok.com/@lmuse.official" target="_blank" rel="noopener noreferrer"> Lmuse.official</a>
                    </li>
                    <li>
                        <strong>Shopee:</strong>
                        <a href="https://shopee.vn/lmuse.official" target="_blank" rel="noopener noreferrer"> Lmuse.official</a>
                    </li>
                    <li>
                        <strong>Email:</strong>
                        {/* Mở ứng dụng email mặc định */}
                        <a href="mailto:lmuse.contact@gmail.com"> lmuse.contact@gmail.com</a>
                    </li>
                    <li>
                        <strong>Hotline:</strong>
                        {/* Mở ứng dụng gọi điện trên di động */}
                        <a href="tel:0363697288"> 0363.697.288</a>
                    </li>
                    </ul>
                </div>
                </div>
                          </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-xl-2 col-lg-2 col-md-2">
                        <div className="tp-postbox-details-share-2">
                          <span>Chia sẻ</span>
                          <ul>
                            {social_data.map(s => (
                            <li key={s.id}>
                              <a href={s.link} target="_blank" className='me-1'>
                                <i className={s.icon}></i>
                              </a>
                            </li>
                            )) }
                          </ul>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="tp-postbox-related-area pt-115 pb-90 mb-110" style={{backgroundColor:'#F4F7F9'}}>
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="tp-postbox-related">
                            <h3 className="tp-postbox-related-title">Related Articles</h3>

                            <div className="row">
                              {related_blogs.map((blog) => (
                                <div className="col-lg-4 col-md-6" key={blog.id}>
                                  <GridItem blog={blog} style_2={true} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <div className="tp-postbox-details-comment-wrapper">
                          <h3 className="tp-postbox-details-comment-title">Comments (2)</h3>
                          BlogDetailsComments
                          <BlogDetailsComments />
                          BlogDetailsComments
                        </div>

                        <div className="tp-postbox-details-form">
                          <h3 className="tp-postbox-details-form-title">Leave a Reply</h3>
                          <p>Your email address will not be published. Required fields are marked *</p>

                          form start
                          <BlogPostCommentForm />
                          form end
                        </div>
                      </div>
                    </div>
                  </div> */}
                </section>
              </>
            );
};

export default PolicyDetail;