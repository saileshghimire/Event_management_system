import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { signupInput,signinInput, updateInput } from "./validation/index";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "SAILESH"

const prisma = new PrismaClient();



export const Signup = async (req:Request, res:Response) => {
    const body = req.body;
    try{
    const validationResult = signupInput.safeParse(body);

    if(!validationResult.success){
        console.log(validationResult.error);
        
        return res.status(411).json({
            message:"Inputs are not correct"
        });
    }
    

        const existingUser = await prisma.user.findFirst({
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

export const UpdateUser = async (req:Request, res:Response) => {
    const userId = req.userId;
    const body = req.body;

    const validationResult = updateInput.safeParse(body);
    if(!validationResult.success){
        console.log(`Error at update input ${validationResult.error}`);
        return res.status(411).json({
            message:"Sorry wrong Input"
        });      
    }

    if(!userId){
        return res.status(400).json({
            message:"probelm in authencate token"
        });
    }
    try {
        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                password: body.password
            }
        });
        return res.status(200).json({ user: updatedUser });

    } catch(error){
        console.log(`Error at updateUser function: ${error}`);
        return res.status(500).json({ error: 'Internal server error' });
        
    }

}

export const SignOut = (req:Request, res:Response) =>{
    // 
}