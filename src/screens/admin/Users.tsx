"use client";
import { useEffect } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { fetchUsers } from "@/lib/features/userSlice";
import TopFilter from "../landing_page/TopFilterPanel";
import UsersTable from "../../components/table/UsersTable";

const Users = (): JSX.Element => {
  const appDispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    appDispatch(fetchUsers());
  }, []);

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

export default Users;
