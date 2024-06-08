import mongoose, { models } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

// Define the product schema
const productDetailSchema = new Schema(
  {
    addeBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    artical: { type: String, required: true },
    images: { type: String, required: true },
    thumbnail: { type: String, required: true },
    pricing: {
      price: { type: Number, default: 0, required: true },
      comAtPrice: { type: Number, default: 0, required: true },
      costPerItem: { type: Number, default: 0, required: true },
      profit: { type: Number, default: 0, required: true },
      margin: { type: Number, default: 0, required: true },
    },
    productID: {
      type: ObjectId,
      ref: "product",
    },
    status: {
      required: true,
      type: String,
      enum: ["active", "draft"],
    },
    views: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.productDetail ||
  mongoose.model("productDetail", productDetailSchema);
