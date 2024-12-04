
import {LinksTree} from "@/components/LinksTree";
import { getAllBlogLinks, NodeType } from "@/lib/getAllBlogLinks"
import Link from "next/link";
// import RecursiveLinksTree from "./RecursiveLinksTree";



export default function Page() {

  const allBlogLinksTree: NodeType[] = getAllBlogLinks();

  return (
    <div className="min-h-dvh">
      This is main docs pagedd
      <LinksTree />


    </div>
  )
}



