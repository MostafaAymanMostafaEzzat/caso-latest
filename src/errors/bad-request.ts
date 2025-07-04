import { StatusCodes } from 'http-status-codes';


// export default class BadRequestError extends CustomAPIError {
//   statusCode:number
//   constructor(message:string) {
//     super(message);
//     this.statusCode = StatusCodes.BAD_REQUEST;
//   }
// }


export default function BadRequestError(message:string){
   return Response.json({message},{status:StatusCodes.BAD_REQUEST})
}