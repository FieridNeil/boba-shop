import Mongoose from "mongoose";
import { IMenu } from "../interfaces";

const menuSchema = new Mongoose.Schema<IMenu>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export const MenuItem = Mongoose.model<IMenu>("Menu", menuSchema);
