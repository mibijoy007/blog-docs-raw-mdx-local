import type { MDXComponents } from 'mdx/types'

 
export function useMDXComponents(components: MDXComponents): MDXComponents {

  
  return {
    ...components,
    // //does't work as we're using complieMDX.
    // h1: ({ children }) => (
    //   <h1 style={{ color: 'red', fontSize: '48px' }} className='not-prose'>{children}</h1>
    // ),
    // p: ({children}) => (<p className='bg-red-600 text-blue-500 not-prose' >{children}</p>),
  }
}