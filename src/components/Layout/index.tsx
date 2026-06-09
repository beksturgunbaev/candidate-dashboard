import Sidebar from "../Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex gap-4">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Layout