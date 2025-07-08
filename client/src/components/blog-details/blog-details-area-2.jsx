import React ,{ useState, useEffect } from 'react';
import Image from 'next/image';
// internal
import shape_line from '@assets/img/blog/details/shape/line.png';
import shape_line_2 from '@assets/img/blog/details/shape/quote.png';
import blog_details_big_img from '@assets/img/blog/details/blog-big-1.jpg';
import blog_details_sm_img from '@assets/img/blog/details/blog-details-sm-1.jpg';
import blogData from '@/data/blog-data';
// import GridItem from '../blog/blog-grid/grid-item';
// import BlogDetailsComments from './blog-details-comments';
// import BlogPostCommentForm from '../forms/blog-post-comment-form';
// import BlogDetailsAuthor from './blog-details-author';
// import PostboxDetailsNav from './postbox-details-nav';
// import PostboxDetailsTop from './postbox-details-top';

// related_blogs
const related_blogs = blogData.filter(b => b.blog === 'blog-grid').slice(0, 3)

const BlogDetailsAreaTwo = ({blog}) => {
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
      <section className="tp-postbox-details-area pb-120 pt-95">
        <div className="container">
          <div className="row">
            {/* <div className="col-xl-9">
              <PostboxDetailsTop blog={blog} />
            </div> */}
            <div className="col-xl-12">
              <div className="tp-postbox-details-thumb">
                <Image src={blog_details_big_img} alt="blog-big-img" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-2">
              <div className="tp-postbox-details-share-2">
                <span>Chia sẻ</span>
                <ul>
                  <li><a 
                    href={facebookShareUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a></li>
                  <li><a href="tiktok.com">
                    <i className="fa-brands fa-tiktok"></i>
                  </a></li>
                  <li><a href="instagram.com">
                    <i className="fa-brands fa-instagram"></i>
                  </a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-10">
              <div className="tp-postbox-details-main-wrapper tp-postbox-style2">
                <div className="tp-postbox-details-content">
                <h4 className="tp-postbox-details-heading">Câu Chuyện Thương Hiệu</h4>

                  <p>L&apos;Muse là thương hiệu thời trang thiết kế dành riêng cho phụ nữ ngoại cỡ - những người luôn muốn mặc đẹp không phải để che giấu, mà để bộc lộ bản thân một cách tự tin và đầy kiêu hãnh.

Chúng tôi sinh ra từ một câu hỏi giản đơn nhưng đầy trăn trở: Tại sao phụ nữ big-size lại không có những lựa chọn thời trang xứng đáng như bất kỳ ai? Từ đó, L&apos;Muse ra đời như một lời hồi đáp mạnh mẽ - rằng cái đẹp không bị giới hạn bởi số đo, và mọi vóc dáng đều xứng đáng được tôn vinh bằng những thiết kế chỉn chu, thời thượng và đầy cảm xúc.

Tại L&apos;Muse, mỗi sản phẩm là sự kết hợp giữa kỹ thuật cắt may chuẩn chỉnh cho vóc dáng đầy đặn, chất liệu cao cấp và tinh thần thiết kế hiện đại. Không chỉ là quần áo - đó là cách bạn thể hiện bản lĩnh, cá tính và tình yêu với chính mình.

Chúng tôi còn mang đến trải nghiệm mua sắm thông minh và đồng hành sâu sát cùng khách hàng – từ công nghệ AI thử đồ trên website, tư vấn cá nhân hóa theo form dáng, đến những chiến dịch truyền cảm hứng được xây dựng bởi cộng đồng phụ nữ yêu thời trang thật sự.

L&apos;Muse không chỉ là thương hiệu! - Đó là phong cách sống, là tiếng nói của một thế hệ phụ nữ dám yêu bản thân - đúng với dáng hình mình đang có.</p>

                  <h4 className="tp-postbox-details-heading">Tầm Nhìn</h4>
                  <p>L&apos;Muse hướng tới trở thành thương hiệu thời trang plus-size hàng đầu Việt Nam, là biểu tượng của sự tự tin và vẻ đẹp đa dạng dành cho phụ nữ đầy đặn, góp phần thay đổi cách nhìn nhận của xã hội về vẻ đẹp cơ thể. Trong 5–10 năm tới, L&apos;Muse mong muốn mở rộng tầm ảnh hưởng ra thị trường Đông Nam Á, mang phong cách thời trang tinh tế, phù hợp và bền vững đến nhiều người hơn nữa.</p>

                  <div className="tp-postbox-details-desc-thumb text-center">
                    <Image src={blog_details_sm_img} alt="details-sm-img" />
                    {/* <span className="tp-postbox-details-desc-thumb-caption">Gucci’s Women’s Cruise Collection 2023 Lookbook Has Arrived</span> */}
                  </div>
                  <h4 className="tp-postbox-details-heading">Sứ Mệnh</h4>
                  <p>“L&apos;Muse cam kết mang đến những thiết kế thời trang tinh tế, vừa vặn và thoải mái, giúp phụ nữ plus-size tự tin thể hiện cá tính và vẻ đẹp riêng của mình mỗi ngày. Chúng tôi luôn đồng hành cùng khách hàng bằng sự thấu hiểu, sáng tạo không ngừng và dịch vụ tận tâm, góp phần tạo nên một cộng đồng yêu thương bản thân, khỏe mạnh và năng động.” </p>

                  <div className="tp-postbox-details-quote">
                    <blockquote>
                      <div className="tp-postbox-details-quote-shape">
                        <Image className="tp-postbox-details-quote-shape-1" src={shape_line} alt="shape" />
                        <Image className="tp-postbox-details-quote-shape-2" src={shape_line_2} alt="shape" />
                      </div>
                      <p>Vượt ra khỏi mọi giới hạn để tự tin tỏa sáng theo cách riêng của bạn.</p>
                      <cite>L&apos;Muse</cite>
                    </blockquote>
                  </div>

                  <h4 className="tp-postbox-details-heading">Giá Trị Cốt Lõi</h4>
                  <strong className=''>L&apos;Muse hoạt động dựa trên ba giá trị cốt lõi làm nền tảng cho mọi hành động, quyết định và sự phát triển của chúng tôi. Những giá trị này định hướng cam kết của chúng tôi đối với sự xuất sắc và nuôi dưỡng một văn hóa đề cao sự tin cậy, đổi mới và lấy khách hàng làm trọng tâm:</strong>

                  <div className="tp-postbox-details-list">
                  <ul>
                    <li>
                      <strong>Chính trực:</strong> Chính trực không chỉ đơn thuần là sự trung thực – đó là cam kết vững chắc trong mọi hành động mà chúng tôi thực hiện. Đây là nền tảng tạo dựng niềm tin và sự tôn trọng lâu dài từ khách hàng, đối tác và cộng đồng. Chúng tôi tin rằng chỉ khi hành động đúng đắn và minh bạch, sự phát triển bền vững và thịnh vượng thực sự mới có thể đạt được.
                    </li>
                    <li>
                      <strong>Lấy khách hàng làm trung tâm:</strong> Khách hàng không chỉ là trọng tâm của mọi việc chúng tôi làm, mà còn là nguồn cảm hứng để chúng tôi không ngừng cải tiến. Mọi sản phẩm, dịch vụ và trải nghiệm đều được thiết kế nhằm đáp ứng và vượt qua kỳ vọng, đảm bảo rằng mỗi khách hàng đều cảm thấy được trân trọng và thấu hiểu từ LUMINA.
                    </li>
                    <li>
                      <strong>Đổi mới:</strong> Đổi mới là động lực thúc đẩy sự phát triển không ngừng của chúng tôi. Đó là tinh thần dám nghĩ khác biệt và vượt qua giới hạn hiện tại. Chúng tôi coi mọi thách thức là cơ hội để sáng tạo, tái định hình bản thân và phát triển những giải pháp mang tính đột phá, giúp LUMINA không chỉ vững vàng trước thay đổi mà còn tiên phong trong ngành.
                    </li>
                  </ul>
                </div>

                  {/* <p>Rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer cidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae lorem.</p>

                  <div className="tp-postbox-details-share-wrapper">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="tp-postbox-details-tags tagcloud">
                          <span>Tags:</span>
                          <a href="#">Lifesttyle</a>
                          <a href="#">Awesome</a>
                          <a href="#">Winter</a>
                          <a href="#">Sunglasses</a>
                        </div>
                      </div>
                    </div>
                  </div> */}


                  {/* PostboxDetailsNav */}
                  {/* <PostboxDetailsNav /> */}
                  {/* PostboxDetailsNav */}

                  {/* author details start */}
                  {/* <BlogDetailsAuthor /> */}
                  {/* author details end */}

                </div>
              </div>
            </div>
          </div>
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

export default BlogDetailsAreaTwo;