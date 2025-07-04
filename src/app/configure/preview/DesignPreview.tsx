'use client'

import Phone from "@/components/phone";
import { ArrowRight, CheckIcon } from "lucide-react";

import { CaseMaterial, CaseFinish, CaseColor } from "@prisma/client";
import Confetti from 'react-dom-confetti'

import { COLORS, FINISHES, MATERIALS } from "@/validators/option-validator";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import creatSession from "./action";
import { useRouter } from "next/navigation";
import LoginModel from "@/components/LoginModel";
import { authenticateUser } from "@/middleware/authenticateUser";
import { useEffect, useState } from "react";




export default function DesignPreview({
  croppedImageUrl,
  color,
  material,
  finish,
  ConfigId,
}: {
  ConfigId: string;
  croppedImageUrl: string;
  color: CaseColor;
  material: CaseMaterial;
  finish: CaseFinish;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  useEffect(() => setShowConfetti(true))
  const router = useRouter()
  const {mutate :createPaymentSession,isPending} = useMutation({
    mutationKey : ['mustataConfigureOnPreview'],
    mutationFn : async ()=>{
      console.log('helooo')
     return(await creatSession({ConfigID:ConfigId}))
    },
    onSuccess :async ({url})=>{
      if(url) router.push(url)
      else throw new Error('Unable to retrieve payment URL.')
    },
    onError: (error) => {
      console.log(error)
    },

  })



  const handleCheckout = async () => {
    const user = await authenticateUser()
    if (user) {
      // create payment session
      createPaymentSession()
    } else {
      // need to log in
      setIsLoginModalOpen(true)
    }
  }

  const Tw = COLORS.find((element) => element.value === color)?.tw;
  const Material = MATERIALS.options.find(
    (element) => element.value === material
  );
  const Finish = FINISHES.options.find((element) => element.value === finish);
  let totalPrice = BASE_PRICE;
  if (Material?.value === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  }
  if (Finish?.value === "textured") {
    totalPrice += PRODUCT_PRICES.finish.textured;
  }
  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none select-none  flex justify-center'>
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        /> 
      </div>
    <LoginModel isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2 ">
          <Phone className={cn(`bg-${Tw}`, "")} imgSrc={croppedImageUrl} />
        </div>
        <div className="mt-6 sm:col-span-9 md:row-end-1 mb-4">
          <h1 className="font-bold text-5xl ">Your iPhone X Case</h1>
          <div className="flex gap-1  items-center my-2 text-base">
            <CheckIcon className="w-4 h-4 text-green-400" />{" "}
            <p>In stock and ready to ship</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-20 mb-16 gap-5">
            <div>
              <h3 className="font-medium text-zinc-950 text-xl mb-2">
                Highlights
              </h3>
              <ol className="flex flex-col gap-1  text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible </li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-zinc-950 text-xl mb-2">
                Materials
              </h3>
              <ol className="flex flex-col gap-1  text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="w-full  h-[0.5px] bg-slate-500/20  px-8 " />
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base px-6 flex flex-col gap-5">
          <div className="flex justify-between ">
            <div>Base price</div>
            <div>{formatPrice(BASE_PRICE / 100)}</div>
          </div>
          {material && (
            <div className="flex justify-between ">
              <div>Soft polycarbonate material</div>
              <div>
                {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
              </div>
            </div>
          )}
          {finish && (
            <div className="flex justify-between ">
              <div>Textured finish</div>
              <div>{formatPrice(PRODUCT_PRICES.finish.textured / 100)}</div>
            </div>
          )}
          <div className="w-full  h-[0.5px] bg-slate-500/20  px-8 " />

          <div className="flex justify-between items-center">
            <div className="text-lg text-zinc-950 font-bold mt-3">Order total</div>
            <div className="font-semibold" >{formatPrice(totalPrice / 100)}</div>
          </div>
          <div className="flex justify-center md:justify-end mt-8 py-10">
            <Button isLoading={isPending} disabled={isPending} loadingText="check out" className="w-44" onClick={handleCheckout}>
                check out <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
