import React from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import {handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";

const ShopTopRight = ({selectHandleFilter}) => {
  const dispatch = useDispatch()
  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={[
            { value: "Default Sorting", text: "Mặc định" },
            { value: "Low to High", text: "Thấp đến cao" },
            { value: "High to Low", text: "Cao xuống thấp" },
            { value: "New Added", text: "Mới được thêm" },
            { value: "On Sale", text: "Đang sale" },
          ]}
          defaultCurrent={0}
          onChange={selectHandleFilter}
          name="Mặc định"
        />
      </div>
      <div className="tp-shop-top-filter">
        <button onClick={()=> dispatch(handleFilterSidebarOpen())} type="button" className="tp-filter-btn">
          <span>
            <Filter />
          </span>
          {" "}Tìm Kiếm
        </button>
      </div>
    </div>
  );
};

export default ShopTopRight;
