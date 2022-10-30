import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Room from "./pages/Room";
import Lobby from "./pages/Lobby";

import { io } from "socket.io-client";
import connectToSocket from "./utils/io.connection";
import { useState } from "react";
const socket = connectToSocket();

function App() {
  const [users, setUsers] = useState([]);
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
          <Route path="/room/:roomID" element={<Room users={users} setUsers={setUsers} />} />
          <Route path="/lobby" element={<Lobby setUsers={setUsers} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
