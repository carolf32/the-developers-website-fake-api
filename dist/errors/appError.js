"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appError = void 0;
class appError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.appError = appError;
