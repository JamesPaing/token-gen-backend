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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const token_1 = require("./services/token");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.post('/generate-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, companyName, designation, answer } = req.body;
    let token;
    while (true) {
        token = (0, token_1.generateRandomID)();
        const user = yield prisma.participant.findUnique({
            where: {
                token,
            },
        });
        if (!user) {
            break;
        }
    }
    const participant = yield prisma.participant.create({
        data: {
            name,
            token,
            phoneNumber,
            companyName,
            designation,
            answer,
        },
    });
    res.status(201).json({
        participant,
    });
}));
app.listen(process.env.PORT, () => {
    console.log(`App is listening at port ${process.env.PORT}...`);
});
//# sourceMappingURL=index.js.map