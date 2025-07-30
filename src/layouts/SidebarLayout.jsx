import { useContext, useState, createContext } from "react";
import { logo } from "../assets";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { testimonial1 } from "../assets";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export function SidebarLayout({ children }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen transition-all duration-300 ${expanded ? "w-64" : "w-20"}`}
    >
      <nav className="flex h-full flex-col border-r bg-slate-50 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex min-h-[60px] items-center justify-between p-4 pb-2">
          {/* Container cho logo và text */}
          <div className="flex items-center overflow-hidden">
            {/* Logo luôn hiển thị */}
            <img src={logo} className="h-8 w-8 flex-shrink-0" alt="app logo" />
            {/* Text với animation */}
            <span
              className={`ml-3 text-[20px] font-extrabold whitespace-nowrap transition-all duration-300 ${
                expanded
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{
                display: expanded ? "inline" : "none",
              }}
            >
              StudentCredit
            </span>
          </div>

          {/* Nút toggle */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="flex-shrink-0 rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-1 flex-col px-3 gap-y-2">{children}</ul>
        </SidebarContext.Provider>

        <div
          className={`flex border-t p-3 dark:border-gray-700 ${!expanded ? "justify-center" : ""}`}
        >
          <img
            src={testimonial1}
            className="h-10 w-10 flex-shrink-0 rounded-md"
            alt="user avatar"
          />
          {expanded && (
            <div className="ml-3 flex min-w-0 flex-1 items-center justify-between">
              <div className="min-w-0 leading-4">
                <h4 className="truncate font-extrabold text-gray-800 dark:text-gray-100">
                  {user?.user_name}
                </h4>
                <span className="block truncate text-xs font-semibold text-gray-600 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <MoreVertical
                size={20}
                className="ml-2 flex-shrink-0 text-gray-600 dark:text-gray-400"
              />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      onClick={(e) => {
        if (to == "not-used") {
          e.preventDefault();
        }
      }}
      to={to}
      className={({ isActive }) =>
        `group relative flex cursor-pointer items-center rounded-md py-2 font-medium transition-colors ${
          expanded ? "px-3" : "justify-center px-3"
        } ${
          isActive
            ? "bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100"
            : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-800"
        } ${isActive && to !== "not-used" ? "bg-indigo-50 dark:bg-gray-800" : ""}`
      }
    >
      <div className="flex h-5 min-h-[20px] w-5 min-w-[20px] flex-shrink-0 items-center justify-center">
        <div className="flex h-5 w-5 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </div>
      </div>

      {expanded && (
        <span className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap">
          {text}
        </span>
      )}

      {alert && (
        <div
          className={`absolute h-2 w-2 rounded bg-indigo-400 ${
            expanded ? "top-1/2 right-2 -translate-y-1/2" : "top-1 right-1"
          }`}
        />
      )}

      {!expanded && (
        <div className="invisible absolute left-full z-10 ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm whitespace-nowrap text-indigo-800 opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 dark:bg-gray-800 dark:text-indigo-200">
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default SidebarLayout;
