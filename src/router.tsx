import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/Auth/LoginView";
import RegisterView from "./views/Auth/RegisterView";
import RequestTokenView from "./views/Auth/RequestTokenView";
import ConfirmAccountView from "./views/Auth/ConfirmAccountView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,element: <DashboardView />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children:[
            { index: true, element: <LoginView/> },
            { path: 'register', element: <RegisterView/> },
            { path: 'confirm-account', element: <ConfirmAccountView /> },
            { path: 'request-code', element: <RequestTokenView/>},
        ]
    }
])

export default function Router(){
    return (
        <RouterProvider router={router} />
    )
}