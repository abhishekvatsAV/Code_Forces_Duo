//styles
import "./Room.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "../components/Player";
let problems = [];


const Room = () => {
  const { roomID } = useParams();
  const { pswd } = useSelector((state) => state.password);
  const userId = useSelector((state) => state.user.userId);
  const [users, setUsers] = useState([]);

  // browser back button handling i.e leaving the room 
  useEffect(() => {
    window.onpopstate = () => {
      axios.post("http://localhost:4000/rooms/leaveRoom", {
        userId: userId,
        roomId: roomID
      })
    }
  })
  
  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(`http://localhost:4000/rooms/getRoomById?roomId=${roomID}`)
      console.log(data);
      problems = data.data.competitionData.problems;
      setUsers(data.data.roomData.users);
      console.log("problems : ", problems);
      console.log("users: ", users);
    }
    roomData();
  }, [])

  return (
    <div className="room">
      <Navbar />

      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "var(--dark-black)" }}
          >
            <div className=" modal-body invite">
              <div
                className="modal-header"
                style={{
                  padding: "0",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h3>Here's the link to your meeting</h3>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <p>
                Copy the link and send it to people you want to compete with.
              </p>
              <h5>Room Id:</h5>
              <div className="input-group mb-3 inputLink">
                <input
                  type="text"
                  value={roomID}
                  readOnly
                  className="form-control"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <CopyToClipboard text={roomID} onCopy={() => alert("Copied")}>
                  <button className="btn btn-outline-secondary">copy</button>
                </CopyToClipboard>
              </div>
              {pswd !== "" && (
                <>
                  <h5>Password:</h5>
                  <div className="input-group mb-3 inputLink">
                    <input
                      type="text"
                      value={pswd}
                      readOnly
                      className="form-control"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <CopyToClipboard text={pswd} onCopy={() => alert("Copied")}>
                      <button className="btn btn-outline-secondary">
                        copy
                      </button>
                    </CopyToClipboard>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>



      {users.map((user) =>
        <Player user={user} />
      )}



      <footer className="roomCreateFooter">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          // ref={ref}
          style={{ width: "8rem", height: "50%", marginLeft: "1rem" }}
          onClick={() => console.log("clicked")}
        >
          Details
        </button>
      </footer>
    </div>
  );
};

export default Room;
