import mongoose, { models } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

// Define the product schema
const orderSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
    },
    Product: {
      type: ObjectId,
      ref: "productDetail",
    },
    TID: {
      type: String,
      required: true,
    },
    PayDetail: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.order || mongoose.model("order", orderSchema);
