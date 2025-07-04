import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
console.log('start webhook')

    const result = await request.text();
console.log('start webhook 1')

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse

      const signature = request.headers.get('stripe-signature');
console.log('start webhook 2')

      if (!signature) {
        return new Response('Invalid signature', { status: 400 })
      }
console.log('start webhook 3')
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(result, signature,  process.env.STRIPE_WEBHOOK_SECRET!);
 
    console.log('start webhook 4')

  
if(event.type === 'checkout.session.completed'){
    if(!event.data.object.customer_details?.email){
    console.log('start webhook 5')

        throw new Error("Email is missing")

    }
    console.log('start webhook 6')

    const session = event.data.object
    const {userId,orderId} =session.metadata || {
        userId: null,
        orderId: null,
      }
      if(!userId || ! orderId){
        throw new Error ('Invalid request metadata')
      }
      const billingAddress = session.customer_details?.address
      const ShippingAddress = session.shipping_details?.address
      console.log('start webhook 7')

      const updateOrder = await db.order.update({
        where:{
            id:orderId
        },
        data:{
            isPaid: true,
            shippingAddress :{
                create:{
                    name: session.customer_details!.name!,
                    city:ShippingAddress?.city!,
                    country:ShippingAddress?.country!,
                    postalCode:ShippingAddress?.postal_code!,
                    street: ShippingAddress!.line1!,
                    state: ShippingAddress!.state,

                }
            },
            billingAddress: {
                create: {
                  name: session.customer_details!.name!,
                  city: billingAddress!.city!,
                  country: billingAddress!.country!,
                  postalCode: billingAddress!.postal_code!,
                  street: billingAddress!.line1!,
                  state: billingAddress!.state,
                },
              },
        }
      })
      console.log('start webhook 8')

      // const { data, error } = await resend.emails.send({
      //   from: 'caso <es-moustafa.ezzat2026@alexu.edu.eg>',
      //   to: [event.data.object.customer_details.email],
      //   subject: 'Thanks for your order!',
      //   react: OrderReceivedEmail({
      //       orderId,
      //       orderDate: updateOrder.createdAt.toLocaleDateString(),
      //       // @ts-ignore
      //       shippingAddress: {
      //         name: session.customer_details!.name!,
      //         city: ShippingAddress!.city!,
      //         country: ShippingAddress!.country!,
      //         postalCode: ShippingAddress!.postal_code!,
      //         street: ShippingAddress!.line1!,
      //         state: ShippingAddress!.state,
      //       },
      //     }),


      //   })
  
        return NextResponse.json({ result: event, ok: true })
}}  catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    )
  }
 }