import { buttonVariants } from "@/components/button";
import { Icons } from "@/components/Icons";
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import Phone from "@/components/phone";
import Reviews from "@/components/Reviews";
import { ButtonIcon } from "@radix-ui/react-icons";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function FiveStars() {
  return (
    <div className="flex gap-0.5">
      <Star className="h-4 w-4 text-green-600 fill-green-600" />
      <Star className="h-4 w-4 text-green-600 fill-green-600" />
      <Star className="h-4 w-4 text-green-600 fill-green-600" />
      <Star className="h-4 w-4 text-green-600 fill-green-600" />
      <Star className="h-4 w-4 text-green-600 fill-green-600" />
    </div>
  );
}
export default function Home() {
  return (
    <div className="grainy-light">
      <section className="max-w-full">
        <MaxWidthWithWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div
              className="relative flex flex-col justify-center items-center lg:items-start mx-auto text-center
              lg:text-left"
            >
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28 " />
                <img src="/snake-1.png" className="w-full" />
              </div>
              <h1 className="relative w-fit tracking-tighter !leading-tight mt-16 font-bold text-balance text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white inline-block mt-1 ">
                  Custom
                </span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap text-slate-700 font-semibold">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>
              <ul className="flex flex-col  justify-center mt-10 items-start  space-y-2  ">
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                  print guarantee
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  High-quality, durable material
                </li>
                <li className="flex gap-1.5 items-center text-left">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Modern iPhone models supported
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row my-8  items-center sm:items-start gap-5  ">
                <div className="flex -space-x-4">
                  <img
                    className="rounded-full ring-2 ring-slate-50 inline-block w-10 h-10"
                    src="/users/user-1.png"
                    alt="user image"
                  />
                  <img
                    className="rounded-full ring-2 ring-slate-50 inline-block w-10 h-10"
                    src="/users/user-2.png"
                    alt="user image"
                  />
                  <img
                    className="rounded-full ring-2 ring-slate-50 inline-block w-10 h-10"
                    src="/users/user-3.png"
                    alt="user image"
                  />
                  <img
                    className="rounded-full ring-2 ring-slate-50 inline-block w-10 h-10"
                    src="/users/user-4.jpg"
                    alt="user image"
                  />
                  <img
                    className="rounded-full ring-2 object-cover ring-slate-50 inline-block w-10 h-10"
                    src="/users/user-5.jpg"
                    alt="user image"
                  />
                </div>
                <div className="flex flex-col gap-1 items-center sm:items-start ml-8">
                  <FiveStars />
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <img
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWithWrapper>
      </section>

      <section className="bg-slate-100">
        <MaxWidthWithWrapper className="className='flex flex-col items-center gap-16 sm:gap-32">
          <div className="  pt-24 px-5 flex flex-col lg:flex-row items-center justify-center pb-14 gap-14">
            <h1 className=" order-2 lg:order-1 font-bold text-5xl text-slate-900  !leading-tight text-balance tracking-tight text-center ">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="absolute inset-x-0 -bottom-6 text-green-500 hidden sm:block pointer-events-none" />
              </span>
              say
            </h1>
            <img src="/snake-2.png" className="w-24 order-0 lg:order-2" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto py-12 px-4  ">
            <div className="lg:col-span-1 flex flex-col flex-auto  gap-2  lg:pr-8 xl:pr-20">
              <FiveStars />
              <div className="text-lg leading-8">
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className="flex gap-4 items- pt-4">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-1.png"
                  alt="user"
                />
                <div className="flex flex-col gap-0.5 ">
                  <h3 className="text-2xl text-slate-900 font-semibold">
                    Jonathan
                  </h3>
                  <div className="flex  gap-2 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col flex-auto gap-2 lg:pr-8 xl:pr-20 ">
              <FiveStars />
              <div className="text-lg leading-8">
                <p>
                  "I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it."
                </p>
              </div>
              <div className="flex gap-4 items-center pt-4">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-4.jpg"
                  alt="user"
                />
                <div className="flex flex-col gap-0.5 ">
                  <h3 className="text-2xl text-slate-900 font-semibold">
                    Josh
                  </h3>
                  <div className="flex  gap-2 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWithWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section className="pt-24 bg-slate-50">
        <MaxWidthWithWrapper>
          <h1 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 pb-16">
            Upload your photo and get{" "}
            <span className=" px-2 bg-green-600 text-white">your own case</span>{" "}
            now
          </h1>

          <div className="lg:pl-32">
            <div className="relative flex flex-col  items-center  md:grid md:grid-cols-2 gap-40  max-w-6xl pb-14  ">
              <img
                src="/arrow.png"
                alt=""
                className=" absolute md:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0  top-[25rem]"
              />
              <div className="relative h-80 md:h-full w-full  md:justify-self-end max-w-sm  rounded-xl  ring-inset ring-gray-900/10 lg:rounded-2xl ">
                <img
                  src="/horse.jpg"
                  alt=""
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10  w-full  h-full "
                />
              </div>
              <Phone className="w-60 " imgSrc="/horse_phone.jpg" />
            </div>
          </div>

          <div>
            <div className="w-fit mx-auto text-slate-600">
              <div className="flex gap-3   text-lg ">
                <Check className="w-5 h-10 inline text-green-500" />
                <p>High-quality silicone material</p>
              </div>
              <div className="flex gap-3  text-lg ">
                <Check className="w-5 h-10 inline text-green-500" />
                <p>Scratch- and fingerprint resistant coating</p>
              </div>
              <div className="flex gap-3   text-lg ">
                <Check className="w-5 h-10 inline text-green-500" />
                <p>Wireless charging compatible</p>
              </div>
              <div className="flex gap-3   text-lg ">
                <Check className="w-5 h-10 inline text-green-500" />
                <p>5 year print warranty</p>
              </div>
            </div>
            <div className="text-center p-10">
              <Link className={buttonVariants({size:'lg' ,className: 'mx-auto mt-8 '})} href='/configure/upload'>
              Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </div>
        </MaxWidthWithWrapper>
      </section>
    </div>
    
  );
}
