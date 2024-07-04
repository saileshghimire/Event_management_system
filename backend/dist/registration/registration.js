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
const registration = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
registration.post('/', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const body = req.body;
    try {
        const registration = yield prisma.registration.create({
            data: {
                userId: userId,
                eventId: body.eventId
            }
        });
        return res.status(200).json({
            message: "Registration Complete"
        });
    }
    catch (error) {
        console.log(`Error at registration function: ${error}`);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}));
registration.get('/:id', middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const eventId = parseInt(req.params.id);
    try {
        const event = yield prisma.event.findFirst({
            where: {
                id: eventId
            },
            select: {
                userId: true
            }
        });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const registrations = yield prisma.registration.findMany({
            where: { eventId },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phoneNumber: true
                    }
                }
            },
        });
        return res.status(200).json({
            registrations: registrations
        });
    }
    catch (error) {
        console.log(`Error at getting registration details:${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
exports.default = registration;
