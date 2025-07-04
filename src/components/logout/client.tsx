'use client'

import { Dispatch, SetStateAction } from "react";
import { Button, buttonVariants } from "../button"
import { SignOut } from "./action"
import { useRouter } from "next/router";



export function LogoutButton ({user ,setopen }:{user:{userId:string,role:string , } ,setopen? : any}){
    const router = useRouter
    return(
    <Button
        variant='ghost'
    onClick={()=>{setopen && setopen(false) ;SignOut(user); localStorage.removeItem("returnedURL") }}
  >
    Sign out
  </Button>
    )
}