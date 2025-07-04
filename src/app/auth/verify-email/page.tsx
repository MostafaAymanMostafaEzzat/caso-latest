

import axios from "axios";
import { error } from "console";
import Link from "next/link";
import { Suspense } from "react";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    console.log('searchParams')
    console.log(searchParams)
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email`,searchParams
    );
    return (
      <div className="mx-auto mt-20 bg-green-400/20 font-semibold text-lg p-6 text-slate-500">
        Account Confirmed Please {' '}
        <Link href="/auth/Login" className="cursor-pointer text-green-600"> login</Link>
      </div>
    );
  } catch (error : any) {
    return <div className="mx-auto mt-20 bg-green-950  font-semibold text-xl p-6 text-slate-500">{error.response?.data?.message || "something went wrong"}</div>;
  }
}
