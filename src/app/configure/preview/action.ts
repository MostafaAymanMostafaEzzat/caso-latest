"use server";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { authenticateUser } from "@/middleware/authenticateUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function creatSession({ ConfigID }: { ConfigID: string }) {
    console.log('helooo 1')

  const configuration = await db.configuration.findUnique({
    where: { id: ConfigID },
  });
  console.log('helooo 2')

  if (!configuration) {
    throw new Error("No such configuration found");
  }
  console.log('helooo 3')

 
  const user = await authenticateUser()
  const { finish, material } = configuration;
  console.log('helooo 4')
  if (!user) {
    throw new Error('You need to be logged in')
  }
  console.log(user)
  console.log('kkkkkkkkkkkkkkkkkkkkkkk')
  

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;
  console.log('helooo 5')

  let Order = await db.order.findFirst({
    where: {
      configurationId: configuration.id,
      userId: user.userId,
    },
  });
  console.log('helooo 6')

  if(!Order){
    Order = await db.order.create({
        data:{
            amount:price /100,
            configurationId:ConfigID,
            userId:user.userId
        }
    })
  }
  console.log('helooo 7')

  const product = await stripe.products.create({
    name:'Custom iPhone Case',
    images:[configuration.imageUrl],
    default_price_data :{
        currency: 'USD',
        unit_amount: price
    }
  });
  console.log('helooo 8')


  console.log('start session')
  const session = await stripe.checkout.sessions.create({
    line_items:[
       {
        price: product.default_price as string,
        quantity: 1
       }
    ],
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
        userId: user.userId,
        orderId: Order.id,
      },
    mode:"payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${Order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
  })
  console.log('end session')
  console.log(session.url)

  return { url: session.url }
}
