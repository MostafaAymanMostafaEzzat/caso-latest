import { db } from "@/db";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendResetPasswordEmail } from "@/utils/sendResetPasswordEmail";
import { CustomError } from "@/errors";

export async function POST(req: Request) {
  try {
    const request = await req.json();

  const { email } = request;
  if (!email) {
    return CustomError.BadRequestError('Please provide email  ');
  }

  const user = await db.user.findUnique({ where: { email } });

  if (user) {
    const passwordToken = crypto.randomBytes(60).toString("hex");
    await db.user.update({
      where: { email },
      data: {
        passwordToken,
        passwordTokenExpirationDate: new Date(Date.now() + 1000 * 60 * 5),
      },
    });

    await sendResetPasswordEmail({
      email: user.email,
      verificationToken: passwordToken,
      origin: process.env.NEXT_PUBLIC_SERVER_URL!,
    });
  }

  return Response.json(
    { message: "Please check your email for reset password link" },
    { status: 200 }
  );
  } catch (error) {
    return  CustomError.BadRequestError('somthing went wrong')
  }
}
