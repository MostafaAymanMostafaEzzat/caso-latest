"use client";
import Link from "next/link";
import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
import { ArrowRight, CircleUser, Menu, UserRoundCheck } from "lucide-react";
import { LogoutButton } from "./logout/client";
import AuthButton from "./authButton";
import useAuthOnClient from "./customHooks/authenticateOnClient";
import { buttonVariants } from "./button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";

export default function Navbar() {
  const auth = useAuthOnClient();
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      console.log("ref.current", ref.current);
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  // console.log("auth", auth);
  return (
    <div className="sticky top-0 select-none p-5 max-md:px-0 inset-x-0 w-full bg-slate-100/30 border-b border-zinc-950/20 border-solid backdrop-blur-lg z-[9999999999999999]  ">
      <MaxWidthWithWrapper>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl max-md:text-2xl text-zinc-950/85">
            <Link href="/">
              case
              <span className="text-green-600">cobra</span>
            </Link>
          </h1>
          <div className="flex max-md:gap-0 gap-5 items-center">
            {auth && auth.role === "admin" && (
              <Link
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Dashboard ✨
              </Link>
            )}
            <div className="relative ">
              {auth ? auth.image ? (
                
                <div className="">
                  <img
                    onClick={() => setOpen((prev) => !open)}
                    src={auth?.image}
                    alt="snake image"
                    className="w-8 h-8 max-md:w-6 max-md:h-6 object-contain rounded-full cursor-pointer"
                  />
                </div>) : <UserRoundCheck className="h-8 w-8 cursor-pointer max-md:w-6 max-md:h-6 hover:text-green-700" 
                  onClick={() => setOpen((prev) => !open)}
                 />
               : (
                <CircleUser
                  className=" h-8 w-8 cursor-pointer max-md:w-6 max-md:h-6 hover:text-green-700  "
                  onClick={() => setOpen((prev) => !open)}
                />
              )}

              {open && (
                <div
                  className="absolute top-10 flex flex-col gap-2 -left-[42px] shadow-xl p-2 bg-white rounded-2xl border border-slate-600/20"
                  ref={ref}
                >
                  {auth ? (
                    <div className="">
                      <LogoutButton user={auth} setopen={setOpen} />
                    </div>
                  ) : (
                    <div className="">
                      {" "}
                      <Suspense fallback={<></>}>
                        <AuthButton to="Register" setopen={setOpen} />

                        <AuthButton to="Login" setopen={setOpen} />
                      </Suspense>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="text-center  relative ml-4">
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "mx-auto  ",
                })}
                href="/configure/upload"
              >
                Create case <ArrowRight className="h-4 w-4 ml-1.5 " />
              </Link>
              <span className="absolute inset-y-0 w-[1px] bg-zinc-200 -left-6 hidden sm:block" />
            </div>
          </div>
        </div>
      </MaxWidthWithWrapper>
    </div>
  );
}
