'use server'

import { db } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignOut(user: {userId:string, role : string}){

    await db.token.delete({ 
      where:{
        userId:user.userId
      }
    });
    cookies().set('accessToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    cookies().set('refreshToken', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

redirect('/')

  }