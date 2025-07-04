"use client";

import { Button, buttonVariants } from "@/components/button";

import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
export default function () {
  const { toast } = useToast();
  const [isRigisterd, setIsRigisterd] = useState(false);
  const [Loading, setLoadin] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const Register = async (Formdata: FormData) => {
    console.log(Formdata);
    setLoadin(true);
    const user = {
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
      email: emailRef.current?.value,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        user
      );

      setIsRigisterd(true)
    } catch (error: any) {
    setLoadin(false);
      const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    toast({
      title: errorMessage,
      variant: "destructive",
    });
    }
  };
  return (
    <MaxWidthWithWrapper className="flex-1 flex justify-center items-center mt-10">
        
      {isRigisterd ? (
        <p className="bg-green-400/20 mt-20 font-semibold text-lg mx-auto text-slate-500 p-6">Success! Please check your email to verify account</p>
      ) : (
        <div className=" bg-slate-200/50 ">
            <h1 className="text-center font-bold text-green-600 pt-12 text-4xl" >Register</h1>
          <form action={Register} className="flex flex-col gap-4 p-10 sm:w-52 md:w-96 shadow-lg shadow-slate-300/50">

            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required ref={nameRef} />
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              ref={emailRef}
            />
            <label htmlFor="password">password</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              ref={passwordRef}
            />

            <input className={buttonVariants()} type="submit" value="Submit" disabled={Loading} />
                      <Button
                        className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
                        onClick={async (e) => {
                          e.preventDefault();
                          setLoadin(true);
                          try {
                            const res = await axios.post(
                              `/api/auth/login/federated/google`,
                              {
                                state: localStorage.getItem("returnedURL"),
                              }
                            );
                            const googleAuthUrl = res.data;
            
                            window.location.href = googleAuthUrl; // Redirect to Google OAuth
                          } catch (error: any) {
                            console.error("Error during Google login:", error);
                            toast({
                              title: "Failed to login with Google",
                              description: error.message || "An unexpected error occurred.",
                              variant: "destructive",
                            });
                          }
                        }}
                        isLoading={Loading}
                        disabled={Loading}
                      >
                        {" "}
                        Sign up with Google{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          className="ml-6"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                          <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          ></path>
                          <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          ></path>
                          <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                        </svg>
                      </Button>
          </form>
          </div>
       
      )}
       
   </MaxWidthWithWrapper>
  );
}
