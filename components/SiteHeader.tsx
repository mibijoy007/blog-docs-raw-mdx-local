import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import Link from "next/link";

// import { Icons } from "./icons";
// import { MainNav } from "./main-nav";
// import { MobileNav } from "./mobile-nav";
// import { ModeToggle } from "./mode-toggle";

import { buttonVariants } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Nav from "./Nav";
// import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggler";



export function SiteHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Nav/>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                {/* <Icons.gitHub className="h-4 w-4" /> */}
                <FaGithub className="h-4 w-4"/>
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                {/* <Icons.twitter className="h-4 w-4" /> */}
                <FaSquareXTwitter className="h-4 w-4"/>
                <span className="sr-only">Twitter</span>
              </div>
            </Link>

            
            <ThemeToggle />
            {/* <MobileNav /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
