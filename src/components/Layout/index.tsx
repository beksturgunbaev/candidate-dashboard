import Sidebar from "../Sidebar"
import MobileMenu from "../MobileMenu"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="md:pt-0 pt-16 w-full">
                <Outlet />
            </div>
            <MobileMenu />
        </div>
    )
}

export default Layout