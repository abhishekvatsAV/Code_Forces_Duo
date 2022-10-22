//styles
import "./Home.css";

import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//third party
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowRight } from "react-icons/fa";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";

import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [privateOn, setPrivateon] = useState(false);
  const [roomID, setRoomid] = useState("");
  const handleClick = () => {
    setRoomid(uuidv4);
  };

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  dispatch(changePassword(password));

  const handleClick2 = () => {
    setPassword(uuidv4);
  };

  const handleCreateRoom = async () => {
    const response = await axios.post("http://localhost:4000/rooms/addRoom", {
      roomId: roomID,
      password: password,
      roomType: privateOn ? "Private" : "Public",
      host: `${user[0].handle}`,
    });

    const res = await axios.get(
      "https://codeforces.com/api/problemset.problems/"
    );
    const arr = [];
    let size = 5;
    let i = 0;
    while (size > 0) {
      if (res?.data?.result?.problems[i]?.rating === 800) {
        arr.push(res.data.result.problems[i]);
        size--;
      }
      i++;
    }
    console.log(arr);

    navigate(`/room/${roomID}`);
  };

  return (
    <div className="home">
      <div className="box1">
        <h3>Go to Lobby</h3>
        <p>
          Go to lobby and see how many rooms are open to join and compete with
          them.
        </p>
        <FaArrowRight className="arrow" onClick={() => navigate("/lobby")} />
      </div>
      <div className="box2">
        <h3>Create a Room</h3>
        <p>
          Create your own room and invite your friend or stranger to compete
          with you.
        </p>
        <div className="input-group box2Input">
          <input
            type="text"
            value={roomID}
            readOnly
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            placeholder="Genrate Room ID"
          />
          {/* <input type="text" class="form-control" placeholder="generate room code" aria-label="Recipient's username with two button addons" /> */}
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleClick}
          >
            generate
          </button>
          <CopyToClipboard text={roomID} onCopy={() => alert("Copied")}>
            <button className="btn btn-outline-secondary" type="button">
              copy
            </button>
          </CopyToClipboard>
        </div>

        <div className="container">
          <p>Private Room</p>
          <input
            type="checkbox"
            onClick={() => setPrivateon(privateOn ? false : true)}
          />
        </div>

        {privateOn && (
          <div className="input-group box2Input">
            <input
              type="text"
              value={password}
              readOnly
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              placeholder="Genrate Password"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleClick2}
            >
              generate
            </button>
            <CopyToClipboard text={password} onCopy={() => alert("Copied")}>
              <button className="btn btn-outline-secondary" type="button">
                copy
              </button>
            </CopyToClipboard>
          </div>
        )}
        <FaArrowRight
          className={`arrow ${
            roomID === "" && privateOn === false
              ? "disabled"
              : `${
                  (privateOn === true && password === "") ||
                  (privateOn === true && password !== "" && roomID === "")
                    ? "disabled"
                    : ""
                }`
          }`}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        />

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content" style={{ backgroundColor: "#171717" }}>
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Set Room Constraits
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  // ref={ref}
                ></button>
              </div>
              <div class="modal-body" style={{ padding: 0 }}>
                <form action="" className="homeForm">
                  <label style={{ display: "block" }}>Range: </label>
                  <input
                    type="number"
                    min="800"
                    max="3500"
                    required
                    placeholder="lowerBound"
                  />
                  {" - "}
                  <input
                    type="number"
                    min="800"
                    max="3500"
                    required
                    placeholder="upperBound"
                  />
                  <label style={{ display: "block" }} for="questionNo">
                    Number of questions:
                  </label>
                  <input
                    name="questionNo"
                    type="number"
                    required
                    placeholder="Questions.."
                    style={{ width: "100%" }}
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  type="button"
                  class="btn btn-danger"
                  onClick={handleCreateRoom}
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
