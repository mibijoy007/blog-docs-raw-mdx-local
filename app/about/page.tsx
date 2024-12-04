import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Link from "next/link"


const AboutPage = () => {
  return (
    <>
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
      <div className="container flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
          About Us
         
        </h1>
        <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
          Hello, We&apos;re Workfly. An open source A platform where developers can build products faster only worrying about business logic. We&apos;ll take care of the rest.
        </p>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <Link
            href="/docs"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
          >
            See Docs
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-fit"
            )}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
    
  </>
    
  )
}

export default AboutPage
