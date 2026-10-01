import Service from "./service.model.js";
import mongoose from "mongoose";
export const list = () => Service.find({ isActive: true }).sort({ order: 1 });
export const get = (id) => mongoose.isValidObjectId(id) ? Service.findOne({ _id: id, isActive: true }) : null;
export const create = (data) => Service.create(data);
export const update = (id, data) =>
  mongoose.isValidObjectId(id) ? Service.findByIdAndUpdate(id, data, { new: true, runValidators: true }) : null;
export const remove = (id) => mongoose.isValidObjectId(id) ? Service.findByIdAndDelete(id) : null;
