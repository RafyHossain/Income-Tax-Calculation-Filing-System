import { Bell, Menu } from "lucide-react";

import UserDropdown from "@/components/common/UserDropdown";

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h1 className="text-lg font-semibold text-slate-900">
            Dashboard
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative rounded-lg border p-2 transition hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;