import AppHeader from '../app-header/app-header';
import { Outlet } from "react-router";
function Layout() {

  return (
    <>
      <AppHeader />
      <Outlet/>
    </>
  );
}

export default Layout;