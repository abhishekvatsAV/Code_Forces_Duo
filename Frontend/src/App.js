import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Room from "./pages/Room";
import Lobby from "./pages/Lobby";

import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
socket.on("connect", () => {
  console.log("connected");
});


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/room/:roomID" element={<Room />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
