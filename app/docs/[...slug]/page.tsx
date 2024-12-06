import fs from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "node:path";
import Link from "next/link";
import { formatedTitle } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";


import remarkGfm from "remark-gfm";
// import rehypePrettyCode from "rehype-pretty-code";
import rehypeHighlight from "rehype-highlight";

// //remember whenever change themes we have to change it too
// node_modules>highlightjs>styles>(choose-your-css-file) only choose which are there
// import 'highlight.js/styles/solarized-dark.css';   // this one is not there so wouldn't work
import 'highlight.js/styles/atom-one-dark-reasonable.css'
// import 'highlight.js/styles/github-dark.css'
// // *** also no need to put {theme : "theme-name"} in (compileMDX)

// import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";

export async function generateStaticParams() {
  // Get the list of all MDX files from the docs folder
  const docsDir = path.join(process.cwd(), "content", "docs");
  const files = await fs.promises.readdir(docsDir);

  // Generate paths based on the slugs in the directory
  const paths = files.map((slug) => {
    return {
      slug: slug.split("/"),
    };
  });

  return paths;
}

//dynamically  importing
const CodeComponent = dynamic(()=> import("../../../components/CopyCode"), {ssr:false,})

const customComponents: MDXComponents = {
  // Add any custom components
  pre: ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => (
    <pre {...props} className=" p-0 rounded-lg border border-gray-500 ">
      {/* <CodeComponent children={children} /> */}
      <CodeComponent>{children}</CodeComponent>
    </pre>
  ),
};

// import { visit } from 'unist-util-visit'
// import { Root, Heading } from 'mdast';
// import { Plugin } from 'unified';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
// export const remarkHeadingsWithIdAndTOC:Plugin<[HeadingItem[]],Root> = (headingsArray:HeadingItem[]) => {
//   return (tree : Root)  => {
//     visit(tree,'heading',(node:Heading) => {
//       if(!node.children || !node.children.length) return;

//       //getting text from heading tags
//       const text = node.children.filter((child) => child.type === 'text').map((child) => (child as {value:string}).value ).join('');
//       console.log('text >> ', text);
//       //generate a slug
//       // text = 'asdf'
//       const id = text.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
//       console.log('id >> ',id);

//       //adding id to the headings
//       node.data ={
//         hProperties : {
//           id,
//         }
//       }

//       headingsArray.push({
//         id,
//         text,
//         level:node.depth  // for h1, h2 etc
//       })
//       console.log('headingsArray >> ', headingsArray);

//     })
//   }
// }

// Ensure the function matches the Plugin signature

// import { Node } from 'unist';
// import { TableOfContents } from "@/components/Toc";

// export function extractTOC(): TocItem[] {
//   const headings: TocItem[] = [];

//   visit(tree, 'element', (node: any) => {
//     if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
//       const level = parseInt(node.tagName.charAt(1));
//       const text = node.children[0]?.value || '';
//       const id = node.properties?.id || '';

//       if (id && text) {
//         headings.push({ id, text, level });
//       }
//     }
//   });

//   return headings;
// }

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { visit } from 'unist-util-visit'
import rehypeStringify from 'rehype-stringify'
import { TableOfContents } from "@/components/Toc";


// import CopyCode from "@/components/CopyCode";
// import CodeComponent from "@/components/CopyCode";
import dynamic from "next/dynamic";


// import { FaRegCopy } from "react-icons/fa6";
// import { CopyCode } from "@/components/CopyCode";

// import { Button } from "@/components/ui/button";
// import { FaRegCopy } from "react-icons/fa6";
// import copy from 'copy-to-clipboard';

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

  // const filePath = "./content/docs/1-getting-started/page.mdx";

  // console.log("FULL FILE PATH:", filePath);

  let breadcrumsBasePath = "/docs";

  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");

    // console.log("RAW FILE CONTENT:", fileContent);

    // const headings:HeadingItem[] = [];

    const compiledMDX = await compileMDX({
      source: fileContent,
      components : customComponents,
      // components : {
      //   code :  CodeComponent
      // },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],

          rehypePlugins: [
            // [rehypeHighlight, { theme: "defalut" }],
            // [rehypeHighlight, { theme: 'solarized-dark'  }],
            // // don't really need to add any theme actually
            [rehypeHighlight],   
            // [rehypePrettyCode, { theme: "github-dark",  }],
            rehypeSlug,

            //this is our custom plugin (visit)
            // [remarkHeadingsWithIdAndTOC,headings],
            // [remarkHeadingsWithIDAndTOC,headings],

            //   [rehypeToc,{
            //     headings : ['h1','h2','h3'],
            //     // customizeTOC: (toc) => {
            //     //   // console.log(toc);
            //     //   return (

            //     //       <nav className="border-l-2 border-gray-200 pl-4">
            //     //         <h2 className="text-lg font-semibold mb-3">On This Page</h2>
            //     //         {/* {toc} */}a
            //     //       </nav>

            //     //   );
            //     // } ,
            //     cssClasses: {
            //       toc: 'toc-container',
            //       list: 'toc-list',
            //       listItem: 'toc-item'
            //     }
            //   }
            // ],
          ],
        },
        //
      },
    });

    // console.log("COMPILED MDX:", compiledMDX);
    // console.log('compiledMDX.content.props.mdxType > ', compiledMDX.content);

    // const toc = extractTOC(compiledMDX.content.props.mdxType)
    const toc = extractTOCFromSource(fileContent)
    // console.log('toc >> ', toc);

    return (
      <div className="top-10 min-h-screen ">
        {/* sidebar */}
        {/* <div className="flex flex-col items-center justify-center">
          

        </div> */}

        {/* breadcrums */}
        <div className="flex-col sticky top-[8%] overflow-y-auto bg-background  text-gray-600 text-sm  dark:text-gray-300  border-gray-300 ">
          <div className="flex gap-2 items-center h-8">

          
          <Link href={"/docs"} className="hover:underline ">
            {/* Home */}
            Docs
          </Link>
          {/* {' '}  / {' '} */}
          {" > "}

          {/* {slug} */}
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

          {/* <div className="dark:border-gray-700 border-gray-300 h-3 w-10"/> */}


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
        {/* Toc */}
        {/* <div>
          <aside>
          <nav>
          <ul>
            {
            
            // compiledMDX.headings?.map(({ id, text, level }) => (
            //   <li key={id} style={{ marginLeft: `${(level - 1) * 16}px` }}>
            //     <a href={`#${id}`} className="hover:underline">
            //       {text}
            //     </a>
            //   </li>
            // ))
            
            }
          </ul>
        </nav>
          </aside>
        </div> */}
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

// // ===========================================================
// // import fs from 'node:fs';
// // import path from 'path';
// // import { compileMDX } from 'next-mdx-remote/rsc';

// // // Specify the components you might want to use in MDX
// // const components = {
// //   // Example: h1: (props) => <h1 className="custom-heading" {...props} />
// // };

// // export default async function BlogPage({ params }: { params: { slug: string[] } }) {
// //   try {
// //     // Construct the file path using the slug
// //     const slugPath = params.slug.join('/');
// //     const filePath = path.join(process.cwd(), 'content', 'docs', slugPath, 'page.mdx');

// //     // Read the MDX file
// //     const fileContent = await fs.promises.readFile(filePath, 'utf-8');

// //     // Compile the MDX
// //     const { content, frontmatter } = await compileMDX({
// //       source: fileContent,
// //       components,
// //       options: {
// //         parseFrontmatter: true
// //       }
// //     });
// // console.log(frontmatter);

// //     return (
// //       <div>
// //         <article>
// //           {content}
// //         </article>
// //       </div>
// //     );
// //   } catch (error) {
// //     console.error('Error processing MDX:', error);

// //     return (
// //       <div>
// //         Page not found
// //       </div>
// //     );
// //   }
// // }

// // // Add metadata for the page
// // export async function generateMetadata({ params }: { params: { slug: string[] } }) {
// //   const slugPath = params.slug.join('/');

// //   try {
// //     const filePath = path.join(process.cwd(), 'content', 'docs', slugPath, 'page.mdx');
// //     const fileContent = await fs.promises.readFile(filePath, 'utf-8');

// //     const { frontmatter } = await compileMDX({
// //       source: fileContent,
// //       options: {
// //         parseFrontmatter: true
// //       }
// //     });

// //     return {
// //       title: frontmatter.title || 'Blog Post',
// //       description: frontmatter.description || 'MDX Blog Post'
// //     };
// //   } catch (error) {
// //     return {
// //       title: 'Page Not Found',
// //       description: 'The requested page does not exist'
// //     };
// //   }
// // }

// // // For static generation of routes
// // export async function generateStaticParams() {
// //   const docsDirectory = path.join(process.cwd(), 'content', 'docs');

// //   // Recursively get all MDX files
// //   const getFiles = (dir: string): string[] => {
// //     const files = fs.readdirSync(dir);
// //     return files.flatMap(file => {
// //       const fullPath = path.join(dir, file);
// //       if (fs.statSync(fullPath).isDirectory()) {
// //         return getFiles(fullPath);
// //       }
// //       return file.endsWith('page.mdx') ? [fullPath] : [];
// //     });
// //   };

// //   const mdxFiles = getFiles(docsDirectory);

// //   // Transform file paths to slugs
// //   return mdxFiles.map(file => {
// //     const relativePath = path.relative(docsDirectory, file);
// //     const slugParts = relativePath.replace('/page.mdx', '').split('/');
// //     return { slug: slugParts };
// //   });
// // }
// // ============================================
// // import fs from 'node:fs';

// // import { compileMDX} from 'next-mdx-remote/rsc';

// // const components ={

// // }

// // export default async function BlogPage ({params} : {params :{slug: string[] }}) {
// //   console.log("params: ", params);

// //   const slugPath : string = params.slug.join('/');

// //   const filePath : string = ['./content/docs', slugPath, 'page.mdx'].join('/')

// //   if (!fs.existsSync(filePath)){
// //     return (
// //       <div>
// //         Page doesn&apos;t exists
// //       </div>
// //     )
// //   }

// //   const fileContent  = fs.readFileSync(filePath,'utf-8');

// //   //Compile mdx part
// //   const compiledmdx = await  compileMDX({
// //     source : fileContent,
// //     components,
// //     options: {
// //       parseFrontmatter: true
// //     }
// //    })

// //   const {content } = compiledmdx;

// //   return (
// //     <div>

// //       <article>
// //         {content}
// //       </article>
// //     </div>
// //   )
// // }

// // =============================================
// // import fs from 'node:fs';
// // // import path from 'path';

// // import { compileMDX} from 'next-mdx-remote/rsc';
// // import { MDXRemote } from 'next-mdx-remote';
// // import { serialize } from 'next-mdx-remote/serialize';

// // const components ={

// // }

// // export default async function BlogPage ({params} : {params :{slug: string[] }}) {
// //   console.log("params: ", params);

// //   const slugPath : string = params.slug.join('/');

// //   // const filePath : string = path.join(process.cwd(),'content', 'docs', slugPath, 'page.mdx');
// //   // const filePath : string = path.join('./content/blog', slugPath, 'page.mdx');

// //   const filePath : string = ['./content/docs', slugPath, 'page.mdx'].join('/')

// //    console.log('slugpath: >>>>>> ',slugPath);
// //    console.log('fileepath: >>>>>> ',filePath);

// //   if (!fs.existsSync(filePath)){
// //     return (
// //       <div>
// //         Page doesn&apos;t exists
// //       </div>
// //     )
// //   }

// //   const fileContent  = fs.readFileSync(filePath,'utf-8');
// //   // const fileContent  = fs.readFileSync('./content/docs/1-getting-started/page.mdx','utf-8');

// //   //Compile mdx part
// //   const compiledmdx = await  compileMDX({
// //     source : fileContent,
// //     components,
// //     options: {
// //       parseFrontmatter: true
// //     }
// //    })

// //   const {content , frontmatter} = compiledmdx;

// //   console.log('compiledmdx',compiledmdx);
// //   console.log('content', content);
// //   console.log('frontmatter', frontmatter);

// // // serialize block
// //   const mdxSource =  serialize(fileContent)
// //   console.log('mdxSource',mdxSource);

// //   const slugTitle = slugPath.replace('/',' ')

// //   return (
// //     <div>
// //       <h1 className='text-4xl font-bold mx-4'>
// //         {
// //               slugTitle.replace("-", " ")
// //           }
// //       </h1>

// //       <article>
// //         {/* <MDXRemote {...mdxSource}/> */}
// //         {/* <MDXRemote {...compiledmdx}/> */}
// //         {content}
// //       </article>
// //     </div>
// //   )
// // }

// // =======================================================

// // // app/docs/[...slug]/page.tsx
// // import fs from 'fs'
// // import path from 'path'
// // import { MDXRemote } from 'next-mdx-remote'
// // import { serialize } from 'next-mdx-remote/serialize'
// // import { LRUCache } from 'lru-cache'
// // import { ReactNode, Suspense } from 'react'

// // // Caching setup
// // const mdxCache = new LRUCache<string, any>({ max: 100 });

// // const DocsPage = async ({ params }) => {
// //   const { slug } = params;  // Get the dynamic slug
// //   const filePath = path.join(process.cwd(), 'content', 'docs', slug.join('-'), 'page.mdx');

// //   // Check cache first
// //   let mdxSource = mdxCache.get(filePath);
// //   if (!mdxSource) {
// //     try {
// //       await fs.promises.access(filePath, fs.constants.F_OK);  // Check if file exists
// //       const mdxContent = await fs.promises.readFile(filePath, 'utf-8');
// //       mdxSource = await serialize(mdxContent);  // Serialize MDX content
// //       mdxCache.set(filePath, mdxSource);  // Cache the serialized content
// //     } catch (error) {
// //         // console.log(error);

// //       return <div>Page not found</div>;
// //     }
// //   }

// //   // Dynamically imported components for MDX content
// //   const CodeBlock = dynamic(() => import('../../components/CodeBlock'), { ssr: false });

// //   const components = { CodeBlock };

// //   return (
// //     <div>
// //       <h1>{slug.join(' ')}</h1>
// //       {/* Fallback content while MDX is being processed */}
// //       <Suspense fallback={<div>Loading...</div>}>
// //         <MDXRemote {...mdxSource} components={components} />
// //       </Suspense>
// //     </div>
// //   );
// // };

// // // SEO improvements: Dynamic title and meta tags
// // export async function getStaticProps({ params }) {
// //   const filePath = path.join(process.cwd(), 'content', 'docs', params.slug.join('-'), 'page.mdx');
// //   let mdxContent = '';

// //   try {
// //     mdxContent = await fs.promises.readFile(filePath, 'utf-8');
// //   } catch (error) {
// //     return {
// //       notFound: true,
// //     };
// //   }

// //   const mdxSource = await serialize(mdxContent);

// //   return {
// //     props: { mdxSource },
// //     revalidate: 60,  // Rebuild the page every 60 seconds
// //   };
// // }

// // // Incremental Static Regeneration for MDX content
// // export async function getStaticPaths() {
// //   // Get all paths for docs
// //   const docsPath = path.join(process.cwd(), 'content', 'docs');
// //   const files = fs.readdirSync(docsPath);

// //   const paths = files.map((file) => ({
// //     params: { slug: file.replace('.mdx', '').split('-') },
// //   }));

// //   return {
// //     paths,
// //     fallback: 'blocking', // New pages will be generated on the first request
// //   };
// // }

// // export default DocsPage;

// // // =====================================================

// // // import fs from 'fs';
// // // import path from 'path';
// // // import { compileMDX } from 'next-mdx-remote/rsc'; // For React Server Components

// // // export default async function Page({ params }: { params: { slug: string[] } }) {
// // //   const slug = params.slug.join('/');
// // //   const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.mdx`);

// // //   if (!fs.existsSync(filePath)) {
// // //     return <div>Page not found</div>;
// // //   }

// // //   const source = fs.readFileSync(filePath, 'utf-8');
// // //   const { content } = await compileMDX({ source });

// // //   return (
// // //     <main>
// // //       <article>{content}</article>
// // //     </main>
// // //   );
// // // }
