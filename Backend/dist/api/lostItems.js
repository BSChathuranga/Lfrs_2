"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lostRouter = void 0;
const express_1 = __importDefault(require("express"));
const lostItems_1 = require("../application/lostItems");
const utils_1 = require("../utils");
exports.lostRouter = express_1.default.Router();
exports.lostRouter
    .route('/')
    /*.post(asyncHandler(async (req, res, next) => {
        await isAuthonticated(req, res, next);
        await createLostReport(req, res, next);
    }))*/
    .post((0, utils_1.asyncHandler)(lostItems_1.createLostReport))
    .get((0, utils_1.asyncHandler)(lostItems_1.geTLostReport));
exports.lostRouter
    .route('/:id')
    .get((0, utils_1.asyncHandler)(lostItems_1.getLostReportById))
    .patch((0, utils_1.asyncHandler)(lostItems_1.UpdateReport))
    .delete((0, utils_1.asyncHandler)(lostItems_1.deleteLostReport))
    .get((0, utils_1.asyncHandler)(lostItems_1.getLostProductByCategory));
