import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";


function Layout({ children }) {

  // Controls whether the sidebar is visible
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  // Toggle sidebar when hamburger button is clicked
  const handleMenuClick = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };


  return (
    <div className="app-layout">

      {/* Header stays at the top */}
      <Header onMenuClick={handleMenuClick} />

      <div className="page-layout">

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Current page */}
        <main
          className={`main-content ${
            isSidebarOpen ? "with-sidebar" : "full-width"
          }`}
        >
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;