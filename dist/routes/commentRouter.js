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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const comment_services_1 = require("../services/comment.services");
const comment_controller_1 = require("../controllers/comment.controller");
const isUserIdValid_middeware_1 = require("../middlewares/isUserIdValid.middeware");
const isCommentIdValid_middleware_1 = require("../middlewares/isCommentIdValid.middleware");
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
exports.commentRouter = (0, express_1.Router)();
tsyringe_1.container.registerSingleton("CommentServices", comment_services_1.CommentServices);
const commentController = tsyringe_1.container.resolve(comment_controller_1.CommentController);
exports.commentRouter.post("/devs/:devId/comments", validateToken_middleware_1.ValidateToken.execute, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield commentController.createComment(req, res); }));
exports.commentRouter.get("/devs/:devId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield commentController.getCommentByDev(req, res); }));
exports.commentRouter.delete("/comments/:commentId", validateToken_middleware_1.ValidateToken.execute, isUserIdValid_middeware_1.IsUserIdValid.execute, isCommentIdValid_middleware_1.IsCommentIdValid.execute, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield commentController.removeComment(req, res); }));
