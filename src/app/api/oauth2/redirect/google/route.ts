import { oauth2Client } from "@/lib/googleAuth";
import { NextRequest } from "next/server";
import { google } from "googleapis";
import { db } from "@/db";

import createRefTokenAndAccToken from "@/utils/creat_refTokenAndAccToken";
import { image } from "framer-motion/client";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    // console.log("Query:", searchParams);
    let { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // console.log("Tokens:", tokens);
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data: userInfo } = await oauth2.userinfo.get();
    // console.log("User Info:", userInfo);
    const user = await db.user.findUnique({
      where: {
        email: userInfo.email!,
      },
    });
    if (user) {
      // console.log("New User Created:", user);

      const tokenUser = { userId: user.id, role: user.role , image: user.image, name: user.name };
       //create refreshToken and accessToken
      return createRefTokenAndAccToken({ user, req, tokenUser , google: true , Link: state! });
    } else {
      // first registered user is an admin
      const isFirstAccount = (await db.user.count()) === 0;
      const role = isFirstAccount ? "admin" : "user";
      // If user does not exist, create a new user
      const newUser = await db.user.create({
        data: {
          email: userInfo.email!,
          name: userInfo.name!,
          image: userInfo.picture!,
          isVerified: true, // Assuming you want to set this to true
          role: role,
        },
      });
      // console.log("New User Created:", newUser);
      const tokenUser = { userId: newUser.id, role: newUser.role , image: newUser.image, name: newUser.name };
       //create refreshToken and accessToken
      return createRefTokenAndAccToken({ user: newUser, req, tokenUser , google: true , Link: state! });
    }

   
  } catch (error) {}
};
