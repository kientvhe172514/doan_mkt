import home_1 from '@assets/img/menu/menu-home-1.jpg';
import home_2 from '@assets/img/menu/menu-home-2.jpg';
import home_3 from '@assets/img/menu/menu-home-3.jpg';
import home_4 from '@assets/img/menu/menu-home-4.jpg';
const menu_data = [
  // {
  //   id: 1,
  //   homes: true,
  //   title: 'Trang Chủ',
  //   link: '/',
  //   home_pages: [
  //     {
  //       img: home_1,
  //       title: 'Electronics',
  //       link: '/'
  //     }
  //     // {
  //     //   img: home_2,
  //     //   title: 'Fashion',
  //     //   link: '/home-2'
  //     // },
  //     // {
  //     //   img: home_3,
  //     //   title: 'Beauty',
  //     //   link: '/home-3'
  //     // },
  //     // {
  //     //   img: home_4,
  //     //   title: 'Jewelry',
  //     //   link: '/home-4'
  //     // }
  //   ]
  // },
  {
    id: 1,
    sub_menu: true,
    title: 'VỀ CHÚNG TÔI',
    link: '/blog',
    sub_menus: [
      { title: 'Blog Standard', link: '/blog' },
      { title: 'Blog Grid', link: '/blog-grid' },
      { title: 'Blog List', link: '/blog-list' },
      { title: 'Blog Details', link: '/blog-details' },
      { title: 'Blog Details Full Width', link: '/blog-details-2' },
    ]
  },
  // {
  //   id: 2,
  //   products: true,
  //   title: 'SẢN PHẨM',
  //   link: '/shop',
  //   product_pages: [
  //     {
  //       title: 'Tất cả Sản Phẩm',
  //       link: '/shop',
  //       mega_menus: [
  //         { title: 'Cửa Hàng', link: '/shop' },
  
  //       ]
  //     },
  //     {
  //       title: 'Tiện ích',
  //       link: '/shop',
  //       mega_menus: [
  //         { title: 'Giỏ hàng', link: '/cart' },
  //         { title: 'So Sánh', link: '/compare' },
  //         { title: 'Yêu thích', link: '/wishlist' },
  //         { title: 'Thanh Toán', link: '/checkout' },
  //         { title: 'Tài Khoản', link: '/profile' },
  //       ]
  //     },
  //     {
  //       title: 'Trang',
  //       link: '/shop',
  //       mega_menus: [
  //         { title: 'Đăng Nhập', link: '/login' },
  //         { title: 'Đăng Ký', link: '/register' },
  //         { title: 'Quên Mật Khẩu', link: '/forgot' },
  //       ]
  //     },
  //   ]
  // },
  {
    id: 2,
    sub_menu: true,
    title: 'BỘ SƯU TẬP',
    link: '/shop',
    sub_menus: [
      { title: 'Mua Sắm', link: '/shop' },
      { title: 'Sidebar Bên Phải', link: '/shop-right-sidebar' },
      { title: 'Ẩn Sidebar', link: '/shop-hidden-sidebar' },
    ],
  },
  {
    id: 3,
    single_link: true,
    title: 'FLASHSALE',
    link: '/flash-sale',
  },

  {
    id: 4,
    single_link: true,
    title: 'LIÊN HỆ',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    homes: true,
    title: 'TRANG CHỦ',
    link: '/',
    home_pages: [
      {
        img: home_1,
        title: 'Electronics',
        link: '/'
      },
      // {
      //   img: home_2,
      //   title: 'Fashion',
      //   link: '/home-2'
      // },
      // {
      //   img: home_3,
      //   title: 'Beauty',
      //   link: '/home-3'
      // },
      // {
      //   img: home_4,
      //   title: 'Jewelry',
      //   link: '/home-4'
      // }
    ]
  },
  // {
  //   id: 2,
  //   sub_menu: true,
  //   title: 'Products',
  //   link: '/shop',
  //   sub_menus: [
  //     { title: 'Shop', link: '/shop' },
  //     { title: 'Right Sidebar', link: '/shop-right-sidebar' },
  //     { title: 'Hidden Sidebar', link: '/shop-hidden-sidebar' },
  //     { title: 'Only Categories', link: '/shop-category' },
  //     { title: 'Product Simple', link: '/product-details' },
  //     { title: 'With Video', link: '/product-details-video' },
  //     { title: 'With Countdown Timer', link: '/product-details-countdown' },
  //     { title: 'Variations Swatches', link: '/product-details-swatches' },
  //   ],
  // },
  {
    id: 3,
    sub_menu: true,
    title: 'VỀ CHÚNG TÔI',
    link: '/blog',
    sub_menus: [
      { title: 'Giỏ Hàng', link: '/cart' },
      { title: 'So Sánh', link: '/compare' },
      { title: 'Yêu Thích', link: '/wishlist' },
      { title: 'Thanh Toán', link: '/checkout' },
      { title: 'Tài Khoản', link: '/profile' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'FLASH SALE',
    link: '/flash-sale',
    sub_menus: [
      { title: 'Login', link: '/login' },
      { title: 'Register', link: '/register' },
      { title: 'Forgot Password', link: '/forgot' },
      { title: '404 Error', link: '/404' },
    ],
  },
  {
    id: 4,
    single_link: true,
    title: 'BỘ SƯU TẬP',
    link: '/shop',
  },
  {
    id: 6,
    single_link: true,
    title: 'LIÊN HỆ',
    link: '/contact',
  },
]