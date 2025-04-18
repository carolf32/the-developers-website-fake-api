"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const commentRouter_1 = require("./routes/commentRouter");
const userRouter_1 = require("./routes/userRouter");
const handleErrors_middleware_1 = require("./middlewares/handleErrors.middleware");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", commentRouter_1.commentRouter);
app.use("/api/users", userRouter_1.userRouter);
const errorHandler = (error, req, res, next) => {
    handleErrors_middleware_1.HandleErrors.execute(error, req, res, next);
};
app.use(errorHandler);
exports.default = app;
