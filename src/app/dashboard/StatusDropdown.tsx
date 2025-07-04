"use client";

import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "./actions";
import { ArrowUpDown, Check, ChevronsUpDown, LucideArrowUpDown } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LABEL_STATUS :Record<keyof typeof OrderStatus , string>={
    awaiting_shipment: 'Awaiting Shipment',
    fulfilled: 'Fulfilled',
    shipped: 'Shipped',
}

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {

  const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: ["StatusDropdown"],
    mutationFn: changeOrderStatus,
    onSuccess:()=>{
      router.refresh()
    }
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_STATUS[orderStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
            {Object.keys(OrderStatus).map((status)=>(
                       
                       <DropdownMenuItem className="flex gap-2 " onClick={()=> mutate({id,newStatus:status as OrderStatus })}> <Check  className={cn( orderStatus === status ? 'opacity-100' : 'opacity-0' , 'w-4 h-4 text-green-600')}/> {status}</DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
