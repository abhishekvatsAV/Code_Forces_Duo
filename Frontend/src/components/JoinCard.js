//styles
import "./JoinCard.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getSocket } from "../utils/io.connection";


const JoinCard = ({ roomId, name, room, noOfQuestions, range }) => {
  const socket = getSocket();
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  socket.on("user_join", (data) => {
    console.log("user get joined", data);
  });

  const handleClick = async (roomId) => {
    console.log("clicked");
    socket.emit("join_room", roomId, user.handle);
    // console.log(roomId);

    const url = "http://localhost:4000/rooms/joinRoom";
    const response = await axios.post(url, {
      roomId: roomId,
      userId: userId,
    });

    socket.emit("join_room", roomId, user.handle);
    // console.log("roomId - " + roomId,"user - " + user.handle );
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="joinCard">
      <h3>
        {" "}
        <span
          style={{
            display: "block",
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Host
        </span>{" "}
        {name}
      </h3>
      <h4>
        <span
          style={{
            display: "block",
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Range :
        </span>{" "}
        {range.lowerLimit} - {range.upperLimit}{" "}
      </h4>
      <p>
        {" "}
        <span
          style={{
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Number of Questions :
        </span>{" "}
        {noOfQuestions}{" "}
      </p>
      <button
        type="button"
        className="btn btn-outline-success btn-small"
        data-bs-toggle={`${room === "private" && "modal"}`}
        data-bs-target={`${room === "private" && "#exampleModal"}`}
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
