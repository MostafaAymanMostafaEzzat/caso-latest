import { db } from "@/db";
import crypto from 'crypto'
import { attachCookiesToResponse } from "@/utils/jwt";
import { CustomError } from "@/errors";
import { NextResponse } from "next/server";


const bcrypt = require('bcrypt');


export default async function createRefTokenAndAccToken({user, req , tokenUser , google = false , Link}: {user:any, req:Request , tokenUser:{ userId: string, role: string , image:string | null ,name:string } , google?: boolean, Link?: string}) {

    let refreshToken=''
  //check if there are existingToken for that user
  const existingToken=await db.token.findUnique({
    where:{
      userId:user.id
    }
  })
  // const existingToken=await Token.findOne({user:user._id})
  if(existingToken){
    if(!existingToken.isValid){
    return CustomError.UnauthenticatedError('your account is blocked');
    }
    refreshToken=existingToken.refreshToken;
    attachCookiesToResponse({ user: { ...tokenUser, image: tokenUser.image ?? "" }, refreshToken });
     if(google){
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${Link}` || process.env.NEXT_PUBLIC_SERVER_URL!
    );

  }else{
    return Response.json({ user: tokenUser },{status:200})
  }
    
  }
  refreshToken= crypto.randomBytes(40).toString('hex');
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const userAgent = req.headers.get('user-agent')!;

  const token = await db.token.create({
    data:{
      refreshToken,ip,userAgent,userId:user.id
    }
  })
  // const token = await Token.create({refreshToken,ip,userAgent,user:user._id})

  attachCookiesToResponse({ user: tokenUser , refreshToken });
  if(google){
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${Link}` || process.env.NEXT_PUBLIC_SERVER_URL!
    );

  }else{
    return Response.json({ user: tokenUser },{status:200})
  }


}