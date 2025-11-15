import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdAttachMoney, MdMenuBook, MdLogout } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import logo from "../assets/logo.png";

const menu = [
  { name: "Dashboard", path: "/apps/dashboard", icon: <MdDashboard size={22} /> },
  { name: "Transaction", path: "/transactions", icon: <MdAttachMoney size={22} /> },
  { name: "Report", path: "/reports", icon: <MdMenuBook size={22} /> },
];

export default function AppSidebar() {
  const { mobileOpen, toggleMobile } = useSidebar();
  const location = useLocation();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg border-r 
          border-gray-200 dark:border-gray-700 z-50 w-64 transition-transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <div className="p-6 font-bold text-xl text-gray-800 dark:text-white flex justify-center">
            <img
                src={logo} 
                alt="PT Permata Bukit Hijau"
                className="w-20 h-9 lg:w-20 lg:h-10 object-contain"
            />
        </div>

        <nav className="px-4 mt-4 space-y-4">
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
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 w-full px-4">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
          >
            <MdLogout size={22} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
