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
exports.Signin = exports.Signup = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("./validation/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "SAILESH";
const prisma = new client_1.PrismaClient();
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const validationResult = index_1.signupInput.safeParse(body);
        if (!validationResult.success) {
            console.log(validationResult.error);
            return res.status(411).json({
                message: "Inputs are not correct"
            });
        }
        const existingUser = yield prisma.user.findFirst({
            where: { email: body.email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newuser = yield prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phoneNumber,
                password: body.password
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: newuser.id }, JWT_SECRET);
        return res.status(200).json({
            token: token
        });
    }
    catch (error) {
        console.log(`Error at signup function: ${error}`);
        return res.status(500).json({
            error: "'Internal server error'"
        });
    }
});
exports.Signup = Signup;
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = index_1.signinInput.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Input not correct"
        });
    }
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET);
            return res.status(200).json({
                token: token
            });
        }
        else {
            return res.status(400).json({
                message: "Email or password is incorrect"
            });
        }
    }
    catch (error) {
        console.log(`Error at signin function: ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
exports.Signin = Signin;
