import { appLogo } from "../../assets";
import { ChevronFirst, MoreVertical } from "lucide-react";
import { testimonial1 } from "../../assets";

const Sidebar = ({ chiledren }) => {
  return (
    <>
      <aside className="h-screen">
        <nav className="flex h-full flex-col border-r bg-slate-50 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 pb-2">
            <img src={appLogo} className="h-auto w-32" alt="app logo" />
            <button className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100">
              <ChevronFirst />
            </button>
          </div>
        </nav>
        <ul className="flex flex-col px-3">{chiledren}</ul>
        <div className="flex border-t p-3">
          <img
            src={testimonial1}
            alt="w-10 h-auto rounded-md overflow-hidden"
          />
          <div className="leading-4">
            <h4 className="font-extrabold">Harry Potter</h4>
            <span className="text-xs font-semibold text-gray-600">
              harrypotter@gmail.com
            </span>
          </div>
          <MoreVertical size={20} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
