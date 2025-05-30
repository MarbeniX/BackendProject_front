import { Outlet } from "react-router-dom"
import { userAuth } from "@/hooks/userAuth";
import { Navigate } from "react-router-dom";
import Header from "@/components/app/headerComp";
import Sidebar from "@/components/app/sidebarComp";

export default function AppLayout() {
    const { data, isLoading, isError } = userAuth();

    if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/auth" replace/>
    
    if(data) return (
        <>
            <div className="fixed top-0 left-0 h-screen w-64">
                <Sidebar data={data.admin}/>
            </div>

            <div className="ml-64 flex-col">
                <Header data={data.username}/>
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
