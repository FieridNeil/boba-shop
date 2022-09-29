import Mongoose from "mongoose";
import { IMenu } from "../interfaces";
import { MenuItem } from "./menuModel";
import { data } from "./data";

export const dbinit = async () => {
  try {
    if (Mongoose.connection.readyState !== 1) {
      await dbconnect();
    }
    await dbimport();
  } catch (e) {
    console.log("Failed to create db connection and import data", e);
  }
};

export const dbconnect = async () => {
  try {
    return await Mongoose.connect("mongodb://localhost:27017/boba_shop");
  } catch (e) {
    console.log("Failed to connect to database", e);
  }
};

export const dbimport = async () => {
  try {
    if (Mongoose.connection.readyState !== 1) {
      await dbconnect();
    }
    data.map((elm) => {
      new MenuItem(elm).save();
    });
  } catch (e) {
    console.log("Failed to import data to database", e);
  }
};

export const query = async (q: {}) => {
  try {
    if (Mongoose.connection.readyState !== 1) {
      await dbconnect();
    }
    return MenuItem.find(q);
  } catch (e) {
    console.log("Failed to query database", e);
  }
};

export const add = async (item: IMenu) => {
  const item1 = new MenuItem(item);
  try {
    await item1.save();
  } catch (e) {
    console.log("Failed to add item to database", e);
  }
};
