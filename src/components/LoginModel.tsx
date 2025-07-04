import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import AuthButton from "./authButton";

export default function LoginModel({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
  }) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent >
        <DialogHeader>
            <div className="relative mx-auto w-24 h-24 mb-2">
                <Image            
                src='/snake-1.png'
                alt='snake image'
                className='object-contain'
                fill/>
                </div>
                <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-zinc-900'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
        <AuthButton to="Login"/>
        <AuthButton to="Register"/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
