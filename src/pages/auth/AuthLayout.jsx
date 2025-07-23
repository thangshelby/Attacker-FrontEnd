import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <div className="flex h-full w-[45%] items-center justify-center">
        <Outlet />
      </div>
      <div className="h-full flex-1">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Auth Background"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
