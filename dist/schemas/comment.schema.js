"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreateSchema = exports.commentSchema = void 0;
const zod_1 = require("zod");
exports.commentSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    content: zod_1.z.string().min(1).max(500),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    devId: zod_1.z.number().positive().min(1).max(4),
    userId: zod_1.z.number().positive(),
});
exports.commentCreateSchema = exports.commentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
