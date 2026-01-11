import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminProducts from "./pages/admin/AdminProducts";

const router = createBrowserRouter([
    {
        path: "/",
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
                path: "register",
                element: <AdminRegister />,
            },
            {
                path: "products",
                element: <AdminProducts />,
            },
        ],
    },
]);

export default router;