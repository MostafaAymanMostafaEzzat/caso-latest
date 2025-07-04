import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { authenticateUser_ServerComponent } from "@/middleware/authenticateUser_ServerComponent";
import StatusDropdown from "./StatusDropdown";
import { notFound } from "next/navigation";


const Page = async () => {
  const user = await authenticateUser_ServerComponent();
  if(!user || user.role !== 'admin' ){
      return notFound()
  }
  const orders = await db.order.findMany({
    where: {
      isPaid:true,
    },
    orderBy:{
      createdAt: 'desc'
    },
 include:{
  user:true,
  shippingAddress:true
 }
  });

  const LastWeekSum = await db.order.aggregate({
    where: {
      isPaid:true,
        createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
 _sum:{
  amount:true
 }

  });
  const LastMonthSum = await db.order.aggregate({
    where: {
      isPaid:true,
        createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
 _sum:{
  amount:true
 }
  });
  console.log(LastMonthSum)
  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 2500
  return (
    <MaxWidthWithWrapper>
      <div className="">
        <div className="flex gap-3 my-8">
          <Card className="text-lg text-slate-400 flex-1">
            <CardHeader>
              <CardTitle>Last Week</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-5xl text-gray-950">{LastWeekSum._sum.amount || 0}</h1>
              <p>of ${WEEKLY_GOAL}goal</p>
            </CardContent>
            <CardFooter>
              <Progress value={(LastWeekSum._sum.amount) || 0/WEEKLY_GOAL *100} />
            </CardFooter>
          </Card>
          <Card className="text-lg text-slate-400 flex-1">
            <CardHeader>
              <CardTitle>Last Month</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-5xl text-gray-950">{LastMonthSum._sum.amount || 0}</h1>
              <p>of ${MONTHLY_GOAL} goal</p>
            </CardContent>
            <CardFooter>
              <Progress value={(LastMonthSum._sum.amount) || 0/MONTHLY_GOAL *100} />
            </CardFooter>
          </Card>
        </div>
        <div>
          <h1 className="font-bold text-3xl mb-8">Incoming orders</h1>
          <Table>
            <TableHeader>
              <TableRow >
                <TableHead className="w-[100px]">Customer</TableHead>
                <TableHead>Status </TableHead>
                <TableHead>Purchase date </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow >
                  <TableCell className="font-medium flex flex-col mr-9 pr-6 text-nowrap">
                    <h4>{order.shippingAddress?.name}</h4>
                    <p className="text-slate-500">{order.user.email}</p>
                  </TableCell>
                  <TableCell><StatusDropdown id={order.id } orderStatus={order.status}/></TableCell>
                  <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MaxWidthWithWrapper>
  );
};

export default Page;
