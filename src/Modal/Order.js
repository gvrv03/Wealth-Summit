import mongoose, { models } from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

// Define the product schema
const orderSchema = new Schema(
  {
    User: {
      type: ObjectId,
      ref: "User",
    },
    Product: {
      type: ObjectId,
      ref: "productDetail",
    },
    amount: Number,
    amount_due: Number,
    amount_paid: Number,
    attempts: Number,
    created_at: Number,
    currency: String,
    entity: String,
    id: String,
    notes: ["String"],
    offer_id: String,
    receipt: String,
    status: String,
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.order || mongoose.model("order", orderSchema);
