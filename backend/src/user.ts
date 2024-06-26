import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { signupInput,signinInput } from "./validation/index";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "SAILESH"

const prisma = new PrismaClient();



export const Signup = async (req:Request, res:Response) => {
    const body = req.body;
    const { success } = signupInput.safeParse(body);

    if(!success){
        return res.status(411).json({
            message:"Inputs are not correct"
        });
    }
    try{

        const existingUser = await prisma.user.findUnique({
            where: { email:body.email },
          });
      
        if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
        }

        const newuser = await prisma.user.create({
            data:{
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phoneNumber,
                password: body.password
            }
        });

        const token = jwt.sign({userId:newuser.id}, JWT_SECRET);
        return res.status(200).json({
            token:token
        });

    } catch(error){
        console.log(`Error at signup function: ${error}`);
        return res.status(500).json({
            error:"'Internal server error'"
        })
        
    }


}


export const Signin = async (req:Request, res:Response) =>{
    const body = req.body;
    const { success } = signinInput.safeParse(body);
    if(!success){
        return res.status(400).json({
            message:"Input not correct"
        });
    }

    try{
        const user = await prisma.user.findFirst({
            where:{
                email:body.email,
                password:body.password
            }
        });
    
        if(user){
            const token = jwt.sign({userId:user.id}, JWT_SECRET);
                return res.status(200).json({
                    token:token
                });           
        } else{
            return res.status(400).json({
                message:"Email or password is incorrect"
            })
        }
    } catch(error){
        console.log(`Error at signin function: ${error}`);
        
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
