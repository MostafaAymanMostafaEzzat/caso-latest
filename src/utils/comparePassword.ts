import { db } from "@/db";

import bcrypt from 'bcrypt';

export default async function comparePassword ({canditatePassword , password }:{canditatePassword:string, password:string}) {
    const isMatch = await bcrypt.compare(canditatePassword, password);
    return isMatch;
  };