import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/views/App/HomeView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/Auth/LoginView";
import RegisterView from "./views/Auth/RegisterView";
import RequestTokenView from "./views/Auth/RequestTokenView";
import ConfirmAccountView from "./views/Auth/ConfirmAccountView";
import RequestPasswordCode from "./views/Auth/RequestPasswordCode";
import ResetPasswordView from "./views/Auth/ResetPasswordView";
import MyRoutinesView from "./views/App/MyRoutinesView";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children:[
            { index: true, element: <LoginView/> },
            { path: 'register', element: <RegisterView/> },
            { path: 'confirm-account', element: <ConfirmAccountView /> },
            { path: 'request-code', element: <RequestTokenView/>},
            { path: 'request-password-code', element: <RequestPasswordCode /> },
            { path: 'reset-password/:token', element: <ResetPasswordView /> },
        ]
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Home />},
            { path: 'my-routines', element: <MyRoutinesView /> },
        ]
    },
])

export default function Router(){
    return (
        <RouterProvider router={router} />
    )
}