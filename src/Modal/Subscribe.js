import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    email: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subscribe ||
  mongoose.model("Subscribe", contactSchema);
