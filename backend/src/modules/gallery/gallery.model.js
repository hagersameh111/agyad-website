import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    trim: true,
    validate: { validator: (value) => value !== "الكل", message: "The all-items filter is not a gallery category" },
  },
  icon: { type: String, trim: true },
  size: { type: String, enum: ["normal", "wide", "tall"], default: "normal" },
  image: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model("Gallery", schema);
