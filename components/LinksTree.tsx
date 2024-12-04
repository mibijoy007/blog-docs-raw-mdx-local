import { getAllBlogLinks, NodeType } from "@/lib/getAllBlogLinks";
import { formatedTitle } from "@/lib/utils";
import Link from "next/link";
import { GoVersions } from "react-icons/go";
// generatestatic

export  function LinksTree() {
    const allBlogLinksTree: NodeType[] = getAllBlogLinks();

    // console.log("Formated title: ",formatedTitle('1-1-before-starting'))

    return (
        <ul className="">

            {/* recursive is not viable as we don't get too much child like 4 in */}
            {/* <RecursiveLinksTree allBlogLinksTree={allBlogLinksTree} />   */}

            {/* we'll just go with 3  children and the rest will bet ignored */}

            {allBlogLinksTree.map((items) => (
                <ul key={items.name} className="">
                    <li className="">
                        {/* {' >> '} */}
                        <div className="inline-flex items-center gap-3 px-2 py-2 pr-8 mb-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/15 cursor-pointer">
                            <div className="border rounded-sm border-current p-2">
                                <GoVersions className=" " size={16} />
                            </div>


                            <span className=" font-bold text-2xl ">Version : 1.0</span>

                        </div>

                        {/* <Link href={items.path} className="hover:underline font-extrabold text-xl"> {formatedTitle(items.name)} </Link> */}
                        {items.children.map((nItems) => (
                            <ul key={nItems.name} >
                                <li className="mb-3">

                                    {/* {' >> >>'} */}
                                    <Link href={nItems.path}
                                        className="hover:underline text-current font-semibold"
                                    > {formatedTitle(nItems.name)} </Link>
                                    {/* now nn itmes */}
                                    {
                                        nItems.children.map((nnItems) => (
                                            <ul key={nnItems.name} className="pl-4 space-y-1">
                                                <li className="my-1">
                                                    {/* {' >> >> >> '} */}
                                                    <Link href={nnItems.path}
                                                        className=" text-gray-800 dark:text-gray-300 hover:text-gray-500"

                                                    > {formatedTitle(nnItems.name)} </Link>

                                                    {/* we won't accept any more layer for now */}
                                                </li>
                                            </ul>
                                        ))
                                    }
                                </li>
                            </ul>
                        ))
                        }


                    </li>

                </ul>
            ))}
        </ul>
    )
}