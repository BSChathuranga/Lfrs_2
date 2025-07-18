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
exports.updateCategory = exports.deleteCategory = exports.getCategories = exports.createCaregory = void 0;
const Category_1 = __importDefault(require("../infrastructure/schemas/Category"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const createCaregory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const caategory = yield Category_1.default.create(req.body);
        if (Category_1.default) {
            return res.status(201).json(caategory).send("You have created a new category");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createCaregory = createCaregory;
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.find();
        if (!category) {
            throw new not_found_error_1.default(`Category not found`);
        }
        return res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield Category_1.default.findByIdAndDelete(id);
        if (!category) {
            throw new not_found_error_1.default(`Category not found`);
        }
        return res.status(200).send("You successfully deleteed the category");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield Category_1.default.findByIdAndUpdate(id, req.body);
        if (!category) {
            throw new not_found_error_1.default("Category not found");
        }
        return res.status(200).json(category).send("You have updated the category");
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
