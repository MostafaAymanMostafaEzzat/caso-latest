import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { error } from 'console';

export async function GET() {
cookies().set('test','toooooooooooooooooo')
// throw new Error('lllllllllll')
  return Response.json({message:'kkkkkkkkkkkkkkk'},{status:500});
}