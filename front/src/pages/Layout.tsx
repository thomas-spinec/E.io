import { Outlet } from "react-router-dom";
import NavComponent from "../components/Layout/NavComponent";

function Layout() {
  return (
    <div className="flex flex-col h-[100%] w-[100%]">
      <NavComponent />
      <Outlet />
    </div>
  );
}

export default Layout;
