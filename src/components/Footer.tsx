import Link from "next/link";
import MaxWidthWithWrapper from "./MaxwidthWithWrapper";

export default function Footer() {
  return (
    <MaxWidthWithWrapper>
      <div className="flex justify-between items-center py-10">
        <h4 className="text-sm text-muted-foreground" >© {new Date().getFullYear()} All rights reserved</h4>
        <div className="flex gap-8">
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-gray-600"
        >
          Terms
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-gray-600"
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-gray-600"
        >
          Cookie Policy
        </Link>
        </div>
      </div>
    </MaxWidthWithWrapper>
  );
}
