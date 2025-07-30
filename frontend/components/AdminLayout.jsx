"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/useAuthStore";
import toast from "react-hot-toast"; // or your Toast function

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else if (authUser.role !== "admin") {
      toast.error("You do not have permission to access this page.");
      router.push("/dashboard");
    }
  }, [authUser, router]);

  if (!authUser || authUser.role !== "admin") {
    return null; 
  }

  return <>{children}</>;
};

export default AdminLayout;
