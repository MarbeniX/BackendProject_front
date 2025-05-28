import { Outlet } from "react-router-dom"
import { userAuth } from "@/hooks/userAuth";
import { Navigate } from "react-router-dom";

export default function AppLayout() {
    const { data, isLoading, isError } = userAuth();

    if(isLoading) return <p>Cargando...</p>
    if(isError) return <Navigate to="/auth" replace/>
    
    return (
        <>
            <div>Hi App layout</div>
            <Outlet />
        </>
    )
}
