"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./infrastructure/db");
require("dotenv/config");
const lostItems_1 = require("./api/lostItems");
const foundItems_1 = require("./api/foundItems");
const category_1 = require("./api/category");
const global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
const app = (0, express_1.default)();
const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.VITE_CLERK_SECRET_KEY;
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)({
    publishableKey, secretKey
}));
app.use((0, cors_1.default)({ origin: `https://lfrs-venura-denethpriyas-projects.vercel.app` }));
//Pre-middleware
app.use((req, res, next) => {
    console.log("Request received");
    console.log(req.method, req.url);
    next();
});
app.use('/api/lostitem', lostItems_1.lostRouter);
app.use('/api/founditem', foundItems_1.foundRouter);
app.use('/api/category', category_1.categoryRounter);
app.use(global_error_handling_middleware_1.default);
(0, db_1.connectDB)();
app.listen(8000, () => console.log('Server running on port 8000'));
