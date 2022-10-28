//styles
import "./Room.css";

import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "../components/Player";
import RoomModal from "../components/RoomModal";

let problems = [];
const Room = () => {
  const { roomID } = useParams();
  const [users, setUsers] = useState([]);
  // const [problemsLink , ]

  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(
        `http://localhost:4000/rooms/getRoomById?roomId=${roomID}`
      );
      problems = data.data.competitionData.problems;
      setUsers(data.data.roomData.users);
      console.log("problems : ", problems);
      console.log("users: ", users);
    };
    roomData();
  }, []);

  return (
    <div className="room">
      <Navbar />

      {/* modal */}
      <RoomModal />
      <div className="roomContent">
        <div className="problemBox" style={{ color: "white" }}>
          {problems.map((problem, i) => (
            <a href={problem.problemId.link} target="_blank">
              Q {problem.problemId.name}
            </a>
          ))}
        </div>
        <div className="profileBox">
          {users.map((user, i) => (
            <Player key={i} user={user} />
          ))}
        </div>
      </div>
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
      </footer>
    </div>
  );
};

export default Room;
