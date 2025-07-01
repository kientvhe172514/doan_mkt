import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const { cart_products } = useSelector((state) => state.cart);

    useEffect(() => {
        // Sử dụng reduce để tính toán cả số lượng và tổng tiền cuối cùng
        const { total, quantity } = cart_products.reduce((acc, item) => {
            
            // Lấy ra giá, số lượng, và discount của TỪNG sản phẩm
            const { price, orderQuantity, discount = 0 } = item;

            // 1. Tính giá cuối cùng của MỘT sản phẩm (sau khi trừ discount của riêng nó)
            const finalPricePerUnit = discount > 0 ? price - (price * discount / 100) : price;

            // 2. Cộng dồn tổng tiền (đã nhân với số lượng) và tổng số lượng
            acc.total += finalPricePerUnit * orderQuantity;
            acc.quantity += orderQuantity;

            return acc;
        }, {
            // Giá trị khởi tạo
            total: 0,
            quantity: 0,
        });

        // Cập nhật state với kết quả cuối cùng
        setTotal(total);
        setQuantity(quantity);

    }, [cart_products]);

    return {
        quantity,

        total,
    };
};

export default useCartInfo;