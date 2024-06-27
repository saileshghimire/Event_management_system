"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const router = (0, express_1.Router)();
router.post('/user/signup', user_1.Signup);
router.post('/user/signin', user_1.Signin);
exports.default = router;
