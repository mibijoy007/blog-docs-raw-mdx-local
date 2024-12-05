import { CopyCode } from "@/components/CopyCode";
import type { MDXComponents } from "mdx/types";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { FaRegCopy } from "react-icons/fa6";


export const customComponents: MDXComponents = {
    // Add any custom components
    pre: ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
      if(!children){
        // const codeText = typeof children.props.children === 'string' ? children.props.children : children.props.children.props.children;
  
        const codeText  = ''
        console.log("codeText",codeText);
      }
      
      return (
      <pre {...props} className=" p-0 rounded-lg border border-gray-500 ">
        <code className="  ">
          <code className="">
            <code > 
  
              <div className="flex justify-between border-b border-gray-600">
                <div className="p-2 ml-2">
                    file-name.extension
                </div>
  
                
                <button className="flex gap-2 items-center justify-center mr-4 ">
                <FaRegCopy size={20}/>
                {/* <CopyCode code={codeText}/> */}
                <CopyCode code={'console.log("hello")'}/>
                  ffffff
                </button> 
  
                
              </div>
  
              {children}
            </code>
          </code>
        </code>
      </pre>
    )},
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