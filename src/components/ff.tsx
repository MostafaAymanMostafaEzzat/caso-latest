// 'use client'
// import Link from "next/link";
// import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
// import { cn } from "@/lib/utils";
// import { Button, buttonVariants } from "./button";
// import { ArrowRight } from "lucide-react";
// import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { authenticateUser } from "@/middleware/authenticateUser";
// import { db } from "@/db";
// import { cookies } from "next/headers";
// // import { redirect } from "next/navigation";
// import { LogoutButton } from "./logout/client";
// import { returnAndStartFromTheEnd } from "./returnAndStartFromTheEnd";
// import { redirect } from 'next/navigation'
// import LoginButton from "./authButton";
// import AuthButton from "./authButton";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";


// export default  function Navbar() {

// const {data} = useQuery({
//   queryKey:['nav'],
//   queryFn:async ()=>
//  { console.log('useQuery')
//   return await authenticateUser()}
  
// })
// console.log('kjkkkkkkkkkkkkkkkkkkkkkkk')
// const user = data
// const isAdmin = user?.role



//   return (
//     <div className="sticky top-0 select-none inset-x-0 w-full bg-slate-100/30 border-b border-zinc-950/20 border-solid py-5 backdrop-blur-lg z-[9999999999999999]">
//       <MaxWidthWithWrapper>
//         <div className="flex justify-between items-center">
//           <h1 className="font-bold text-3xl text-zinc-950/85">
//             case
//             <span className="text-green-600">cobra</span>
//           </h1>

//           <div className="flex gap-5 items-center">
//             {user ? (
//               <div className="flex items-center gap-2">
//               <LogoutButton user={user} />
//                 {isAdmin? (
//                   <Link
//                     href="/dashboard"
//                     className={buttonVariants({
//                       size: "sm",
//                       variant: "ghost",
//                     })}
//                   >
//                     Dashboard ✨
//                   </Link>
//                 ) : null}
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 {" "}
                
//                 <AuthButton to='Register' />


//                   <AuthButton to='Login'/>
//               </div>
//             )}
//             <div className="text-center  relative ml-4">
//               <Link
//                 className={buttonVariants({
//                   size: "sm",
//                   className: "mx-auto  ",
//                 })}
//                 href="/configure/upload"
//               >
//                 Create case <ArrowRight className="h-4 w-4 ml-1.5 " />
//               </Link>
//               <span className="absolute inset-y-0 w-[1px] bg-zinc-200 -left-6 hidden sm:block" />
//             </div>
//           </div>
//         </div>
//       </MaxWidthWithWrapper>
//     </div>
//   );
// }




















// 'use client'
// import Link from "next/link";
// import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
// import { cn } from "@/lib/utils";
// import { Button, buttonVariants } from "./button";
// import { ArrowRight } from "lucide-react";
// import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { authenticateUser } from "@/middleware/authenticateUser";
// import { db } from "@/db";
// import { cookies } from "next/headers";
// // import { redirect } from "next/navigation";
// import { LogoutButton } from "./logout/client";
// import { returnAndStartFromTheEnd } from "./returnAndStartFromTheEnd";
// import { redirect } from 'next/navigation'
// import LoginButton from "./authButton";
// import AuthButton from "./authButton";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";


// export default  function Navbar() {

// const [auth,setAuth] = useState<null | { userId: string; role: string;}>(null);
// const [x,setX] = useState(true);
// console.log(x)
// console.log(auth)

//   useEffect(()=>{
//     async function authenticate (){
//       console.log(1)
//       if(x){
//       try {
//         const user = await axios.get(
//           `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/authenticateUser`);
//           console.log("user")
    
//           console.log(user.data.user)
//           if (JSON.stringify(user.data.user) !== JSON.stringify(auth)) {
//             setAuth(user.data.user);
//             setX(false)
//             console.log("Authenticated user:", user);
//           }
//       } catch (error) {
//         console.error("Authentication error:", error);
//         if (auth !== null) {
//           setAuth(null); // Clear state if there's an error
//         }
//       }
  
//     authenticate();}
//     }
//   })



//   return (
//     <div className="sticky top-0 select-none inset-x-0 w-full bg-slate-100/30 border-b border-zinc-950/20 border-solid py-5 backdrop-blur-lg z-[9999999999999999]">
//       <MaxWidthWithWrapper>
//         <div className="flex justify-between items-center">
//           <h1 className="font-bold text-3xl text-zinc-950/85">
//             case
//             <span className="text-green-600">cobra</span>
//           </h1>

//           <div className="flex gap-5 items-center">
//             {auth ? (
//               <div className="flex items-center gap-2">
//               <LogoutButton user={auth} />
//                 {auth?.role ? (
//                   <Link
//                     href="/dashboard"
//                     className={buttonVariants({
//                       size: "sm",
//                       variant: "ghost",
//                     })}
//                   >
//                     Dashboard ✨
//                   </Link>
//                 ) : null}
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 {" "}
                
//                 <AuthButton to='Register' />


//                   <AuthButton to='Login'/>
//               </div>
//             )}
//             <div className="text-center  relative ml-4">
//               <Link
//                 className={buttonVariants({
//                   size: "sm",
//                   className: "mx-auto  ",
//                 })}
//                 href="/configure/upload"
//               >
//                 Create case <ArrowRight className="h-4 w-4 ml-1.5 " />
//               </Link>
//               <span className="absolute inset-y-0 w-[1px] bg-zinc-200 -left-6 hidden sm:block" />
//             </div>
//           </div>
//         </div>
//       </MaxWidthWithWrapper>
//     </div>
//   );
// }
