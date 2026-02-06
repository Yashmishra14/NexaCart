import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },

  category_image: {
    type: String, // Cloudinary image URL
    required: true,
  },

  category_status: {
    type: String,
    enum: ["enable", "disable"],
    default: "enable",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// export model
export const Category = mongoose.model("categories", CategorySchema);
