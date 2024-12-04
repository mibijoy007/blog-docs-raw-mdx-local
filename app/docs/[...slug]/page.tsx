
import fs from "node:fs";

import { compileMDX } from "next-mdx-remote/rsc";
import path from "node:path";
import Link from "next/link";
import { formatedTitle } from "@/lib/utils";
import type { MDXComponents } from 'mdx/types'
// import React, { DetailedHTMLProps, HTMLAttributes } from "react";


import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github-dark.css'

export const options = {
  theme: 'github-dark', // Or path to a theme JSON file
  keepBackground: true, // Optional: Keeps background color from the theme
};


const components :  MDXComponents = {
  // Add any custom components
  // pre: ({children, ...props} : DetailedHTMLProps<HTMLAttributes<HTMLPreElement>,HTMLPreElement>) => (
  //   <pre {...props} className=" ">
  //     <code className="language-js">

  //     {children}
  //     </code>
  //   </pre>
  // ),

  // p: ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>,HTMLParagraphElement>) => (
  //   <p className=" text-blue-500" {...props} >
  //     {children}
  //   </p>
  // ),

  // // the following doesn't work as we didn't passed any props
  // h1: ({ children }: { children: React.ReactNode }) => (
  //   <h1 style={{ color: 'red', fontSize: '48px' }} className=''>{children}</h1>
  // ),

  // h1: ({
  //   children,
  //   ...props
  // }: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> ) => (
  //   // // this created problem so we're not giving children any type also it' not necessary
  // // }: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {children:React.ReactNode}) => (
  //   <h1 {...props} className="text-4xl font-bold text-red-400 prose">
  //     {children}
  //   </h1>
  // ),

};

export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string[] };
}) {


  // console.log("FULL PARAMS:", params);

  const slugPath = params.slug.join('/');
  const filePath = path.join(process.cwd(), 'content', 'docs', slugPath, 'page.mdx');

  // const filePath = "./content/docs/1-getting-started/page.mdx";

  // console.log("FULL FILE PATH:", filePath);

 let breadcrumsBasePath = '/docs'

  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");

    // console.log("RAW FILE CONTENT:", fileContent);

    const compiledMDX = await compileMDX({
      source: fileContent,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            // [rehypeHighlight, { theme: 'github-dark' }],
            [ rehypePrettyCode, { theme: 'github-dark'} ]
          ]
        }
        // rehypePlugins: [[rehypePrettyCode, options]],
      },

    });

    // console.log("COMPILED MDX:", compiledMDX);

    return (
      <div className="min-h-screen">
        {/* sidebar */}
        {/* <div className="flex flex-col items-center justify-center">
          

        </div> */}


        {/* breadcrums */}
        <div className="flex gap-2 items-center sticky top-[8%] overflow-y-auto bg-background h-10  border-b  border-gray-300 ">

          <Link href={'/docs'} className="hover:underline ">
            {/* Home */}
           Docs
          </Link>
          {/* {' '}  / {' '} */}
          {' > '}

          {/* {slug} */}
          {params.slug.map((item,index) => {
            breadcrumsBasePath +=  '/'+item;
            return (
            <div key={item} >
              <Link href={breadcrumsBasePath} className="hover:underline">
                {formatedTitle(item)}
              </Link>
              {index < params.slug.length - 1 && ' > '}
              {/* {path = path + '/'} */}
            </div>)
          }
          )}

        </div>

        {/* main contant */}
        <div className=' ml-5 mt-4 prose dark:prose-invert '>
        {/* prose dark:prose-invert */}
          Frontmatter Title  : {compiledMDX.frontmatter.title as string}

          <article>
            {compiledMDX.content}
          </article>
        </div>

        {/* sitetitles */}
        <div></div>
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
