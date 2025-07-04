'use client'
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import MaxWidthWithWrapper from "./MaxwidthWithWrapper"
import Phone from "./phone"
import { useInView } from "framer-motion"

import { cn } from "@/lib/utils"



const PHONES = [
    '/testimonials/1.jpg',
    '/testimonials/2.jpg',
    '/testimonials/3.jpg',
    '/testimonials/4.jpg',
    '/testimonials/5.jpg',
    '/testimonials/6.jpg',
  ]

  function splitArray(array:Array<string>,nunPart:number){
        const result:Array<Array<string>> = []
    for (let i = 0; i < array.length; i++) {
        
        const index = i % nunPart;
        // console.log(index);
        if(!result[index]){
            result[index]=[];
        }
        result[index].push(array[i])
        
    }
    return result
  }

interface ReviewProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc:string
}

const Review = ({imgSrc,className}:ReviewProps)=>{
return(
    <div className={cn("bg-slate-50 rounded-3xl p-4 m-3 shadow-xl shadow-slate-900/30",className)}>
        <Phone imgSrc={imgSrc} className="object-cover" />
    </div>
)
}



  
const ReviewColum = ({reviews,classNameFun,className , msPerPx} :{reviews:string[],classNameFun?:(photoRevIndex:number)=> string,className?:string,msPerPx:number})=>{
    const columeref =useRef<HTMLDivElement | null>(null)
    const [colHeight,setColHeight]=useState(0)

    useEffect(()=>{
        if (!columeref.current) return
        const ReSizeElement = new window.ResizeObserver((element)=>{
            setColHeight(columeref.current?.offsetHeight ?? 0)
        })
        ReSizeElement.observe(columeref.current)
        return(()=>{
            ReSizeElement.disconnect()
        })
    },[])
    
    return(
            <div className="animate-marquee " style={{'--marquee-animation':`${colHeight*msPerPx}ms`} as React.CSSProperties} ref={columeref}>

            { reviews.concat(reviews).map((photoReview,photoReviewIndex)=>(
                    <Review imgSrc={photoReview} className={classNameFun?.(photoReviewIndex % reviews.length)} key={photoReviewIndex}/>
                ))}
            </div>
    )
}



const ReviewsGrid = ()=>{
    const ref = useRef<HTMLDivElement | null>(null)
    const IsInview = useInView(ref,{once:true,amount:0.4})

        const colums = splitArray(PHONES,3)
        const colum1 =colums[0]
        const colum2 =colums[1]
        const colum3 =colums[2]


    return(
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start  h-[49rem] max-h-[150vh] overflow-hidden mb-10 " ref={ref} >
            {IsInview?(
                <>
                    <ReviewColum reviews={[...colum1 , ...colum3 , ...colum2]} 
                        classNameFun={(reviewIndex)=>{
                            console.log(reviewIndex >= 2)
                            return(
                                cn(
                                    {'md:hidden': reviewIndex >= 3,
                                    'lg:hidden': reviewIndex >= 2,}
                                )
                            )
                            }
                            }
                        msPerPx={10}      
                     />

                    <ReviewColum reviews={[ ...colum2, colum3[0]]}
                        // className='hidden md:block'
                    
                        classNameFun={(reviewIndex)=>
                                cn(
                                    {'lg:hidden': reviewIndex >= 2,}
                                )
                            }
                        msPerPx={15}      
                     />
                     <ReviewColum reviews={ colum3 } 
                        className='hidden md:block'

                        msPerPx={10}      
                     />                    
                </>
            ):null}
            <div className="bg-gradient-to-b from-slate-100 absolute inset-x-0 top-0 h-32"/>
            <div className="bg-gradient-to-t from-slate-100 absolute inset-x-0 bottom-0 h-32"/>
        </div>
    )
}


export default function Reviews () {
        return(
            <MaxWidthWithWrapper className="relative max-w-5xl pb-20 ">
                     <img
                       aria-hidden='true'
                        src='/what-people-are-buying.png'
                       className='absolute select-none hidden xl:block -left-32 top-1/3'
                    />
                    <ReviewsGrid/>
            </MaxWidthWithWrapper>
        )
}

  

            