import { TocItem } from '@/app/docs/[...slug]/page';
import Link from 'next/link'



export function TableOfContents({ headings }: { headings: TocItem[] }) {
 return (
    <div className='sticky top-[14%] w-64 max-h-[34rem] overflow-y-auto border-l dark:border-gray-700 border-gray-300 pl-4'>
   <nav className="  ">

    
     <h2 className="text-lg font-bold mb-4 border-b pb-2">On this page</h2>
     <ul className="space-y-2 ">
       {headings.map((heading) => (
         <li 
           key={heading.id} 
           className={`pl-${(heading.level - 2) * 4} text-sm my-4`}
         >
           <Link 
             href={`#${heading.id}`} 
             className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 font-semibold transition-colors"
           >
             {heading.text.slice(0,30)}
           </Link>
         </li>
       ))}
     </ul>
   </nav>
     </div>
 );
}
