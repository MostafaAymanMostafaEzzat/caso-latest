"use client";
import { cn } from "@/lib/utils";
import { ol } from "framer-motion/client";
import { url } from "inspector";
import { usePathname } from "next/navigation";
import { useState } from "react";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
  },
];

export default function () {
  const pathName = usePathname();

  return (
    <ol className="flex flex-col  lg:flex-row lg:ml-4 bg-white rounded-md lg:rounded-none lg:border-l lg:border-r lg:border-gray-200 ">
      {STEPS.map((step, index) => {
        const currentStep = pathName.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathName.endsWith(step.url)
        );
        const imgPath = `/snake-${index + 1}.png`;
        return (
          <li key={step.url} className="relative flex justify-start lg:justify-center  items-center gap-5 px-14 py-7 overflow-hidden lg:flex-1">
            <div
              className={cn(
                "absolute left-0 top-0 h-full w-1 bg-slate-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                {
                  "bg-slate-900": currentStep,
                  "bg-primary": isCompleted,
                }
              )}
            />
            <div className="flex-shrink-0">
              <img src={imgPath} alt="" className={cn(
                      ' h-20 w-20 object-contain ',
                      {
                        'border-none': isCompleted,
                        'border-zinc-700': currentStep,
                      }
                    )} />
            </div>
            <div className="flex  flex-col gap-1 justify-start min-w-0">
              <h4
                className={cn("text-sm font-semibold text-zinc-700", {
                  "text-primary": isCompleted,
                  "text-zinc-700": currentStep,
                })}
              >
                {step.name}
              </h4>
              <p className="font-semibold text-slate-500">{step.description}</p>
            </div>
            {index !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
          </li>
        );
      })}
    </ol>
  );
}
