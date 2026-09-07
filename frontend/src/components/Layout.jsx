import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";


function Layout() {

  // Controls whether the sidebar is visible
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Stores the text entered into the search box
  const [searchTerm, setSearchTerm] = useState("");


  // ======================================================
  // TOGGLE SIDEBAR
  // ======================================================

  const handleMenuClick = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };


  return (
    <div className="app-layout">

      {/* Header receives the search state */}
      <Header
        onMenuClick={handleMenuClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


      <div className="page-layout">

        <Sidebar isOpen={isSidebarOpen} />


        <main
          className={`main-content ${
            isSidebarOpen
              ? "with-sidebar"
              : "full-width"
          }`}
        >

          {/* Pass search term to the current page */}
          <Outlet
            context={{
              searchTerm,
            }}
          />

        </main>

      </div>

    </div>
  );
}


export default Layout;