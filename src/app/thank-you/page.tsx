import { Suspense } from 'react'
import ThankYou from './ThankYou'
import { notFound, useSearchParams } from 'next/navigation'

type SearchParams = { [key: string]: string | string[] | undefined }
const Page = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const {orderId} = searchParams
  if (!orderId || typeof orderId !== 'string') {
    return notFound()
  }
  return (
      <ThankYou orderId={orderId} />
  )
}

export default Page
