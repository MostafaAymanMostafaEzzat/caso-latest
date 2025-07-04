import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface phoneProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc:string,
    dark?:boolean
}



export default function ({className,imgSrc,dark=false,...props}:phoneProps){

    return(

        <div className={cn('relative z-50 pointer-events-none',className)}>
            <img src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        } alt=""   className=" w-full"/>
            <img src={imgSrc} alt="" className="object-cover w-full -z-10 absolute inset-0"/>
        </div>
    )

    

}