"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkIsLoggedIn } from "@/utils/helperJWT";
import Dashboard from "@/screens/dashboard/Dashboard";

export default function DashboardPage() {

  const router = useRouter();

  useEffect(() => {
    if(!checkIsLoggedIn()){
      router.push("/login");
    }
  },[]);
  
  return <Dashboard />;
}
