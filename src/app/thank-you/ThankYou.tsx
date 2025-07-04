"use client";

import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import PhonePreview from "@/components/PhonePreview";
import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import PhonePreview_copy from "@/components/PhonePreview-copy";

const ThankYou = ({ orderId }: { orderId: string }) => {
  const { data } = useQuery({
    queryKey: ["aaaa"],
    queryFn: async () => {
      return await getPaymentStatus({ orderId });
    },
    retry: true,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won't take long.</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;
  return (
    <MaxWidthWithWrapper className="flex flex-col pt-16">
      <div>
        <div className="flex flex-col gap-3">
          <h3 className="text-green-500">Thank you!</h3>
          <h1 className="text-5xl font-bold text-gray-950">
            Your case is on the way!
          </h1>
          <p className="text-slate-400">
            We've received your order and are now processing it.
          </p>
        </div>
        <div className="my-12">
          <h5 className="font-semibold">Order number</h5>
          <p className="text-slate-400 pt-2">{orderId}</p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-400/40" />
      <div className="mt-6">
        <h4 className="my-3 font-semibold">You made a great choice!</h4>
        <p className=" my-2 text-zinc-700">
          We at CaseCobra believe that a phone case doesn't only need to look
          good, but also last you for the years to come. We offer a 5-year print
          guarantee: If you case isn't of the highest quality, we'll replace it
          for free.
        </p>
        <PhonePreview_copy
          color={color!}
          croppedImageUrl={configuration.croppedImageUrl!}
        />
        <div className=" grid grid-cols-2 gap-x-6 py-10 ">
          <div>
            <h4 className="font-semibold text-zinc-950 mb-3">Shipping address</h4>
            <div className="flex flex-col gap-2 text-slate-700">
              <p>{shippingAddress?.name}</p>
              <p>{shippingAddress?.city}</p>
              <p>{shippingAddress?.postalCode}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-950 mb-4">Billing address</h4>
            <div className="flex flex-col gap-2 text-slate-700">
              <p>{billingAddress?.name}</p>
              <p>{billingAddress?.city}</p>
              <p>{billingAddress?.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full my-7 bg-slate-400/40" />
      <div className=" grid grid-cols-2 gap-x-6 py-4">
        <div>
          <p className="font-medium text-zinc-900 mb-4">Payment status</p>
          <p className="mt-2 text-zinc-700">Paid</p>
        </div>

        <div>
          <p className="font-medium text-zinc-900 mb-2">Shipping Method</p>
          <p className="mt-2 text-zinc-700">DHL, takes up to 3 working days</p>
        </div>
      </div>
      <div className="h-[1px] w-full my-7 bg-slate-400/40" />
      <div className="space-y-6 mb-10">
        <div className="flex justify-between ">
          <p className="font-medium text-zinc-900">Subtotal</p>
          <p className="text-zinc-700">{formatPrice(amount)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-zinc-900">Shipping</p>
          <p className="text-zinc-700">{formatPrice(0)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-zinc-900">Total</p>
          <p className="text-zinc-700">{formatPrice(amount)}</p>
        </div>
      </div>
    </MaxWidthWithWrapper>
  );
};

export default ThankYou;
