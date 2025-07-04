"use server"

import { db } from '@/db'
import { OrderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: OrderStatus
}) => {
try {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  })
} catch (error) {
  console.log(error);
  throw new Error('status is not updated , try again Later')
}
}
