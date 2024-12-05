
import nextMdx from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import rehypePrettyCode from 'rehype-pretty-code'
import rehypeHighlight from 'rehype-highlight'

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // these are not needed when working with createMDX
    // remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // [ rehypePrettyCode, { theme: 'github-dark'} ]
      // [rehypeHighlight, { theme: 'github-dark' }],
    ],
  }
})

const nextConfig = withMdx({
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
})

export default nextConfig;


// =====================
// import nextMdx from '@next/mdx'
// import remarkGfm from 'remark-gfm'

// const withMdx = nextMdx({
//   // By default only the `.mdx` extension is supported.
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [remarkGfm],
//         rehypePlugins: [],
//   }
// })

// const nextConfig = withMdx({
//   // Support MDX files as pages:
//   pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
// })

// export default nextConfig
// ============================================

// import createMDX from '@next/mdx'
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Configure `pageExtensions` to include markdown and MDX files
//   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
//   // Optionally, add any other Next.js config below
// }
 
// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
// })
 
// // Merge MDX config with Next.js config
// export default withMDX(nextConfig)

// ============================================

// import remarkGfm from 'remark-gfm'
// import createMDX from '@next/mdx'
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Configure `pageExtensions`` to include MDX files
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   // Optionally, add any other Next.js config below
// //   experimental: {
// //         appDir: true, // Use this only if you're working with the /app directory.
// //       },
// }
 
// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [],
//   },
// })
 
// // Wrap MDX and Next.js config with each other
// export default withMDX(nextConfig)





// // =========================================
// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;


// // ======================================

// // import  withMDX  from '@next/mdx';

// // const nextConfig = withMDX({
// //   extension: /\.mdx?$/
// // })({
// //   experimental: {
// //     appDir: true,
// //   },
// // });

// // export default nextConfig;

// // ================================

// // import mdx from '@next/mdx';

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
// //   experimental: {
// //     appDir: true, // Use this only if you're working with the /app directory.
// //   },
// // };

// // export default mdx(nextConfig); // Apply MDX configuration here



// // =============================

// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     // Configure `pageExtensions` to include MDX files
// //     pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
// //     // Optionally, add any other Next.js config below
// //   }
   
// //  export default withMDX(nextConfig)

// // ===============================================


// // // next.config.mjs
// // import createMDX from '@next/mdx';
// // import remarkGfm from 'remark-gfm';

// // const withMDX = createMDX({
// //   extension: /\.mdx?$/,
// //   options: {
// //     remarkPlugins: [remarkGfm],
// //     rehypePlugins: [],
// //   },
// // });

// // export default withMDX({
// //   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
// // });



