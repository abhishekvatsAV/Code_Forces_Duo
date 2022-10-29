//styles
import "./Room.css";

import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "../components/Player";
import RoomModal from "../components/RoomModal";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

//socket
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

let problems = [];
let competitionId;

const Room = () => {
  const { roomID } = useParams();
  const { pswd } = useSelector((state) => state.password);
  const userId = useSelector((state) => state.user.userId);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [userAdded, setUserAdded] = useState(false);

  // browser back button handling i.e leaving the room 
  window.onpopstate = () => {
    axios.post("http://localhost:4000/rooms/leaveRoom", {
      userId: userId,
      roomId: roomID
    })
  }

  const handleLeaveRoom = async () => {
    await axios.post("http://localhost:4000/rooms/leaveRoom", {
      userId: userId,
      roomId: roomID
    })
    navigate('/home');
  }

  socket.on("user_join", (data) => {
    console.log("user get joined : ", data);
    setUserAdded(true);
  })

  socket.on("total_score", (data) => {
    console.log(": ", data);
    // setUserAdded(true);
  })

  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(
        `http://localhost:4000/rooms/getRoomById?roomId=${roomID}`
      );
      problems = data.data.competitionData.problems;
      competitionId = data.data.competitionData._id;
      setUsers(data.data.roomData.users);
      console.log("problems : ", problems);
      console.log("users: ", users);
    };
    roomData();
    setInterval(() => {
      console.log("go to hell")
      socket.emit('problem_solved', {
        userId: userId,
        roomId:roomID,
        problems,
        competitionId
      })
    },10000)
  }, []);

  return (
    <div className="room">
      <Navbar />

      <RoomModal />
      {users.length === 0 && <h1 style={{color: "red"}}>Loading...</h1>}
      {users.length === 1 &&   <>
        <div className="aliceBox">
          <Player user={users[0]} />
        </div>
      </>     }
      {users.length === 2 && <>
        <div className="roomContent">
        <div className="aliceBox">
          <Player user={users[0]} />
        </div>
        <div className="problemBox" style={{ color: "white" }}>
          {problems.map((problem, i) => (
            <a href={problem.problemId.link} target="_blank">
              {i + 1}. {problem.problemId.name}
            </a>
          ))}
        </div>
        <div className="bobBox">
          <Player user={users[1]} />
        </div>
      </div>
      </>}


      <footer className="roomCreateFooter">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ width: "8rem", height: "50%", marginLeft: "1rem" }}
        >
          Details
        </button>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </footer>
    </div>
  );
};

export default Room;
