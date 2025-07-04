'use client'


import { Button } from "./button";
import { returnAndStartFromTheEnd } from "./returnAndStartFromTheEnd";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"

export default function AuthButton({to , setopen}:{to :string , setopen?:any}){
    const router = useRouter()
    const cuurentRoute = usePathname()
    const searchParams = useSearchParams()

    console.log(searchParams.values())

return(

        <Button
    variant='ghost'
size='sm'
onClick={()=>{
  if(setopen) setopen(false)
  returnAndStartFromTheEnd(cuurentRoute + "?"+searchParams.toString() );
  router.push(`/auth/${to}`)
}}
>
{to}
</Button>

)
}