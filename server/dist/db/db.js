"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.query = exports.dbimport = exports.dbconnect = exports.dbinit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menuModel_1 = require("./menuModel");
const data_1 = require("./data");
const dbinit = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            yield (0, exports.dbconnect)();
        }
        yield (0, exports.dbimport)();
    }
    catch (e) {
        console.log("Failed to create db connection and import data", e);
    }
});
exports.dbinit = dbinit;
const dbconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose_1.default.connect("mongodb://localhost:27017/boba_shop");
    }
    catch (e) {
        console.log("Failed to connect to database", e);
    }
});
exports.dbconnect = dbconnect;
const dbimport = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            yield (0, exports.dbconnect)();
        }
        data_1.data.map((elm) => {
            new menuModel_1.MenuItem(elm).save();
        });
    }
    catch (e) {
        console.log("Failed to import data to database", e);
    }
});
exports.dbimport = dbimport;
const query = (q) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            yield (0, exports.dbconnect)();
        }
        return menuModel_1.MenuItem.find(q);
    }
    catch (e) {
        console.log("Failed to query database", e);
    }
});
exports.query = query;
const add = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const item1 = new menuModel_1.MenuItem(item);
    try {
        yield item1.save();
    }
    catch (e) {
        console.log("Failed to add item to database", e);
    }
});
exports.add = add;
