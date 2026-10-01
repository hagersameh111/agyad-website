import Gallery from "./gallery.model.js";
import mongoose from "mongoose";
export const list = (category) => Gallery.find({ isActive: true, ...(category && category !== "الكل" && category !== "all" ? { category } : {}) }).sort({ order: 1 });
export const get = (id) => mongoose.isValidObjectId(id) ? Gallery.findOne({ _id: id, isActive: true }) : null;
export const create = (data) => Gallery.create(data);
export const update = (id, data) => mongoose.isValidObjectId(id) ? Gallery.findByIdAndUpdate(id, data, { new: true, runValidators: true }) : null;
export const remove = (id) => mongoose.isValidObjectId(id) ? Gallery.findByIdAndDelete(id) : null;
