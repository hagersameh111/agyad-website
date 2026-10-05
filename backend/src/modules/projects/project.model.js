import mongoose from "mongoose";

const clientInfoSchema = new mongoose.Schema({
  client: { type: String, trim: true },
  brandManager: { type: String, trim: true },
  region: { type: String, trim: true },
  category: { type: String, trim: true },
  launchWindow: { type: String, trim: true },
  duration: { type: String, trim: true },
  channels: { type: String, trim: true },
  mainObjective: { type: String, trim: true },
}, { _id: false });

const schema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  year: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true }, // This handles the "body" for the preview cards
  icon: {
    type: String,
    enum: ["billboard", "printer", "palette", "van", "curtain", "storefront", "star", "camera", "video", "share"],
    trim: true,
  },
  coverImage: { type: String, trim: true },
  images: { type: [String], default: [] },
  videoPlaceholder: { type: String, trim: true }, // Added for video text
  videoUrl: { type: String, default: null },
  overview: { type: String, trim: true },
  clientInfo: { type: clientInfoSchema, default: undefined },
  story: { type: String, trim: true },
  results: { type: [String], default: [] },
  deliverables: { type: [String], default: [] },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", schema);