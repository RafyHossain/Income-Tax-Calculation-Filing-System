import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  User,
  Wallet,
  Receipt,
  Calculator,
  FileText,
  LogOut,
  X,
  House,
} from "lucide-react";

import useAuth from "@/hooks/useAuth";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Income",
    path: "/dashboard/income",
    icon: Wallet,
  },
  {
    name: "Expense",
    path: "/dashboard/expense",
    icon: Receipt,
  },
  {
    name: "Tax Calculation",
    path: "/dashboard/tax-calculation",
    icon: Calculator,
  },
  {
    name: "Tax Filing",
    path: "/dashboard/tax-filing",
    icon: FileText,
  },
];

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    setSidebarOpen(false);

    navigate("/");
  };

  const handleGoHome = () => {
    setSidebarOpen(false);

    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          border-r
          bg-white
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:sticky
          md:top-0
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}

        <div className="shrink-0 border-b p-5">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              IncomeTax
            </h2>

            <button
              type="button"
              className="md:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <X className="h-6 w-6" />
            </button>

          </div>


          {/* User Information */}

          {user && (
            <div className="mt-6 flex items-center gap-3">

              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.full_name
                  )}`
                }
                alt={user.full_name}
                className="h-12 w-12 rounded-full border object-cover"
              />

              <div className="min-w-0">

                <h3 className="truncate font-semibold">
                  {user.full_name}
                </h3>

                <p className="text-sm capitalize text-slate-500">
                  {user.role}
                </p>

              </div>

            </div>
          )}

        </div>


        {/* Scrollable Menu */}

        <nav className="min-h-0 flex-1 overflow-y-auto p-4">

          <div className="space-y-2">

            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  end={menu.path === "/dashboard"}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>
                    {menu.name}
                  </span>
                </NavLink>
              );
            })}

          </div>

        </nav>


        {/* Sidebar Footer */}

        <div className="shrink-0 space-y-2 border-t p-4">

          {/* Home */}

          <button
            type="button"
            onClick={handleGoHome}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
          >
            <House className="h-5 w-5 shrink-0" />

            <span>
              Home
            </span>
          </button>


          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 shrink-0" />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
};

export default DashboardSidebar;