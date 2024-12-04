"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
// import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { FaCloudSun, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className=" w-60">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          {/* <Icons.logo className="mr-2 h-4 w-4" /> */}
          <FaCloudSun className="mr-2 h-6 w-6"/>
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/docs">
            Docs
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
            <div className="my-2 bg-gray-200 dark:bg-slate-800 w-full h-[1.5px] rounded-full" />
          <div className="flex items-center justify-center gap-6 ">
          <Link target="_blank" rel="noreferrer" 
          href={siteConfig.links.github}
          >
            <FaGithub className="h-6 w-6"/>
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.twitter}
          >
            <FaSquareXTwitter className="h-6 w-6"/>
            <span className="sr-only">Twitter</span>
          </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
