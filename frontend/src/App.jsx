import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            PUBLIC APPLICATION PAGES
            ================================================== */}

        <Route
          element={<Layout />}
        >
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/watch/:id"
            element={<VideoPlayer />}
          />

          <Route
            path="/channel/:id"
            element={<Channel />}
          />
        </Route>

         <Route 
            path="/my-channel" 
            element={<Channel />} >
         </Route>     



        {/* ==================================================
            AUTHENTICATION PAGES
            ================================================== */}

        <Route
          element={<AuthLayout />}
        >
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;