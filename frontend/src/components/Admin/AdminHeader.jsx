import React, { useState } from "react";
import AdminMenuModal from "./AdminMenuModal";
import { Bars3Icon } from "@heroicons/react/24/solid";

function AdminHeader() {
  const [menuModal, setMenuModal] = useState(false);
  return (
    <>
      <div className="flex shadow-sm lg:hidden space-x-5 bg-[#fff] flex-row px-[20px] py-4 w-full items-center">
        <Bars3Icon
          onClick={() => setMenuModal(true)}
          className="size-5 cursor-pointer text-black"
        />
        <span className="font-medium text-black text-xl">Salesboard</span>
      </div>
      <AdminMenuModal setLoginModal={setMenuModal} loginModal={menuModal} />
    </>
  );
}

export default AdminHeader;
