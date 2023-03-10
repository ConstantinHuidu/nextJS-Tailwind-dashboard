import Link from "next/link";
import Tooltip from "./generic/Tooltip";

const SidebarItem = ({ href, title, children }) => (
  <Tooltip tooltip={title}>
    <Link href={href}>
      <div className="bg-slate-100 text-purple-600 hover:bg-slate-200 hover:text-purple-700 cursor-pointer mt-4 md:mt-6 p-2 md:p-3 rounded-lg block">
        {children}
        {/* <p className="text-[0.7rem] font-semibold md:hidden whitespace-nowrap">
          {title}
        </p> */}
      </div>
    </Link>
  </Tooltip>
);

export default SidebarItem;
