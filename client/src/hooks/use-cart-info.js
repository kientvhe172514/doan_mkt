import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    // FIX: Select only the data you need directly.
    const cart_products = useSelector((state) => state.cart.cart_products);

    useEffect(() => {
        const { total: newTotal, quantity: newQuantity } = cart_products.reduce((acc, item) => {
            const { price, orderQuantity, discount = 0 } = item;
            const finalPricePerUnit = discount > 0 ? price - (price * discount / 100) : price;           
            acc.total += finalPricePerUnit * orderQuantity;
            acc.quantity += orderQuantity;
            return acc;
        }, {
            total: 0,
            quantity: 0,
        });

        setTotal(newTotal);
        setQuantity(newQuantity);

    }, [cart_products]);

    return {
        quantity,
        total,
    };
};

export default useCartInfo;