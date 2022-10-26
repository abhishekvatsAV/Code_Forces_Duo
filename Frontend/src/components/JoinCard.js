//styles
import "./JoinCard.css";

import { io } from "socket.io-client";

import { useSelector } from "react-redux";


const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("connected");
});

const JoinCard = ({ roomId, name }) => {
  const user = useSelector((state) => state.user.user);

  const handleClick = (roomId) => {
    console.log("clicked");
    socket.emit("join_room", (roomId, user.handle));
  }

  return (
    <div className="joinCard">
      {/* <h3>{id}</h3> */}
      <h3>{name}</h3>
      <button
        type="button"
        className="btn btn-danger btn-small"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => handleClick(roomId)}
      >
        join room
      </button>

      {/* modal */}
      {/* <div
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
      </div> */}
    </div>
  );
};

export default JoinCard;
