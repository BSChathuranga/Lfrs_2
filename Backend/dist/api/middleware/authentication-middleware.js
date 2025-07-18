"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthonticated = void 0;
const express_1 = require("@clerk/express");
const isAuthonticated = (req, res, next) => {
    if (!(0, express_1.getAuth)(req).userId) {
        throw new Error(`User not authenticated`);
    }
    next();
};
exports.isAuthonticated = isAuthonticated;
