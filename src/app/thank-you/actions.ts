'use server'

import { db } from "@/db"
import { authenticateUser } from "@/middleware/authenticateUser"



export const getPaymentStatus = async ({orderId}:{orderId:string}) => {
  const user = await authenticateUser()

  if (!user?.userId) {
    throw new Error('You need to be logged in to view this page.')
  }
  const order =await db.order.findFirst({
    where:{
      id:orderId
    },
    include:{
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    }
  })

  if (!order) throw new Error('This order does not exist.')
   if(order.isPaid){
    return order
   }else{
    return false
   }
}