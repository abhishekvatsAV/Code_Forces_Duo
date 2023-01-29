//styles
import "./Room.css";

import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "../components/Player";
import RoomModal from "../components/RoomModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

//socket
import { getSocket } from "../utils/io.connection";
import Messages from "../components/Messages";

let problems = [];
let competitionId;

const Room = ({ users, setUsers }) => {
  const socket = getSocket();
  const { roomID } = useParams();
  const userId = useSelector((state) => state.user.userId);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [psswd, setpsswd] = useState("");
  const [gameOver, setGameOver] = useState(false);
  socket.emit("join_room", roomID, {
    ...user,
    userId
  });
  // console.log(users);
  socket.on("user_left", (data) => {
    // console.log(data.message);
    setUsers((prev) => {
      let curr = prev.filter(
        (user) => user.userId._id.toString() !== data.userData.userId.toString()
      );
      return curr;
    });
  });
  socket.off("user_join");
  socket.on("user_join", (data) => {
    // console.log("user get joined", data);
    let user = data.userData;
    setUsers((prev) => {
      let userIndex = prev.findIndex(
        (userData) => userData.userId._id.toString() === user.userId.toString()
      );
      if (userIndex !== -1) {
        return prev;
      }
      // console.log(userIndex);
      let curr = [
        ...prev,
        {
          userId: {
            profile: {
              ...user,
            },
            _id: user.userId,
            userName: user.handle,
          },
          score: 0,
        },
      ];
      // console.log("curr", curr);
      return curr;
    });
  });

  socket.on("total_score", (data) => {
    // console.log("here3");
    // console.log("data: ", data);
    let userId = data.userId;
    let userIndex = users.findIndex(
      (user) => user.userId._id.toString() === userId.toString()
    );
    // console.log(userIndex);
    if (userIndex === -1) {
      return;
    }
    users[userIndex].score = data.totalScore;
    // console.log(userId);
    let newUsers = [...users];
    setUsers(newUsers);
  });

  // browser back button handling i.e leaving the room
  window.onpopstate = () => {
    axios.post("http://localhost:4000/rooms/leaveRoom", {
      userId: userId,
      roomId: roomID,
    });
    socket.emit("leave_room", roomID, {
      userId,
      userName: user.handle,
    });
  };

  const handleLeaveRoom = async () => {
    await axios.post("http://localhost:4000/rooms/leaveRoom", {
      userId: userId,
      roomId: roomID,
    });
    socket.emit("leave_room", roomID, {
      userId,
      userName: user.handle,
    });
    navigate("/home");
  };

  const maxScore = (problems) => {
    let mxScr = 0;
    // console.log("fjageriutsbjln : ", problems);
    problems.map((problem, i) => {
      // console.log(problem);
      mxScr += problem.problemId.rating / 100;
    });
    // console.log(mxScr);
    return mxScr;
  };

  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(
        `http://localhost:4000/rooms/getRoomById?roomId=${roomID}`
      );
      problems = data.data.competitionData.problems;
      // maxScore(problems);
      competitionId = data.data.competitionData._id;
      setUsers((prev) => {
        return data.data.roomData.users.map((user) => {
          user.score = 0;
          return user;
        });
      });
      // console.log("problems : ", problems);
      // console.log("users: ", users);
      // console.log(data.data.roomData.password);
      setpsswd(data.data.roomData.password);
    };
    roomData();
    setInterval(() => {
      // console.log("go to hell");
      socket.emit("problem_solved", {
        userId: userId,
        roomId: roomID,
        problems,
        competitionId,
      });
    }, 500000);
    // console.log("run", socket);
  }, []);

  const updateScore = () => {
    socket.emit("problem_solved", {
      userId: userId,
      roomId: roomID,
      problems,
      competitionId,
    });
  };
  
  return (
    <div className="room">
      <Navbar />
      {gameOver && <h1>Game Over</h1>}
      <RoomModal password={psswd} />
      {users.length === 0 && <h1 style={{ color: "red" }}>Loading...</h1>}
      {users.length === 1 && (
        <>
          <div className="aliceBox">
            <Player user={users[0]} score={users[0].score} />
          </div>
        </>
      )}
      {users.length === 2 && (
        <>
          <div className="roomContent">
            <div className="aliceBox">
              <Player user={users[0]} score={users[0].score} />
            </div>
            <div className="centerBox">
              <div className="problemBox" style={{ color: "white" }}>
                {problems.map((problem, i) => (
                  <a href={problem.problemId.link} target="_blank">
                    {i + 1}. {problem.problemId.name}
                  </a>
                ))}
              </div>


              {/* TODO here i will add chat for now but will change later  */}


              {/* <div><p style={{color:"red"}}>frghfjlnjdvcyhebjslnfuxyohjlnesfdyouxhljnvetisodgyh</p></div> */}
              <Messages users = {users} roomId = {roomID} />
              
              
              
              
              
              
              <Timer users={users} />
            </div>
            <div className="bobBox">
              <Player user={users[1]} score={users[1].score} />
            </div>
          </div>
        </>
      )}

      <footer className="roomCreateFooter">
        <div>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ width: "8rem", height: "50%", marginLeft: "1rem" }}
          >
            Details
          </button>
          <button
            className="btn btn-primary mx-4"
            style={{ height: "50%", marginLeft: "1rem" }}
            onClick={updateScore}
          >
            update score
          </button>
        </div>
        <button
          className="btn btn-danger btn-lg mx-4"
          onClick={handleLeaveRoom}
        >
          Leave Room
        </button>
      </footer>
    </div>
  );
};

export default Room;
