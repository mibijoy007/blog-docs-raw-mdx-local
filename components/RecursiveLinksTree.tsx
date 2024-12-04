import { NodeType } from "@/lib/getAllBlogLinks";
import Link from "next/link";


export default function RecursiveLinksTree({allBlogLinksTree}: {allBlogLinksTree : NodeType[]}) {
    // console.log("allBlogLinksTree",allBlogLinksTree);
    
    return (
        <div>
            <ul>
                {allBlogLinksTree.map((items) => (
                    
                        <li key={items.name}>
                            <Link href={items.path} className="hover:underline"> {items.name} </Link> 
                            
                            {items.children.length > 0 && items.children.length < 3 &&
                             
                             (  
                                <div className=" flex gap-4 ">
                                    {" >> "}
                                 <RecursiveLinksTree allBlogLinksTree={items.children}/>
                                </div>
                             )
                            
                            }

                        </li>

                   
                ))}
            </ul>
        </div>
    )
}

