const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const productsSchema = mongoose.Schema(
  {
    sku: { type: String },
    img: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide valid url(s)"],
    },
    title: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [200, "Name is too large"],
    },
    slug: { type: String, trim: true },
    unit: { type: String, required: true },
    imageURLs: [
      {
        color: {
          name: { type: String, required: true, trim: true },
          clrCode: { type: String, required: true, trim: true },
        },
        img: {
          type: String,
          required: true,
          validate: [validator.isURL, "Please provide valid url(s)"],
        },
        sizes: [
          {
            size: { type: String, required: true },
            quantity: {
              type: Number,
              required: true,
              min: [0, "Size quantity can't be negative"],
            },
          },
        ],
      },
    ],

    parent: { type: String, required: true, trim: true },
    children: { type: String, required: true, trim: true },
    // Tự động cập nhật bằng pre-save
    quantity: {
      type: Number,
      default: 0,
      min: [0, "Product quantity can't be negative"],
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Product price can't be negative"],
    },
    brand: {
      name: { type: String },
      id: { type: ObjectId, ref: "Brand" },
    },
    category: {
      name: { type: String },
      id: { type: ObjectId, ref: "Category" },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
      default: "in-stock",
    },
    reviews: [{ type: ObjectId, ref: "Reviews" }],
    productType: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    videoId: { type: String },
    additionalInformation: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    tags: [String],
    offerDate: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    featured: { type: Boolean, default: false },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// ✅ Tính quantity tự động trước khi lưu
productsSchema.pre("save", function (next) {
  let total = 0;
  if (Array.isArray(this.imageURLs)) {
    this.imageURLs.forEach((color) => {
      if (Array.isArray(color.sizes)) {
        color.sizes.forEach((sz) => {
          total += sz.quantity || 0;
        });
      }
    });
  }
  this.quantity = total;
  next();
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
