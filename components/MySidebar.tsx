import {LinksTree} from "./LinksTree";

export const MySidebar = () => {
  return (
    <aside
      className="sticky top-[11%] max-h-[40rem] overflow-y-auto bg-transparent border-r border-gray-300 pl-2 w-64"
    >
      <nav className="space-y-3">
        {/* <div className="text-xl font-bold">Documentation</div> */}


        <LinksTree/>

        
      </nav>
    </aside>
  );
};




// =============================================

// export const MySidebar = () => {
//   return (
//     <aside
//       className="sticky top-[11%] h-screen overflow-y-auto bg-transparent border-r border-gray-300 p-2 w-64"
//     >
//       <nav className="space-y-2">
//         {/* <div className="text-xl font-bold">Documentation</div> */}

//         <ul className="space-y-2">
//           {/* First Section */}
//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           {/* Second Section */}
//           <li>
//             <h3 className="text-gray-800 font-semibold">API Reference</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Authentication
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Endpoints
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Error Handling
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <h3 className="text-gray-800 font-semibold">Getting Started</h3>
//             <ul className="pl-4 space-y-1">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// =======================================
// import { useState } from 'react';

// export const MySidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <aside className=" scroll-mx-12 w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
//       <nav className="flex flex-col p-4 space-y-4">
//         {/* Title */}
//         <div className="text-xl font-bold text-gray-800">Documentation</div>

//         {/* Collapsible Section */}
//         <div className="space-y-2">
//           <div
//             onClick={toggleCollapse}
//             className="cursor-pointer text-gray-700 hover:text-gray-900"
//           >
//             Getting Started
//           </div>
//           {!isCollapsed && (
//             <ul className="space-y-1 pl-4">
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Installation
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   Configuration
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   First Steps
//                 </a>
//               </li>
//             </ul>
//           )}
//         </div>

//         {/* Another Section */}
//         <div className="space-y-2">
//           <div className="cursor-pointer text-gray-700 hover:text-gray-900">
//             API Reference
//           </div>
//           <ul className="space-y-1 pl-4">
//             <li>
//               <a href="#" className="text-gray-600 hover:text-gray-900">
//                 Authentication
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-gray-600 hover:text-gray-900">
//                 Endpoints
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-gray-600 hover:text-gray-900">
//                 Error Handling
//               </a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </aside>
//   );
// };
