import { db } from "@/db";
import { notFound } from "next/navigation";
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import { sendVerificationEmail } from "@/utils/sendVerficationEmail";
import crypto from "crypto";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { CustomError } from "@/errors";

export async function POST(req: Request): Promise<Response> {
 try {
  const request = await req.json();
  const { email, name, password } = request;

  if (!email || !name || !password) {
    return CustomError.BadRequestError(
      "Please provide email and password and name"
    );
  }
  if (!validator.isEmail(email)) {
    return CustomError.BadRequestError(
      "Please provide vaild email "
    );
  }


  const emailAlreadyExists = await db.user.findFirst({
    where: {
      email: email,
    },
  });


  if (emailAlreadyExists) {
    return CustomError.BadRequestError("Email already exists , please choose another value ");
  }

  // first registered user is an admin
  const isFirstAccount = (await db.user.count()) === 0;


  const role = isFirstAccount ? "admin" : "user";
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(40).toString("hex");
console.log('verificationToken')
console.log(verificationToken)
  const user = await db.user.create({
    data: {
      email: email,
      role: role,
      password: passwordHashed,
      name: name,
      verificationToken: verificationToken,
    },
  });

  //send Email
console.log('sendVerificationEmail')
console.log(user)
  
  await sendVerificationEmail({
    email: user.email,
    verificationToken,
    origin: process.env.NEXT_PUBLIC_SERVER_URL!,
  });


  return Response.json({ msg: "done" }, { status: 201 });
 } catch (error) {
  console.log(error)
  return  CustomError.BadRequestError('somthing went wrong')
  
 }
}
