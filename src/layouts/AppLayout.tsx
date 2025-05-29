import { Outlet } from "react-router-dom"
import { userAuth } from "@/hooks/userAuth";
import { Navigate } from "react-router-dom";
import Header from "@/components/app/headerComp";
import Sidebar from "@/components/app/sidebarComp";

export default function AppLayout() {
    const { data, isLoading, isError } = userAuth();

    if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/auth" replace/>
    
    return (
        <>
            <div className="flex">
                <div className="fixed top-0 left-0 h-screen w-64 z-40">
                    <Sidebar />
                </div>
            </div>

            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
