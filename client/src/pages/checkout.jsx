import React from 'react';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';

const CheckoutPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Thanh Toán" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Thanh Toán" subtitle="thanh toán" bg_clr={true} />
      <CheckoutArea />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default CheckoutPage;
