import { NextRequest, NextResponse } from "next/server";
import { oauth2Client  } from "@/lib/googleAuth";


export async function POST(req:NextRequest) {
try {
  const {state} = await req.json();
    // console.log("State:", state)
const scopes = [
  'openid',
  'email',
'profile',
];


 const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
  state: state
});

  return NextResponse.json(authorizationUrl,{status:200})
} catch (error) {

       console.error("OAuth2 redirect error:", error);
    return new Response("Authentication failed", { status: 500 });
}
    
}