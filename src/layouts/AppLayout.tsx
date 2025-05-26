import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <>
            <div>Hi App layout</div>
            <Outlet />
        </>
    )
}
