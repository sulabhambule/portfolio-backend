
import mongoose from "mongoose";

const hireMeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    company: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      default: "",
    },
    timeline: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const HireMeRequest = mongoose.model("HireMeRequest", hireMeSchema);
