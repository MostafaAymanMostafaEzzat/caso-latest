import { notFound } from "next/navigation"
import DesignPreview from "./DesignPreview"
import { db } from "@/db"

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
    if (!userConfig ) {
        return notFound()
      }

      const {color,croppedImageUrl,finish,material,id:ConfigID}=userConfig
      if ( !croppedImageUrl || !finish || !color || !material) {
        return notFound()
      }

    return(
        <DesignPreview color={color} croppedImageUrl={croppedImageUrl} finish={finish} material={material} ConfigId={ConfigID} />
    )
 }