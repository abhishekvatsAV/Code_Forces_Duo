//styles
import "./JoinCard.css";

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("user_join", (data) => {
  console.log("user get joined", data);
})

const JoinCard = ({ roomId, name, room, noOfQuestions, range }) => {
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const handleClick = async (roomId) => {
    console.log("clicked");
    socket.emit("join_room", roomId, user.handle);
    // console.log(roomId);

    const url = "http://localhost:4000/rooms/joinRoom";
    const response = await axios.post(url, {
      roomId: roomId,
      userId: userId
    });


    socket.emit("join_room", roomId, user.handle);
    // console.log("roomId - " + roomId,"user - " + user.handle );
    navigate(`/room/${roomId}`)
  };

  return (
    <div className="joinCard">
      <h3>Host - {name}</h3>
      <h4> Range : {range.lowerLimit} - {range.upperLimit} </h4>
      <p> Number of Questions : {noOfQuestions} </p>
      <button
        type="button"
        className="btn btn-danger btn-small"
        data-bs-toggle={`${room === "private" && "modal"}`}
        data-bs-target="#exampleModal"
        onClick={() => handleClick(roomId)}
      >
        join room
      </button>

      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ color: "black" }}
        >
          <div className="modal-content" style={{ backgroundColor: "#171717" }}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "white" }}
              >
                Enter Your Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>{" "}
            <input
              className="modal-body modalInput"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "#444444",
                color: "#171717",
                margin: "0",
              }}
              type="text"
            />
            <div className="modal-footer" style={{ borderTop: "none" }}>
              <button type="button" className="btn btn-light">
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCard;
