import { Link, useNavigate } from "react-router";
import { Menu, LogOut } from "lucide-react";

import Logo from "./Logo";
import NavItem from "./NavItem";
import UserDropdown from "./UserDropdown";

import useAuth from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/features">Features</NavItem>
          </div>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <UserDropdown />

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>

              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;