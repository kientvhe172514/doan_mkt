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
                          <h4 className="tp-postbox-details-heading">CHÍNH SÁCH MUA HÀNG ONLINE</h4>
                          <h5 className="">
                          L&apos;Muse – Trân quý từng khoảnh khắc đồng hành
            </h5>
            {/* Phần I */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">I. HƯỚNG DẪN MUA HÀNG</h5>
              <p>
              Khách hàng có thể đặt hàng trực tuyến qua các kênh chính thức của L&apos;Muse:
            </p>  
            <div className="tp-postbox-details-list">
                {/* Phần 1: Quy định đổi hàng */}
                <h5>Bước 1: Chọn sản phẩm</h5>
                <ul>
                    <li>Truy cập website chính thức: www.lmuse.vn/L'museshopee....</li>
                    <li>
                    Hoặc xem sản phẩm qua fanpage Facebook/Instgram/Tiktok của L&apos;Muse
                    </li>
                </ul>

                {/* Phần 2: Điều kiện đổi hàng */}
                <h5 style={{ marginTop: '30px' }}>Bước 2: Đặt hàng</h5>
                <ul>
                    <li>Bạn có thể đặt hàng theo các cách sau:</li>
                    <li>Trên website: Chọn sản phẩm → Chọn size → Thêm vào giỏ → Điền thông tin → Đặt hàng</li>
                    <li>Trên  Facebook/Instgram/Tiktok: Nhắn tin trực tiếp (inbox) hoặc bình luận tại bài đăng</li>
                    <li>Trên Shopee: Chọn sản phẩm → Chọn size → Thêm vào giỏ → Thanh toán</li>
                    <li>📞 Hotline: 0363.697.288</li>
                </ul>
               
                {/* Phần 3: Xác nhận và thanh táon */}
                <h5 style={{ marginTop: '30px' }}>Bước 3: Xác nhận & Thanh toán</h5>
                <ul>
                    <li>Sau khi đặt hàng, nhân viên L&apos;Muse sẽ liên hệ để xác nhận đơn và hướng dẫn thanh toán.</li>
                    <li>Phương thức thanh toán:</li>
                    <li>Thanh toán khi nhận hàng (COD)</li>
                    <li>Chuyển khoản ngân hàng: (Thông tin tài khoản sẽ được cung cấp sau khi xác nhận đơn)</li>
                    <li>Thanh toán qua ví điện tử hoặc cổng thanh toán (đang cập nhật)</li>
                    <li>⚠️ Lưu ý: Vui lòng KHÔNG chuyển khoản trước khi có xác nhận từ nhân viên L&apos;Muse.</li>
                </ul>
                </div>
            </div>

            {/* Phần II */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">II. CHÍNH SÁCH VẬN CHUYỂN</h5>
              <p>
              L&apos;Muse – Giao hàng đúng hẹn, an tâm từng bước
             </p>
                <p>
                L&apos;Muse cam kết giao sản phẩm đến tay bạn một cách nhanh chóng, an toàn và minh bạch. Chính sách vận chuyển áp dụng như sau:
             </p>
              <div className="tp-postbox-details-list">
                {/* Phần 1: Quy định đổi hàng */}
                <h5>1. Đối tượng áp dụng:</h5>
                <ul>
                    <li>Áp dụng đổi 1 lần/1 đơn hàng.</li>
            

                <li>Chính sách vận chuyển được áp dụng đối với tất cả các đối tượng khách hàng mua sản phẩm của L'Muse qua các kênh mua sắm online chính thức của L'Muse (Website, Fanpage Facebook, Instagram, Tiktok, Shopee)</li>
                   
              
                </ul>

                {/* Phần 2: Điều kiện đổi hàng */}
                <h5 style={{ marginTop: '30px' }}>2. Phạm vi áp dụng:</h5>
                <ul>
                    <li>Áp dụng đối với tất cả các đơn hàng trên toàn quốc.</li>
                </ul>

                                {/* Phần 3. Phí vận chuyển: */}
                                <h5 style={{ marginTop: '30px' }}>3. Phí vận chuyển:</h5>
                <ul>
                    <li>Phí chuyển phát áp dụng đối với:</li>
                    <li>- Đơn hàng trên 1 triệu đồng: Freeship.</li>
                    <li>- Đơn hàng từ dưới 1 triệu đồng: Áp dụng phí vận chuyển 30,000 VND/đơn hàng, ship COD nhận hàng thanh toán sau trên toàn quốc .</li>
                </ul>

                                {/* Phần 4. Thời gian vận chuyển.*/}
                                <h5 style={{ marginTop: '30px' }}>4. Thời gian vận chuyển.</h5>
                <ul>
                    <li>Tại Hà Nội: 1 – 2 ngày kể từ khi đơn hàng được xác nhận.</li>
                    <li>Tại các thành phố lớn: 2 – 4 ngày kể từ khi đơn hàng được xác nhận.</li>
                    <li>Tại địa điểm huyện, xã, vùng sâu vùng xa: 3 – 6 ngày kể từ khi đơn hàng được xác nhận.  </li>
                </ul>
                </div>
            </div>
            {/* Phần III */}
            <div className="tp-postbox-details-item mt-40">
            <h5 className="">III. LIÊN HỆ HỖ TRỢ</h5>
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