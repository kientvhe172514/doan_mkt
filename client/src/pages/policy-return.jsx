import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import PolicyCrumb from "@/components/breadcrumb/PolicyCrumb";
import PolicyDetail from "@/components/policy-detail/policy-return";

const PolicyPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Policy" />
      <HeaderTwo style_2={true} />
      <PolicyCrumb title="Chính Sách Đổi Trả & Hoàn Tiền"/>
      <PolicyDetail/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default PolicyPage;
