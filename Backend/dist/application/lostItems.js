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
exports.getLostProductByCategory = exports.UpdateReport = exports.deleteLostReport = exports.getLostReportById = exports.geTLostReport = exports.createLostReport = void 0;
const LostReport_1 = __importDefault(require("../infrastructure/schemas/LostReport"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const createLostReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const createdBy = getAuth(req).userId;
        //const report = await LostReport.create({createdBy, ...req.body})
        const report = yield LostReport_1.default.create(req.body);
        if (report) {
            return res.status(201).json({ message: "You have successfully created a report" });
        }
        return res.status(200).json({ message: 'Something went wrong try again' });
    }
    catch (error) {
        next(error);
    }
});
exports.createLostReport = createLostReport;
const geTLostReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lostReport = yield LostReport_1.default.find().populate('category').populate('nearestPoliceStation', 'name');
        if (!lostReport) {
            throw new not_found_error_1.default("Lost reports not found");
        }
        return res.status(200).json(lostReport).send();
    }
    catch (error) {
        next(error);
    }
});
exports.geTLostReport = geTLostReport;
const getLostReportById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lostReport = yield LostReport_1.default.findById(id).populate('category');
        if (!lostReport) {
            throw new not_found_error_1.default("Lost report not found");
        }
        return res.status(200).json(lostReport);
    }
    catch (error) {
        next(error);
    }
});
exports.getLostReportById = getLostReportById;
const deleteLostReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lostReport = yield LostReport_1.default.findByIdAndDelete(id);
        if (!lostReport) {
            throw new not_found_error_1.default("Lost report not found");
        }
        return res.status(200).send("You have successfully deleted the report");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteLostReport = deleteLostReport;
const UpdateReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const lostReport = yield LostReport_1.default.findByIdAndUpdate(id, req.body);
        if (!lostReport) {
            throw new not_found_error_1.default("Lost report not found");
        }
        return res.status(200).json(lostReport).send("You have successfully updated the report status");
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateReport = UpdateReport;
const getLostProductByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        const lostReport = yield LostReport_1.default.find({ category });
        if (!lostReport) {
            throw new not_found_error_1.default("Lost report not found");
        }
        return res.status(200).json(lostReport).send();
    }
    catch (error) {
        next(error);
    }
});
exports.getLostProductByCategory = getLostProductByCategory;
