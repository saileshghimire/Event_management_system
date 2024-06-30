
import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware';


const event:Router = Router();
const prisma = new PrismaClient();

event.post('/events', async (req:Request, res:Response)=>{
    const userId = req.userId;
    const body = req.body;
    
    try{
        const newevent = await prisma.event.create({
            data:{
                name: body.name,
                description: body.description,
                date: body.date,
                location: body.location,                                
                }  
        });
        return res.status(200).json({
            message:"Event Created",
            event:newevent
        });

    } catch(error){
        console.log(`Error at creating Event: ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});


event.get('/events', async (req:Request, res:Response)=>{
    try{
        const totalevent = await prisma.event.findMany();
        return res.status(200).json({
            event:totalevent
        }); 

    }catch(error){
        console.log(`Error at getting events: ${error}`);
        return res.status(500).json({
            message:"Internal server error"
        });
        
    }
})

event.get('/events/:id', async (req:Request, res:Response)=>{
    // 
});

export default event;