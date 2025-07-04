import { db } from "@/db";
import { CustomError } from "@/errors";

export async function POST(req: Request): Promise<Response> {
 try {
  const request = await req.json();
  const { email, verificationToken } = request;
  const email_ =decodeURIComponent(email)
console.log('1')
console.log(email)
console.log(email_)
  if (!email_ || !verificationToken) {
console.log('2')

    return  CustomError.BadRequestError('somthing went wrong')
    
  }
  const user = await db.user.findFirst({
    where: {
      email: email_,
    },
  });
console.log('3')
console.log(user)


  if (!user) {
console.log('4')


    return CustomError.UnauthenticatedError('Verification Failed');
  }
console.log('5')

  if (verificationToken !== user.verificationToken) {
    return CustomError.UnauthenticatedError('Verification Failed');
  }
  console.log('6')

  await db.user.update({
    where: {
      email: email_,
    },
    data: {
      isVerified: true,
      verifiedDate: new Date(Date.now()),
      verificationToken: "",
    },
  });
console.log('7')
  

  return Response.json({ msg: "Email Verified" }, { status: 200 });
 } catch (error) {
console.log('8')

  return  CustomError.BadRequestError('somthing went wrong')
 }
}
