import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";





export default function ({children}:{children:ReactNode}){

return(
    <MaxWidthWithWrapper className="flex flex-col flex-1 select-none">
        <Steps/>
        {children}
    </MaxWidthWithWrapper>
)
}