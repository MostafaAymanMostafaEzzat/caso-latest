import { db } from "@/db";
import DesignOflient from "./design";
import { notFound, useSearchParams } from "next/navigation";


interface PageProps {
    searchParams:{
        [key:string]:string | string[] |undefined
    }
}
 
 export default async function({searchParams}:PageProps){
    
    const {id} =searchParams

    if (!id || typeof id !== 'string') {
        return notFound()
      }
    
    const userConfig =await db.configuration.findFirst({
        where:{
            id : id,

        }
    }
    )
    if (!userConfig) {
        return notFound()
      }

      const {width,height,imageUrl ,id:confId}=userConfig
    return(
        <DesignOflient width={width} height={height} imgUrl={imageUrl} configId={confId} />
    )
 }