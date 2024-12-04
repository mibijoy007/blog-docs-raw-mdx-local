"use client";


// import { Icons } from "./icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FaCloudSun } from "react-icons/fa";



export default function Nav() {

  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <FaCloudSun className=" h-8 w-8"/>
        <span className="font-semibold">{siteConfig.name}</span>
      </Link>


      <Link
        href="/docs"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden  sm:inline-block",
          pathname === "/docs" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Docs
      </Link>


      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>

    </nav>
  );
}
