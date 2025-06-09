import type { AuthGetUser } from "@/types/authTypes"
import { Link } from "react-router-dom"

type SideBarProps = {
    data: AuthGetUser['admin']
}

export default function sidebarComp({data} : SideBarProps) {

    const links = [
        { name: "Home", path: ""},
        { name: "My routines", path: "/my-routines"},
        { name: "My activity", path: ""},
        { name: "Train", path: ""},
    ]

    const adminLinks = data? 
        [
            { name: "Admin profile", path: "" },
            { name: "Database", path: "/admin/database" },
        ]
    : [];

    return (
        <>
            <aside className="bg-gray-500 w-full h-screen text-white flex flex-col justify-center">
                <nav className="flex flex-col space-y-3 ml-5">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg px-4 py-2 rounded hover:bg-gray-700 transition ${
                                location.pathname === link.path ? "bg-gray-700" : ""
                            }`}                            
                        >
                            {link.name}
                        </Link>
                    ))}

                    {adminLinks.length > 0 && (
                        <div className="border-t border-gray-600 w-4/5"/>
                    )}

                    {adminLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg px-4 py-2 rounded hover:bg-blue-700 transition ${
                                location.pathname === link.path ? "bg-blue-700" : ""
                            }`}                            
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    )
}
