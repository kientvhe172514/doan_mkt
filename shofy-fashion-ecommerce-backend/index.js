require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const { secret } = require("./config/secret");
const PORT = secret.port || 7000;
const morgan = require("morgan");

// error handler
const globalErrorHandler = require("./middleware/global-error-handler");
// routes
const vnpayRoutes = require("./routes/vnpay.route");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const userOrderRoutes = require("./routes/user.order.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const couponRoutes = require("./routes/coupon.routes");
const reviewRoutes = require("./routes/review.routes");
const adminRoutes = require("./routes/admin.routes");
// const uploadRouter = require('./routes/uploadFile.route');
const cloudinaryRoutes = require("./routes/cloudinary.routes");

// --- ⭐ SỬA Ở ĐÂY: Cấu hình CORS chi tiết ---
const allowedOrigins = [
    'https://lmuse.vn', // Tên miền frontend của bạn
    'http://localhost:3000', // Thêm tên miền khi phát triển ở local (nếu cần)
    'http://localhost:3001',  // Thêm các cổng khác nếu có
    'https://admin.lmuse.vn'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép các yêu cầu không có origin (như Postman, mobile apps) hoặc các origin trong danh sách
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Cho phép gửi cookie và header authorization
};

app.use(cors(corsOptions));
// --- KẾT THÚC SỬA ---


// middleware
// app.use(cors()); // Dòng này đã được thay thế bằng khối cấu hình ở trên
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// connect database
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/vnpay", vnpayRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
// app.use('/api/upload',uploadRouter);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user-order", userOrderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

// root route
app.get("/", (req, res) => res.send("Apps worked successfully"));

// global error handler
app.use(globalErrorHandler);

//* handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  // Không cần next() ở đây vì đây là điểm cuối cùng của một yêu cầu không thành công
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

module.exports = app;