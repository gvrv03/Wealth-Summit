import mongoose, { models } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

// Define the product schema
const productSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Product: {
      type: String,
      required: true,
    },
    ProductDetail: {
      type: ObjectId,
      ref: "productDetail",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.product ||
  mongoose.model("product", productSchema);
