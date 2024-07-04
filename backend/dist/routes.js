"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user/user");
const middleware_1 = require("./middleware");
const index_1 = __importDefault(require("./event/index"));
const registration_1 = __importDefault(require("./registration/registration"));
const router = (0, express_1.Router)();
router.post('user/signup', user_1.Signup);
router.post('/user/signin', user_1.Signin);
router.put('/user/updateuser', middleware_1.authenticateToken, user_1.UpdateUser);
router.post('/user/signout', middleware_1.authenticateToken, user_1.SignOut);
router.use('/event', index_1.default);
router.use('/registration', registration_1.default);
exports.default = router;
