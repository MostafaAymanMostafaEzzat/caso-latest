"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview_copy = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) => {
  const [RenderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log("1111111111");
    if (divRef.current) {
      console.log("222222");
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(divRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [divRef]);
  const handleResize = () => {
    if (!divRef.current) return;

    const { width, height } = divRef.current.getBoundingClientRect();
    console.log("handleResize 1");
    console.log(width);
    console.log(height);
    console.log(width / (3000 / 637));

    setRenderedDimensions({ width, height });
  };
  let caseBackgroundColor = 'bg-zinc-950'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950'
  return (
    <AspectRatio  ratio={3000 / 2001} className="bg-slate-500/20 relative"  ref={divRef}>
      <img src="/clearphone.png" alt="image"  />
        <img
        
          src={croppedImageUrl}
          alt="image"
          className={cn("absolute rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px] z-[-1]" , caseBackgroundColor)}
          width={(RenderedDimensions.width * 637) / 3000}
          style={{
            left: (RenderedDimensions.width * 1200) / 3000,
            top: (RenderedDimensions.height * 325) / 2001,
            // transform: "rotate(-11deg) translate3D()",
            transform:" perspective(400px) rotateY(3deg) skew(11.1deg, -10.9deg) scale(1.03)",
    
            
          }}
          
        />
    </AspectRatio>
  );
};

export default PhonePreview_copy;
