
import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware';
import { CreateEventInput } from '../validation';


const event:Router = Router();
const prisma = new PrismaClient();

event.post('/',authenticateToken, async (req:Request, res:Response)=>{
    const userId = req.userId;
    const body = req.body;
    const validationResult = CreateEventInput.safeParse(body);
    if(!validationResult.success){
        console.log(`Error at event create input: ${validationResult.error}`);
        return res.status(400).json({
            message:"Input are not correct"
        });
        
    }
    
    try{
        const newevent = await prisma.event.create({            
            data:{
                name: body.name,
                description: body.description,
                date: body.date,
                location: body.location,  
                userId:userId                              
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


event.get('/bulk', async (req:Request, res:Response)=>{
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

event.get('',authenticateToken, async (req:Request, res:Response)=>{
    const userId = req.userId;
    try{
        const totalevent = await prisma.event.findFirst({
            where:{
                userId:userId
            }
        });
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

event.get('/:id', async (req:Request, res:Response)=>{
    const { id } = req.params;
    try{
        const event = await prisma.event.findFirst({
            where:{
                id: parseInt(id)
            }
        })

    }catch(error){
        console.log(`Error at getting event by id: ${error}`);
        return res.status(500).json({
            message:"Internal server Error"
        });
        
    }
});

export default event;