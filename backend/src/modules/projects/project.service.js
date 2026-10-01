import Project from "./project.model.js";
import mongoose from "mongoose";
export const list = ({ featured }) => Project.find({ isPublished: true, ...(featured === "true" ? { isFeatured: true } : {}) }).sort({ order: 1, year: -1, createdAt: -1 });
export const get = (id) => Project.findOne({ ...(mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }), isPublished: true });
export const create = (data) => Project.create(data);
export const update = (id, data) => mongoose.isValidObjectId(id) ? Project.findByIdAndUpdate(id, data, { new: true, runValidators: true }) : null;
export const remove = (id) => mongoose.isValidObjectId(id) ? Project.findByIdAndDelete(id) : null;
