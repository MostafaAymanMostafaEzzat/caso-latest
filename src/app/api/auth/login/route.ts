import { db } from "@/db";
import comparePassword from "@/utils/comparePassword";
import { CustomError } from "@/errors";
import createRefTokenAndAccToken from "@/utils/creat_refTokenAndAccToken";
const bcrypt = require('bcrypt');


export async function POST(req:Request) {
  try {
    const request = await req.json() 
  // console.log('NextResponse')
  const { email, password:canditatePassword } = request;

  if (!email || !canditatePassword) {
    return CustomError.BadRequestError('Please provide email and password');
  }
  const  user = await db.user.findUnique({
    where:{
      email:email
    }
  })
 
  if (!user) {
    return CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await comparePassword({canditatePassword, password:user.password!});
  if (!isPasswordCorrect) {
        return CustomError.UnauthenticatedError('Invalid Credentials');
  }

  if (!user.isVerified) {
    return CustomError.UnauthenticatedError('Please verify your email');
  }
   const tokenUser =  { userId: user.id, role: user.role , image: user.image, name: user.name };

//create refreshToken and accessToken
 return createRefTokenAndAccToken({user, req , tokenUser})
//  return res.status(StatusCodes.OK).json({ user: tokenUser });
    
  } catch (error) {
    return  CustomError.BadRequestError('somthing went wrong')
  }
  
  }