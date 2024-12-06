
// import {LinksTree} from "@/components/LinksTree";
// import { getAllBlogLinks, NodeType } from "@/lib/getAllBlogLinks"
// import Link from "next/link";
// import RecursiveLinksTree from "./RecursiveLinksTree";



export default function Page() {

  // const allBlogLinksTree: NodeType[] = getAllBlogLinks();

  return (
    <div className="min-h-dvh">
      This is the docs main page
    </div>
  )
}

{/* <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on all things web dev.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            // If there's no article then
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div> */}

