import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";


function Layout() {

  // Controls whether the sidebar is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  // Toggle sidebar
  const handleMenuClick = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };


  return (
    <div className="app-layout">

      {/* Header */}
      <Header
        onMenuClick={handleMenuClick}
      />


      <div className="page-layout">

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
        />


        {/* Current route/page */}
        <main
          className={`main-content ${
            isSidebarOpen
              ? "with-sidebar"
              : "full-width"
          }`}
        >

          {/* React Router renders Home,
              VideoPlayer, Channel, etc. here */}
          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default Layout;