'use server'

import { db } from "@/db";
import {  isTokenValid } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authenticateUser_ServerComponent = async () => {
  
  const [refreshToken, accessToken] = cookies().getAll();
  if (!refreshToken) {
    console.log(!refreshToken)
    console.log("refreshToken 1")
    return null;
  }
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken.value) as JwtPayload;

      return payload?.user;
    }
    const payload = isTokenValid(refreshToken.value) as JwtPayload;
 

    const existingToken = await db.token.findFirst({
      where: {
        userId: payload?.user?.userId,
        refreshToken: payload?.refreshToken,
      },
    });  
    console.log('existingToken')



    if (!existingToken || !existingToken.isValid) {
      return null;
      
    }
    return payload.user;
  } catch (error) {
    console.log(error)
    return null;
  }
};
