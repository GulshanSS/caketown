import mongoose from "mongoose";
import ICategory from "../interfaces/asset.interface";
import ITimeStamp from "../interfaces/timestamp.interface";

export interface CategoryDoc extends ICategory, ITimeStamp, mongoose.Document {}

const CategorySchema = new mongoose.Schema({});

const CategoryModel = mongoose.model<CategoryDoc>("category", CategorySchema);

export default CategoryModel;
