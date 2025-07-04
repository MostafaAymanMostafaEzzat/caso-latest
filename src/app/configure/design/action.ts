'use server'

import { db } from "@/db"
  
import {CaseColor,CaseFinish,CaseMaterial,OrderStatus,PhoneModel} from '@prisma/client'


export interface updateDataConfig {
    configId:string,
    material:CaseMaterial,
    finish:CaseFinish,
    model:PhoneModel,
    color:CaseColor
}


export async function updateConfig({configId,material,finish,model,color}:updateDataConfig) {

    const config = await db.configuration.update({
        where:{id:configId},
        data:{
          material,finish,model,color
        }

    })
}