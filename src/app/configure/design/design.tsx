"use client";
// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// outline-blue-950
// outline-zinc-900
// outline-rose-
import { BASE_PRICE } from "@/config/products";
 import {useMutation} from '@tanstack/react-query'
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  MoveDownLeft,
  MoveDownRight,
  MoveUpLeft,
  MoveUpRight,
} from "lucide-react";
import HandleComponent from "@/components/HandleComponent";
import NextImage from "next/image";
import {updateDataConfig ,updateConfig} from './action'
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";

import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { cn, formatPrice } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/react-dropdown-menu";
import { Button } from "@/components/button";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useUploadThing } from "@/lib/uploadthing";
import {  useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function DesignOflient({
  imgUrl,
  configId,
  width,
  height,
}: {
  imgUrl: string;
  configId: string;
  width: number;
  height: number;
}) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phoneCaceRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [Dimention, setDimention] = useState({
    width: width / 4,
    height: height / 4,
  });
  const {isUploading,startUpload} = useUploadThing('imageUploader')
  const { toast } = useToast()
  const {mutate ,isPending}= useMutation({
    
    mutationFn : async (arg:updateDataConfig)=>{
      await Promise.all([saveConfiguration(),updateConfig(arg)])
      
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess:()=>{
      router.push(`/configure/preview?id=${configId}`)
    }
  })


  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  async function saveConfiguration() {
    try {
      const {
        left: containerLeft,
        top: containerTop,
        height: containerHeight,
        width: containerWidth,
      } = containerRef.current!.getBoundingClientRect();

      const {
        left: phoneCaceLeft,
        top: phoneCaceTop,
        height: phoneCaceHeight,
        width: phoneCaceWidth,
      } = phoneCaceRef.current!.getBoundingClientRect();

      const leftOffset = phoneCaceLeft - containerLeft;
      const topOffset = phoneCaceTop - containerTop;

      const orginX = position.x - leftOffset;
      const orginY = position.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = phoneCaceWidth;
      canvas.height = phoneCaceHeight;
      const ctx = canvas.getContext("2d");

      const image = new Image(Dimention.width, Dimention.height);
      image.crossOrigin = "anonymous";
      image.src = imgUrl;
      
      // throw new Error('kkkkkkkkkkkkkkkk')
      await new Promise((resolve) => (image.onload = resolve));
      ctx?.drawImage(image, orginX, orginY, Dimention.width, Dimention.height);
      let blob = await new Promise((resolve) =>
        canvas.toBlob(resolve , "image/png")
      );
      const file = new File([blob as BlobPart], 'mostafa.png', { type: 'image/png' })
      
      await startUpload([file], { configId })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3   mt-16 lg:p-6 w-full items-center ">
      <div
        ref={containerRef}
        className="h-[37.5rem]  relative col-span-1 lg:col-span-2  outline-slate-400/15 rounded-lg flex justify-center items-center p-10 overflow-hidden w-full border-2 border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]  ">
          <AspectRatio
            className="relative   w-full z-[4]  aspect-[896/1831] pointer-events-none"
            ref={phoneCaceRef}
            ratio={896 / 1831}
          >
            <NextImage
              fill
              src="/phone-template.png"
              alt=""
              className="pointer-events-none "
            />
          </AspectRatio>
          <div className="absolute z-[3] inset-0  rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />

          <div
            className={cn(
              "absolute inset-0  z-[1] bottom-px rounded-[39px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          className="  relative z-[2] "
          default={{ ...position, ...Dimention }}
          onDragStop={(_, { x, y }) => {
            setPosition({ x, y });
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setDimention({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
            setPosition({ x, y });
          }}
          resizeHandleComponent={{
            bottomRight: <MoveDownRight className=" w-5 h-5 bg-green-500/25" />,
            bottomLeft: <MoveDownLeft className=" w-5 h-5 bg-green-500/25" />,
            topRight: <MoveUpRight className=" w-5 h-5 bg-green-500/25" />,
            topLeft: <MoveUpLeft className=" w-5 h-5 bg-green-500/25" />,
          }}
        >
          <img src={imgUrl} className=" w-full h-full pointer-events-none" />
        </Rnd>
      </div>
      <div className="col-span-1 w-full flex flex-col h-[37.5rem] ">
        <ScrollArea className=" overflow-auto relative flex-1">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 ">
            <h2 className="font-bold text-4xl tracking-tight mb-4">
              Customize your case
            </h2>
            <div className="w-full h-px px-4 bg-slate-400/50" />
            <div className="flex flex-col gap-2 mt-4  ">
              <h4 className="">Color:{" " + options.color.label}</h4>
              <RadioGroup
                value={options.color}
                className="flex gap-3  "
                onChange={(value) => {
                  console.log(value);
                  setOptions((prev) => ({ ...prev, color: value }));
                }}
              >
                {COLORS.map((color) => (
                  <Field key={color.label} className="flex items-center gap-2">
                    <Radio
                      value={color}
                      className={cn(
                        "flex w-10 h-10 items-center justify-center rounded-full border relative -m-0.5 ",
                        `bg-${color.tw}`
                      )}
                    >
                      {({ checked }) =>
                        checked ? (
                          <span
                            className={cn(
                              "w-10 h-10 rounded-full outline  outline-2 outline-offset-2 ",
                              `outline-${color.tw} `
                            )}
                          />
                        ) : (
                          <></>
                        )
                      }
                    </Radio>
                  </Field>
                ))}
              </RadioGroup>

              <div className="flex flex-col gap-2 pt-4">
                <label>Model</label>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className=" focus:!ring-0 focus:border-1"
                  >
                    <Button
                      variant={"outline"}
                      className="flex justify-between focus:border-slate-400 text-lg font-semibold text-slate-400/70 hover:text-slate-400 "
                    >
                      {options.model.label}
                      <ChevronsUpDown className="w-5 h-5 text-slate-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom">
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        className="flex justify-start items-center gap-2 cursor-default hover:bg-zinc-100"
                        onSelect={(value) => {
                          setOptions((prev) => ({ ...prev, model }));
                        }}
                        key={model.value}
                      >
                        <Check
                          className={cn("w-4 h-4 mr-2 ", {
                            invisible: !(options.model === model),
                          })}
                        />
                        <div className="pb-1 i">{model.label}</div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="pt-3">
                {[MATERIALS, FINISHES].map(
                  ({ name, options: materialOption }) => (
                    <div className="flex flex-col my-4" key={name}>
                      <h3 className="text-lg">{name}</h3>
                      <RadioGroup
                        value={options[name]}
                        onChange={(value) => {
                          setOptions((prev) => ({ ...prev, [name]: value }));
                        }}
                        className="flex flex-col justify-start "
                      >
                        {materialOption.map((option) => (
                          <Radio
                            key={option.label}
                            value={option}
                            className={
                              "rounded-md my-2  py-4 flex flex-col flex-1 px-2 text-slate-400 bg-slate-200/30 hover:bg-slate-200/10 hover:text-slate-500 shadow-xl shadow-slate-600/5 hover:shadow-slate-600/10 border-2 border-solid data-[checked]:border-green-600 data-[checked]:bg-slate-200/10"
                            }
                          >
                            <div className="flex items-center justify-between  flex-1 ">
                              <label>{option.label}</label>
                              <div>{formatPrice(option.price / 100)}</div>
                            </div>
                            <div></div>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="px-8 py-2">
          <div className="w-full h-px px-4 bg-slate-400/50" />
          <div className="flex gap-3 items-center mt-5 text-xl font-bold">
            <div className="  ">
              {formatPrice(
                BASE_PRICE / 100 +
                  options.finish.price / 100 +
                  options.material.price / 100
              )}
            </div>
            <Button
            isLoading={isPending}
            loadingText="Saving"
            disabled={isPending}
                onClick={() =>
                  mutate({
                    configId,
                    material:options.material.value,
                    finish:options.finish.value,
                    model:options.model.value,
                    color:options.color.value
                })
                }
                size='sm'
                className='w-full'>
                Continue
                <ArrowRight className='h-4 w-4 ml-1.5 inline' />
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
