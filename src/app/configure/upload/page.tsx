'use client'

import { Progress } from "@/components/ui/progress";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { div, section } from "framer-motion/client";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";



export default function(){
    const {toast} = useToast()
    const router =useRouter()
    const { startUpload, isUploading } = useUploadThing(
        "imageUploader",
        {
          onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId
            // console.log(data)
            // alert("uploaded successfully!");
            setIspending(() => {
                router.push(`/configure/design?id=${configId}`)
              })
          },
          onUploadProgress(p) {
            //   console.log(p);
              setUploadProgress(p)
          },
        //   onUploadError: () => {
        //     alert("error occurred while uploading");
        //   },
        //   onUploadBegin: () => {
        //     alert("upload has begun");
        //   },
        },
      );
      const [isDrag,setIsDrag] =useState(false)
      const [uploadProgress, setUploadProgress] = useState(0)
      const [isPending,setIspending]=useTransition()

      function DropAccepted(acceptedFiles: File[]){
            // console.log(acceptedFiles);
            startUpload(acceptedFiles,{configId:undefined})
            setIsDrag(false)
            
      };
      function DropRejected(rejectedFiles: FileRejection[]){
        // console.log(rejectedFiles);
        const [file] =rejectedFiles;

        toast({
            title: `${file.file.type} type is not supported.`,
            description: "Please choose a PNG, JPG, or JPEG image instead.",
            variant: "destructive"
        })
            
        
      };
    return(
        <div className={cn(
            ' my-16  rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex flex-col flex-1  ',
            {
              'ring-blue-900/25 bg-blue-900/10': isDrag,
            }
          )}>

            <Dropzone accept={{'image/png': ['.png'],'image/jpeg': ['.jpeg'],'image/jpg': ['.jpg']}} onDragEnter={()=>{setIsDrag(true)}} onDragLeave={()=>{setIsDrag(false)}} onDropAccepted={DropAccepted} onDropRejected={DropRejected} >
                {({getInputProps,getRootProps})=>{
                    return(
                            <div {...getRootProps()} className=' flex-1 flex flex-col items-center justify-center'>
                                <input {...getInputProps()} />
                                {isDrag?(<MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2'/>):
                                    isUploading || isPending ? (<Loader2 className="animate-spin h-5 w-5 text-zinc-500 mb-2"/>): <Image className='h-6 w-6 text-zinc-500 mb-2'/>
                                }
                               <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                                {isUploading?( <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'><p>Uploading...</p> <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-300'/> </div>):
                                    isPending? ( 
                                            <p>Redirecting, please wait...</p>):
                                        isDrag?<p><span className='font-semibold'>Drop file</span> to upload</p>:
                                            <p> <span className='font-semibold'>Click to upload</span> or drag and drop </p>
                                }
                                </div>
                                {isPending ? null : (
                                    <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                                )}
                               
                            </div>

                    )
                }}
            </Dropzone>
  
        </div>
    )
}