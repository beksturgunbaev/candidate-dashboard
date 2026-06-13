import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="md:flex hidden w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex-col md:h-screen sticky top-0 z-40">
            <div className="h-16 items-center px-6 border-b border-gray-100 flex">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-200">
                        CV
                    </div>
                    <span className="font-bold text-lg text-gray-900 tracking-tight">
                        CV-Scan <span className="text-xs font-normal text-gray-400">HR</span>
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 md:py-6 space-y-1">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <svg
                        className="w-5 h-5 shrink-0 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span>Кандидаты</span>
                </NavLink>
            </nav>

            <div className="p-4 border-t border-gray-100 mt-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-inner">
                    HR
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-gray-800 truncate">
                        Жибек
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                        Recruiter / Dashboard
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;