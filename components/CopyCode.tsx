"use client"

import React, { Children, FC, HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

interface CodeComponentProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}

const CodeComponent: FC<CodeComponentProps> = ({ children, ...props }) => {
    const [copied, setCopied] = useState(false);
    // console.log("children" , children);

    // flatten and extract  strings  from children
    const flattenChildren = (node: ReactNode): string[] => {
        const result: string[] = [];

        const traverse = (childNode: ReactNode) => {
            if (typeof childNode === "string") {
                result.push(childNode); // Add direct string content
            } else if (React.isValidElement(childNode)) {
                traverse(childNode.props.children); // Traverse through children
            } else if (Array.isArray(childNode)) {
                childNode.forEach(traverse); // arrays of nodes
            }
        };

        traverse(node);
        return result;
    };

    // Normalize and flatten the children
    const normalizedChildren = Children.toArray(children);
    // console.log("normalizedChildren", normalizedChildren);

    const fileExtension: string = (normalizedChildren[0] as ReactElement).props?.className.replace("hljs language-", "") ;
    // console.log("fileExtension >> ",fileExtension);

    const flattenedContent = normalizedChildren
        .map((child) => flattenChildren(child).join(""))
        .join(""); 

    // console.log("Flattened Content: ", flattenedContent);

    const handleCopy = async () => {
        if (!flattenedContent) return; 
        try {
            await navigator.clipboard.writeText(flattenedContent.trim());
            setCopied(true);

            toast.success("Copied Successfully!", {
                style: {
                    color: 'black',
                    backgroundColor: '#cffcd2'
                },
            });

            setTimeout(() => setCopied(false), 5000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };


    return (

        <div className=" p-0 m-0 ">
            <Toaster />
            <div className=" ">
                <div className="flex  justify-between border-b border-gray-600">
                    <div className="p-2 ml-2">
                        {fileExtension}
                    </div>

                    <button
                        onClick={handleCopy}
                        className=" bg-blue-500 text-white   px-3 py-0 rounded hover:bg-blue-600 transition"
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>

                </div>

                <code {...props} className="">{children}</code>

            </div>
        </div>
    );
};

export default CodeComponent;
