import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from '../assets/Logos/Logo.svg';

export default function UserDashboardNavbar() {
    return (
        <header className="w-full bg-black border-b border-zinc-900">
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Left: Logo */}
                <div className="flex items-center gap-2 text-white font-slate-medium text-lg">
                    <span className="w-10 h-10 flex items-center justify-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </span>
                    NextGent
                </div>

                {/* Center: Links */}
                <ul className="hidden md:flex items-center gap-2 text-sm font-slate">
                    {["/", "/validator", "/developer", "/output"].map((path, i) => {
                        const labels = ["Home", "Validator", "Developer", "Output"];

                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `px-4 py-1.5 rounded-full transition cursor-pointer ${isActive
                                        ? "bg-yellow-3  00 text-black font-slate-medium"
                                        : "text-gray-600 hover:bg-yellow-100 hover:text-black"
                                    }`
                                }
                            >
                                {labels[i]}
                            </NavLink>
                        );
                    })}
                </ul>

            </nav>
        </header>
    );
}
