"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
router.post('/user/signup', user_1.Signup);
router.post('/user/signin', user_1.Signin);
router.post('/user/updateuser', middleware_1.authenticateToken, user_1.UpdateUser);
exports.default = router;
