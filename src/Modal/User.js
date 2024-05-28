import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    gender: {
      type: String,
      default: "N/A",
    },
    email: {
      type: String,
      default: "N/A",
    },
    dob: {
      type: String,
      default: "N/A",
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: String,
      default: "N/A",
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
    notification: {
      Whatsapp: {
        type: String,
        default: false,
      },
      SMS: {
        type: String,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
