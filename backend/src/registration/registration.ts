import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware';

const registration:Router = Router();
const prisma = new PrismaClient();

registration.post('/',authenticateToken, async (req:Request, res:Response)=>{
    const userId = req.userId;
    const body = req.body;

    try{
        const registration = await prisma.registration.create({
            data:{
                userId:userId,
                eventId: body.eventId
            }
        });
        return res.status(200).json({
            message:"Registration Complete"
        })
    } catch(error){
        console.log(`Error at registration function: ${error}`);
        return res.status(500).json({
            message:"Internal Server error"
        });
        
    }

});


registration.get('/:id', authenticateToken, async (req:Request, res:Response)=>{
    const userId= req.userId;
    const eventId = parseInt(req.params.eventId);
    try{
        const event = await prisma.event.findFirst({
            where:{
                id:eventId
            },
            select:{
                userId:true
            }
            
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const registrations = await prisma.registration.findMany({
            where: { eventId },
            include: { user: true },
        });

        return res.status(200).json({
            registrations:registrations
        });

    } catch(error){
        console.log(`Error at getting registration details:${error}`);
        return res.status(500).json({
            message:"Internal server error"
        });
        
    }
})

export default registration;