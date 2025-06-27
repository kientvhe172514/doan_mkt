const fs = require("fs");

// Load dữ liệu từ file JSON
const products = require("./utils/products.json");

// Kích thước mặc định cần thêm vào
const defaultSizes = [
  { size: "S", quantity: 5 },
  { size: "M", quantity: 10 },
  { size: "L", quantity: 8 },
  { size: "XL", quantity: 2 }
];

// Hàm xử lý
const updatedProducts = products.map((product) => {
  let newTotalQuantity = 0;

  if (Array.isArray(product.imageURLs)) {
    product.imageURLs = product.imageURLs.map((img) => {
      const sizes = defaultSizes.map((s) => ({ ...s }));
      newTotalQuantity += sizes.reduce((sum, sz) => sum + sz.quantity, 0);
      return { ...img, sizes };
    });
  }

  return {
    ...product,
    quantity: newTotalQuantity
  };
});

// Ghi lại file đã chỉnh sửa
fs.writeFileSync("products_with_sizes.json", JSON.stringify(updatedProducts, null, 2));
console.log("✅ File products_with_sizes.json đã được tạo với sizes và quantity cập nhật.");
