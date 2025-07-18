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
exports.deleteFoundReport = exports.updateFoundReport = exports.getFoundReportById = exports.getFoundReport = exports.createFoundReport = void 0;
const FoundReport_1 = __importDefault(require("../infrastructure/schemas/FoundReport"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const createFoundReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReport = yield FoundReport_1.default.create(req.body);
        if (foundReport) {
            return res.status(201).json(foundReport).send();
        }
        return res.status(200).send("Something went wrong");
    }
    catch (error) {
        next(error);
    }
});
exports.createFoundReport = createFoundReport;
const getFoundReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundReport = yield FoundReport_1.default.find().populate('category');
        if (!foundReport) {
            throw new not_found_error_1.default("Could not find FoundReports");
        }
        return res.status(200).json(foundReport).send();
    }
    catch (error) {
        next(error);
    }
});
exports.getFoundReport = getFoundReport;
const getFoundReportById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const foundReport = yield FoundReport_1.default.findById(id).populate('category');
        if (!foundReport) {
            throw new not_found_error_1.default("Could not find FoundReport");
        }
        return res.status(200).json(foundReport).send();
    }
    catch (error) {
        next(error);
    }
});
exports.getFoundReportById = getFoundReportById;
const updateFoundReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const foundReport = yield FoundReport_1.default.findByIdAndUpdate(id, req.body);
        if (!foundReport) {
            throw new not_found_error_1.default("Could not find FoundReport");
        }
        return res.status(200).json(foundReport).send("Your found report has been updated");
    }
    catch (error) {
        next(error);
    }
});
exports.updateFoundReport = updateFoundReport;
const deleteFoundReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const foundReport = yield FoundReport_1.default.findByIdAndDelete(id);
        if (!foundReport) {
            throw new not_found_error_1.default("Could not find FoundReport");
        }
        return res.status(200).send("You have successfully deleted the report");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFoundReport = deleteFoundReport;
