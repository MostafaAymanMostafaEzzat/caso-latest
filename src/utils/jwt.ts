
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import jwt from'jsonwebtoken';

const createJWT = ({ payload } : {payload :{}}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ( token : string ) => jwt.verify( token, process.env.JWT_SECRET!);

export function attachCookiesToResponse ({ user ,refreshToken } :{ user:{ userId:string, role: string , image:string | null , name: string } ,refreshToken:string }) {
  const accessTokenJWT  = createJWT({ payload: {user} });
  const refreshTokenJWT  = createJWT({ payload: {user,refreshToken} });

  const oneDay = 1000 * 60 * 60 * 24;

  cookies().set('accessToken', accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 3),
    // secure: true,
    sameSite:true
  });
  cookies().set('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure: true,
    sameSite:true

  });
};