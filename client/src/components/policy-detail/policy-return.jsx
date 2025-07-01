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
                          <h4 className="tp-postbox-details-heading">CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN</h4>
                          <h5 className="">
                          L’Muse – Trân quý từng khoảnh khắc đồng hành
                         </h5>
            {/* Phần I */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">I. ĐỐI TƯỢNG ÁP DỤNG</h5>
              <p>
              Chính sách áp dụng cho tất cả khách hàng mua hàng online qua website, fanpage Facebook, Instgram, Tiktok, Shopee của L'Muse
            </p> 
            </div>

            {/* Phần II */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">II. CHÍNH SÁCH ĐỔI SẢN PHẨM</h5>
              <div className="tp-postbox-details-list">
                {/* Phần 1: Quy định đổi hàng */}
                <h5>1. Quy định đổi hàng:</h5>
                <ul>
                    <li>Áp dụng đổi 1 lần/1 đơn hàng.</li>
                    <li>
                    <strong>Sản phẩm nguyên giá hoặc giảm giá đến 30%:</strong>
                    {/* Danh sách con cho sản phẩm giảm ít */}
                    <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '10px' }}>
                        <li>Được đổi size/màu hoặc đổi sang sản phẩm khác (nếu còn hàng).</li>
                        <li>Nếu sản phẩm đổi có giá trị cao hơn, khách hàng bù thêm phần chênh lệch.</li>
                        <li>Không hoàn tiền nếu sản phẩm đổi có giá trị thấp hơn.</li>
                    </ul>
                    </li>
                    <li style={{ marginTop: '10px' }}>
                    <strong>Sản phẩm giảm giá trên 30%:</strong>
                    {/* Danh sách con cho sản phẩm giảm nhiều */}
                    <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '10px' }}>
                        <li>Chỉ hỗ trợ đổi size (nếu còn hàng).</li>
                    </ul>
                    </li>
                    <li style={{ marginTop: '10px' }}>
                    <strong>Không áp dụng đổi với:</strong>
                    <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '10px' }}>
                        <li>Phụ kiện, quà tặng kèm, sản phẩm đã qua sử dụng.</li>
                    </ul>
                    </li>
                </ul>

                {/* Phần 2: Điều kiện đổi hàng */}
                <h5 style={{ marginTop: '30px' }}>2. Điều kiện đổi hàng:</h5>
                <ul>
                    <li>Thời gian đổi: Trong vòng 07 ngày kể từ ngày nhận hàng.</li>
                    <li>Sản phẩm còn nguyên tem, nhãn, chưa giặt, chưa qua sử dụng, không bị hư hại hay ám mùi lạ.</li>
                    <li>Cần cung cấp hóa đơn hoặc mã đơn hàng để được hỗ trợ nhanh chóng.</li>
                </ul>
                </div>
            </div>

            {/* Phần III */}
            <div className="tp-postbox-details-item mt-40">
              <h5 className="">III. CHÍNH SÁCH TRẢ HÀNG & HOÀN TIỀN</h5>
              <div className="tp-postbox-details-list">
                {/* Phần 1: Trả hàng & hoàn tiền */}
                <h5>1. Trả hàng & hoàn tiền:</h5>
                <ul>
                    <li>Áp dụng khi sản phẩm bị lỗi từ nhà sản xuất và bạn không muốn đổi sang sản phẩm khác.</li>
                    <li>Các lỗi được chấp nhận: Phai màu, bong tróc in, lỗi đường may nghiêm trọng.</li>
                </ul>

                {/* Phần 2: Điều kiện trả hàng */}
                <h5 style={{ marginTop: '30px' }}>2. Điều kiện trả hàng:</h5>
                <ul>
                    <li>Gửi trả trong vòng 10 ngày kể từ khi nhận hàng.</li>
                    <li>Sản phẩm phải còn nguyên trạng như khi nhận.</li>
                </ul>

                {/* Phần 3: Thời gian & hình thức hoàn tiền */}
                <h5 style={{ marginTop: '30px' }}>3. Thời gian & hình thức hoàn tiền:</h5>
                <ul>
                    <li>Sau khi xác minh lỗi (trong 1–3 ngày làm việc), L’Muse sẽ hoàn tiền trong vòng 3–5 ngày qua tài khoản ngân hàng.</li>
                    <li>L’Muse sẽ chịu 100% phí vận chuyển trả lại nếu lỗi được xác nhận từ phía thương hiệu.</li>
                </ul>
                </div>
            </div>

            {/* Phần IV */}
                <div className="tp-postbox-details-item mt-40">
                <h5 className="">IV. LIÊN HỆ HỖ TRỢ</h5>
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