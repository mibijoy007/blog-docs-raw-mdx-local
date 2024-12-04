import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
// import { posts } from "#site/content";
import Link from "next/link";
// import { PostItem } from "@/components/post-item";

export default function Home() {
  // const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hello, I&apos;m Maksudul Islam
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to workfly, A platform where developers can build products faster only worrying about business logic. We&apos;ll take care of the rest.
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
      <section className="container max-w-4xl py-2 lg:py-4 flex flex-col space-y-6 mt-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Product Details
        </h2>

        <p className=" text-justify">
        Ever feel like your portfolio just doesn&apos;t stand out? You’ve built projects, but they’re the usual, and it’s hard to get recruiters excited about them. 

Now, imagine creating something truly unique—a solution for a real problem that millions face, done in a way that hasn’t been solved effectively before.

Consider this idea: a platform where developers can build backend APIs, but with a tough limitation—everything must fit within 1MB of code, and each request must execute in under 10ms. For many, writing custom code for routing, middleware, and other core functionalities alone could max out this limit, leaving little room for actual business logic.

But what if we built a framework for this platform that provides all the essentials, with an interface as familiar and powerful as Express.js, in just 3-5KB? 
Imagine if this framework handled all core functions—like routing, middleware, and more—in under 1ms. That would leave developers with over 9ms of execution time just for their business logic. 
This lightweight, high-performance tool could easily reach 100K+ weekly downloads!

Now imagine what that kind of project could do for your portfolio. Wouldn’t a recruiter stop and take notice? This could be the project that sets you apart and gets you that job offer.
        </p>
        {/* <ul className="flex flex-col">
          {latestPosts.map((post) => (
            post.published && (
              <li key={post.slug} className="first:border-t first:border-border">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              </li>
            )
          ))}
        </ul> */}
      </section>
    </>
  );
}
