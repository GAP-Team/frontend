"use client";
import userAPI from "@/api/user";
import { User } from "@/typings/types";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import TopFilter from "../../landing-page/TopFilterPanel";
import { showSnackbar } from "@/lib/features/snackbarSlice";
import UsersTable from "./UsersTable";

const UsersOverview = (): JSX.Element => {
  const appDispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await userAPI.getUsers();
      setUsers(response.data);
    } catch {
      appDispatch(
        showSnackbar({
          type: "error",
          message: "Etwas ist schiefgelaufen. Versuchen Sie es später erneut!",
        })
      );
    }
  };

  return (
    <section className="bg-#E0E0E0 w-full px-3 py-5">
      <div className="mb-4 mr-8">
        <TopFilter title="Alle Benutzer" />
      </div>
      <div className="flex flex-cols-2 mb-8 ">
        <UsersTable users={users} />
      </div>
    </section>
  );
};

export default UsersOverview;
