import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="w-[45%] flex  items-center justify-center h-full">
        <Outlet />
      </div>
      <div className="flex-1 h-full"> 
        <img src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="Auth Background" className="h-full w-full " />
      </div>
    </div>
  );
};

export default AuthLayout;
