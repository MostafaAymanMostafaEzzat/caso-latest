import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

// export default  class UnauthenticatedError extends CustomAPIError {
//   statusCode:number

//   constructor(message :string) {
//     super(message);
//     this.statusCode = StatusCodes.UNAUTHORIZED;
//   }
// }

export default function UnauthenticatedError(message:string){
  return NextResponse.json({message},{status:StatusCodes.UNAUTHORIZED})
}