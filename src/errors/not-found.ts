import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

// export default class NotFoundError extends CustomAPIError {
//   statusCode:number
//   constructor(message:string) {
//     super(message);
//     this.statusCode = StatusCodes.NOT_FOUND;
//   }
// }

export default function NotFoundError(message:string){
  return NextResponse.json({message},{status:StatusCodes.NOT_FOUND})
}