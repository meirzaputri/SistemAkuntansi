import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdAttachMoney, MdMenuBook, MdLogout } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import logo from "../assets/logo.png";

const menu = [
  { name: "Dashboard", path: "/apps/dashboard", icon: <MdDashboard size={22} /> },
  { name: "Transaction", path: "/apps/transactions", icon: <MdAttachMoney size={22} /> },
  { name: "Report", path: "/reports", icon: <MdMenuBook size={22} /> },
];

export default function AppSidebar() {
    const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
    const location = useLocation();
    const isVisible = isExpanded || isMobileOpen;

    return (
    <>
      <aside
            className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 flex flex-col transform transition-transform duration-300
                ${isExpanded || isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-20"}
                lg:translate-x-0 lg:w-64`}
      >

        <div className="p-6 font-bold text-xl text-gray-800 dark:text-white flex justify-center">
            <img
                src={logo} 
                alt="PT Permata Bukit Hijau"
                className="w-20 h-9 lg:w-20 lg:h-10 object-contain"
            />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 mt-4 space-y-4">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-5 px-4 py-2 rounded-lg text-sm font-normal
                  transition-all
                  ${active
                    ? "bg-[#216eec] text-white shadow font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
                    ${!isVisible ? 'justify-start' : ''}
                `}
              >
                {item.icon}
                {isVisible && (
                    <span className="flex-1 text-left">{item.name}</span> 
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
          >
            <MdLogout size={22} />
            {isVisible && (
                <span className="flex-1">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {
        isMobileOpen && (
        <div onClick={() => toggleMobileSidebar()} className="fixed inset-0 z-30 lg:hidden"/>
      )}
      
    </>
  );
}
