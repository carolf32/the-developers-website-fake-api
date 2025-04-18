"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(50),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
    createdAt: zod_1.z.date(),
});
exports.userCreateSchema = exports.userSchema.omit({ id: true, createdAt: true });
exports.userLoginSchema = exports.userSchema.pick({ email: true, password: true });
exports.userUpdateSchema = exports.userSchema
    .partial()
    .omit({ id: true, createdAt: true });
exports.userReturnSchema = exports.userSchema.omit({ password: true });
