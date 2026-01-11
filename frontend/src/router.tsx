import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import DefaultLayout from "./components/layout/DefaultLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/:slug",
                element: <ProductDetail />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "login",
                element: <AdminLogin />,
            },
            {
                path: "products",
                element: <AdminProducts />,
            },
        ],
    },
]);

export default router;