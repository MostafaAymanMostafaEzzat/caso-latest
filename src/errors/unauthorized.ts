import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

// export default  class UnauthorizedError extends CustomAPIError {
//   statusCode:number

//   constructor(message:string) {
//     super(message);
//     this.statusCode = StatusCodes.FORBIDDEN;
//   }
// }

export default function UnauthorizedError(message:string){
  return NextResponse.json({message},{status:StatusCodes.BAD_REQUEST})
}