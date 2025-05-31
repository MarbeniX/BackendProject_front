import { Outlet } from "react-router-dom"
import { userAuth } from "@/hooks/userAuth";
import { Navigate } from "react-router-dom";
import Sidebar from "@/components/app/sidebarComp";
import { IoIosArrowDown } from "react-icons/io";


export default function AppLayout() {
    const { data, isLoading, isError } = userAuth();


    if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/auth" replace/>
    
    if(data) return (
        <>
            <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white">
                <Sidebar data={data.admin} />
            </div>
            
            <div className="ml-64 h-screen flex flex-col">
                <header className="bg-gray-100 p-4 flex items-center justify-between h-auto">
                    <div className="text-xl font-semibold text-black">
                        <h1>Hi, what are we doing today?</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                            <label>{data.username}</label>
                            <IoIosArrowDown/>
                        </div>
                    </div>
                </header>

                <main className="p-6 bg-gray-100 h-full">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
