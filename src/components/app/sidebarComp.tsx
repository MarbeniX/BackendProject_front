import { Link } from "react-router-dom"

export default function sidebarComp() {
    const links = [
        { name: "Home", path: ""},
        { name: "My routines", path: ""},
        { name: "My activity", path: ""},
        { name: "Train", path: ""},
    ]

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
                </nav>
            </aside>
        </>
    )
}
