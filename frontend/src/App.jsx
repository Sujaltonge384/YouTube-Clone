import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";


function App() {
  return (
    <BrowserRouter>

      <Layout>

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Video player */}
          <Route
            path="/watch/:id"
            element={<VideoPlayer />}
          />

          {/* Channel */}
          <Route
            path="/channel/:id"
            element={<Channel />}
          />

        </Routes>

      </Layout>

    </BrowserRouter>
  );
}

export default App;