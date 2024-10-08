"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user || user.Role.Name !== "admin") {
            router.push("/");
            return;
        }
    }, [user]);
    if (!user || user.Role.Name !== "admin") {
        return null;
    }
    return <>{children}</>;
};

export default AdminLayout;
const AdminRouteList = [
    {
        id: 1,
        name: "Dashboard",
        link: "/admin/dashboard",
    },
    {
        id: 2,
        name: "Roles",
        link: "/admin/manage-roles",
    },
    {
        id: 3,
        name: "Manage Products",
        link: "/admin/view-edit-products",
    },
    {
        id: 4,
        name: "Manage Categories",
        link: "/admin/view-edit-categories",
    },
    {
        id: 5,
        name: "Post Product",
        link: "/admin/post-product",
    },
    {
        id: 6,
        name: "Post Category",
        link: "/admin/post-category",
    },
    {
        id: 7,
        name: "Manage Orders",
        link: "/admin/manage-orders",
    },
];
