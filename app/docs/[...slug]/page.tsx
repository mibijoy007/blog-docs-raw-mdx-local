import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "node:path";
import Link from "next/link";
import { formatedTitle } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

// //remember whenever change themes we have to change it too
// node_modules>highlightjs>styles>(choose-your-css-file) only choose which are there
import 'highlight.js/styles/atom-one-dark-reasonable.css'
// // *** also no need to put {theme : "theme-name"} in (compileMDX)

import rehypeSlug from "rehype-slug";

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "content", "docs");
  const files = await fs.promises.readdir(docsDir);
  const paths = files.map((slug) => {
    return {
      slug: slug.split("/"),
    };
  });

  return paths;
}

//dynamically  importing
const CodeComponent = dynamic(() => import("../../../components/CopyCode"), { ssr: false, })

const customComponents: MDXComponents = {
  pre: ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => (
    <pre {...props} className=" p-0 rounded-lg border border-gray-500 ">
      <CodeComponent>{children}</CodeComponent>
    </pre>
  ),
};

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { visit } from 'unist-util-visit'
import rehypeStringify from 'rehype-stringify'
import { TableOfContents } from "@/components/Toc";
import dynamic from "next/dynamic";
import remarkFrontmatter from 'remark-frontmatter';

type HeadingNode = {
  type: 'element';
  tagName: string; // e.g., "h1", "h2", etc.
  properties?: { [key: string]: string }; // e.g., { id: "some-id" }
  children: { type: string; value?: string }[]; // Text or nested elements
};

export function extractTOCFromSource(source: string): TocItem[] {
  const headings: TocItem[] = [];

  unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(() => (tree) => {
      visit(tree, 'element', (node: HeadingNode) => {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          // console.log('node >> ',node);

          const level = parseInt(node.tagName.charAt(1));
          const text = node.children[0]?.value || '';
          const id = node.properties?.id ||
            text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          headings.push({ id, text: text.trim(), level });
        }
      });
    })
    .processSync(source);
  
  return headings;
}


export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // console.log("FULL PARAMS:", params);

  const slugPath = params.slug.join("/");
  const filePath = path.join(
    process.cwd(),
    "content",
    "docs",
    slugPath,
    "page.mdx"
  );

  let breadcrumsBasePath = "/docs";

  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");


    const compiledMDX = await compileMDX({
      source: fileContent,
      components: customComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],

          rehypePlugins: [
            [rehypeHighlight],
            rehypeSlug,
          ],
        },
        //
      },
    });

    // console.log("COMPILED MDX:", compiledMDX);

    const toc = extractTOCFromSource(fileContent)
    // console.log('toc >> ', toc);

    return (
      <div className="top-10 min-h-screen ">

        {/* breadcrums */}
        <div className="flex-col sticky top-[8%] overflow-y-auto bg-background  text-gray-600 text-sm  dark:text-gray-300  border-gray-300 ">
          <div className="flex gap-2 items-center h-8">
            <Link href={"/docs"} className="hover:underline ">
              {/* Home */}
              Docs
            </Link>
            {/* {' '}  / {' '} */}
            {" > "}

            {/* {slug for later paths} */}
            {params.slug.map((item, index) => {
              breadcrumsBasePath += "/" + item;
              return (
                <div key={item}>
                  <Link href={breadcrumsBasePath} className="hover:underline">
                    {formatedTitle(item)}
                  </Link>
                  {index < params.slug.length - 1 && " > "}
                  {/* {path = path + '/'} */}
                </div>
              );
            })}

          </div>
          <div className="bg-blue-600 dark:h-[1px] h-[2px] w-[35rem] mt-1" />
        </div>

        {/* main contant */}
        <div className="flex ">
          <div className=" ml-5  prose dark:prose-invert ">
            {/* Frontmatter Title : {compiledMDX.frontmatter.title as string} */}
            <article className="w-[42rem]">{compiledMDX.content}</article>
          </div>

          {/* toc */}
          <div className="ml-40 flex  ">
            <aside>
              <TableOfContents headings={toc} />
            </aside>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("FULL ERROR:", error);
    return (
      <div>
        Error processing page:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
}
