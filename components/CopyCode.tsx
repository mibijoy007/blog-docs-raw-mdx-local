"use client"

import React, { Children, FC, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

interface CodeComponentProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    // props: {}
    // props: {
    //     className:string;
    //     children:ReactNode;
    // }
}

const CodeComponent: FC<CodeComponentProps> = ({ children, ...props }) => {
    // const CodeComponent = ({ children, ...props }:) => {
    const [copied, setCopied] = useState(false);
    // console.log("children" , children);

    // //this following block did work as the children is not an array even though it looks like one
    // // thus we have to make it an array (follwoing line)
    // // then we face another problem of """Multiple layers of classes""" or code which we can't do by doing
    // // (.map) once but many times.
    // const normalizedChildren = Children.toArray(children)
    // // console.log("normalizedChildren >>>",normalizedChildren);

    // const codeParts = normalizedChildren.map((child) => {
    //     if (typeof child === "string") {
    //         return child; // Direct string content
    //     } else if (React.isValidElement(child)) {
    //         return child.props.children || ""; // Extract child props if it exists
    //     }
    //     return ""; // Default case for unsupported types
    // });
    // // Join the parts to reconstruct the code
    // console.log(" codeParts  ", codeParts);

    // const extractedCode = codeParts.join("");
    // console.log("extractedCode > ", extractedCode);

    // const handleCopy = async () => {
    //     if (!children) return; // Safeguard for empty code blocks
    //     try {
    //         await navigator.clipboard.writeText(children.trim());
    //         // await navigator.clipboard.writeText(extractedCode);
    //         setCopied(true);
    //         toast.success('Copied Successfully!')
    //         setTimeout(() => setCopied(false), 4000); // Reset copied state after 2 seconds
    //     } catch (error) {
    //         console.error("Failed to copy:", error);
    //     }
    // };


    // Function to flatten and extract all string content from children
    const flattenChildren = (node: ReactNode): string[] => {
        const result: string[] = [];

        const traverse = (childNode: ReactNode) => {
            if (typeof childNode === "string") {
                result.push(childNode); // Add direct string content
            } else if (React.isValidElement(childNode)) {
                traverse(childNode.props.children); // Traverse React element children
            } else if (Array.isArray(childNode)) {
                childNode.forEach(traverse); // Handle arrays of nodes
            }
        };

        traverse(node);
        return result;
    };

    // Normalize and flatten the children
    const normalizedChildren = Children.toArray(children);
    // console.log("normalizedChildren", normalizedChildren);

    // const fileExtension: string = normalizedChildren[0]?.props?.className.replace("hljs language-", "") || '' ;
    const fileExtension: string = (normalizedChildren[0] as ReactElement).props?.className.replace("hljs language-", "") ;
    // console.log("fileExtension >> ",fileExtension);

    const flattenedContent = normalizedChildren
        .map((child) => flattenChildren(child).join("")) // Flatten each child and join the strings
        .join(""); // Combine all parts into a single string

    // console.log("Flattened Content: ", flattenedContent);

    const handleCopy = async () => {
        if (!flattenedContent) return; // Safeguard for empty code blocks
        try {
            await navigator.clipboard.writeText(flattenedContent.trim());

            setCopied(true);


            toast.success("Copied Successfully!", {
                style: {
                    color: 'black',
                    backgroundColor: '#cffcd2'
                    // backgroundColor:'#d7f7de'
                },
            });


            setTimeout(() => setCopied(false), 5000); // Reset copied state after 4 seconds
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };


    return (
        // <div></div>
        <div className=" p-0 m-0 ">
            <Toaster />
            {/* <code className="">
                <code className=""> */}
            <div className=" ">


                <div className="flex  justify-between border-b border-gray-600">
                    <div className="p-2 ml-2">
                        {fileExtension}
                    </div>


                    {/* <button className="flex gap-2 items-center justify-center mr-4 ">
                aa
                </button>  */}
                    <button
                        onClick={handleCopy}
                        className=" bg-blue-500 text-white   px-3 py-0 rounded hover:bg-blue-600 transition"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>

                </div>

                <code {...props} className="">{children}</code>

            </div>
            {/* </code>
            </code> */}

        </div>
    );
};

export default CodeComponent;
