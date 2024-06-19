"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { checkIsLoggedIn } from "@/utils/helperJWT";
import Dashboard from "@/screens/dashboard/Dashboard";

export default function DashboardPage() {

  const router = useRouter();

  const [ isLoggedIn, setIsLoggedIn ] = useState<Boolean>(false);

  useEffect(() => {
    if(!checkIsLoggedIn()){
      router.push("/login");
    }else{
      setIsLoggedIn(true);
    }
  },[]);
  
  return isLoggedIn && <Dashboard />;
}
