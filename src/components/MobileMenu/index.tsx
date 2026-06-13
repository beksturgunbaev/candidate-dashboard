const MobileMenu = () => {
    return (
        <div className="md:hidden flex h-16 items-center justify-center px-4 bg-white border-b border-gray-200 fixed top-0 z-40 w-full">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-200">
                    CV
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">
                    CV-Scan <span className="text-xs font-normal text-gray-400">HR</span>
                </span>
            </div>
        </div>
    )
}

export default MobileMenu