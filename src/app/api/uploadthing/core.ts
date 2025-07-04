import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();
import {db} from '@/db'
import z from "zod"
import sharp from 'sharp'
export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })
  .input(z.object({configId : z.string().optional()}))

    .middleware(async ({input}) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const{configId} = metadata.input
      const res =await fetch(file.url);
      const buffer = await res.arrayBuffer()
      const Metadata = await sharp(buffer).metadata()
      const {width ,height} = Metadata
      if(!configId){
          const configuration =await db.configuration.create({
            data:{
              height:height!,
              width:width!,
              imageUrl:file.url,
            }
          })
          return { configId: configuration.id}
      }else{
        const configuration =await db.configuration.update({
          where:{
            id:configId
          },
          data:{
            croppedImageUrl: file.url,
          }
        })
        return { configId: configuration.id }
      }

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
