import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const registration:Router = Router();
const prisma = new PrismaClient();



export default registration;