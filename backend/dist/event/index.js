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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
const event = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
event.post('/', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const body = req.body;
    const validationResult = validation_1.CreateEventInput.safeParse(body);
    if (!validationResult.success) {
        console.log(`Error at event create input: ${validationResult.error}`);
        return res.status(400).json({
            message: "Input are not correct"
        });
    }
    try {
        const newevent = yield prisma.event.create({
            data: {
                name: body.name,
                description: body.description,
                date: body.date,
                location: body.location,
                userId: userId
            }
        });
        return res.status(200).json({
            message: "Event Created",
            event: newevent
        });
    }
    catch (error) {
        console.log(`Error at creating Event: ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
event.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalevent = yield prisma.event.findMany();
        return res.status(200).json({
            event: totalevent
        });
    }
    catch (error) {
        console.log(`Error at getting events: ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
event.get('', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const totalevent = yield prisma.event.findFirst({
            where: {
                userId: userId
            }
        });
        return res.status(200).json({
            event: totalevent
        });
    }
    catch (error) {
        console.log(`Error at getting events: ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
event.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const event = yield prisma.event.findFirst({
            where: {
                id: parseInt(id)
            }
        });
    }
    catch (error) {
        console.log(`Error at getting event by id: ${error}`);
        return res.status(500).json({
            message: "Internal server Error"
        });
    }
}));
exports.default = event;
