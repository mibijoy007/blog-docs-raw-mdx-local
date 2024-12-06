import nextMdx from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeHighlight from 'rehype-highlight'

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

