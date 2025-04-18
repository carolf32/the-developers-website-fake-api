"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserService = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const user_schema_1 = require("../schemas/user.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
let UserService = class UserService {
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(id);
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new appError_1.appError(404, "User not found");
            }
            return user_schema_1.userReturnSchema.parse(user);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findMany();
            return users.map((user) => user_schema_1.userReturnSchema.parse(user));
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_1.prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            if (userExists) {
                throw new appError_1.appError(404, "User already exists");
            }
            const newUser = Object.assign({}, body);
            const user = yield prisma_1.prisma.user.create({ data: newUser });
            return user_schema_1.userReturnSchema.parse(user);
        });
    }
    loginUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            if (!user) {
                throw new appError_1.appError(404, "User not found");
            }
            if (user.password !== body.password) {
                throw new appError_1.appError(404, "Email or password invalid");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
            }, process.env.JWT_SECRET);
            return { acessToken: token, user: user_schema_1.userReturnSchema.parse(user) };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(id);
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new appError_1.appError(404, "User not found");
            }
            yield prisma_1.prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = Number(id);
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new appError_1.appError(404, "User not found");
            }
            const userUpdated = yield prisma_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: body,
            });
            return user_schema_1.userReturnSchema.parse(userUpdated);
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)()
], UserService);
