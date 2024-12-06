import {LinksTree} from "./LinksTree";

export const MySidebar = () => {
  return (
    <aside
      className="sticky top-[11%] max-h-[40rem] overflow-y-auto bg-transparent border-r dark:border-gray-700 border-gray-300 pl-2 w-64"
    >
      <nav className="space-y-3">
        {/* <div className="text-xl font-bold">Documentation</div> */}
        <LinksTree/>
      </nav>
    </aside>
  );
};

