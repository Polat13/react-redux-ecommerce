import { Outlet } from "react-router-dom";
import React from "react";

export function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;