"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomID = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateRandomID() {
    const buffer = crypto_1.default.randomBytes(3);
    const hexString = buffer.toString('hex');
    const randomID = hexString.slice(0, 6);
    return randomID;
}
exports.generateRandomID = generateRandomID;
//# sourceMappingURL=token.js.map