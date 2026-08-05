import { NavLink } from "react-router";

const NavItem = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                    isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-900"
                }`
            }
        >
            {children}
        </NavLink>
    );
};

export default NavItem;