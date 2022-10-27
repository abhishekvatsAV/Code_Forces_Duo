//styles
import "./Home.css";

import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

//third party
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowRight } from "react-icons/fa";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";
import img from "../assets/hero-img.png";

import axios from "axios";

//socket io
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
socket.on("connect", () => {
  console.log("connected");
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const rangeUpperLimit = useRef(800);
  const rangeLowerLimit = useRef(800);
  const numberOfQuestions = useRef(5);
  const buttonRef = useRef(null);
  const [privateOn, setPrivateon] = useState(false);
  const [modalDismiss, setModalDismiss] = useState(false);

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

  socket.on("user_join", (data) => {
    console.log("user get joined : ", data);
  })


  const handleCreateRoom = async (e) => {
    e.preventDefault();

    if (
      parseInt(rangeLowerLimit.current.value) >= 800 &&
      parseInt(rangeLowerLimit.current.value) <= 3500 &&
      parseInt(rangeUpperLimit.current.value) >= 800 &&
      parseInt(rangeUpperLimit.current.value) <= 3500 &&
      parseInt(rangeLowerLimit.current.value) <=
      parseInt(rangeUpperLimit.current.value) &&
      parseInt(numberOfQuestions.current.value) > 0
    ) {
      setLoading(true);
      const res = await axios.get(
        "https://codeforces.com/api/problemset.problems/"
      );
      const arr = [];
      let size = numberOfQuestions.current.value;
      let i = 0;
      while (size > 0) {
        if (
          res?.data?.result?.problems[i]?.rating >=
          rangeLowerLimit.current.value &&
          res?.data?.result?.problems[i]?.rating <=
          rangeUpperLimit.current.value
        ) {
          arr.push(res.data.result.problems[i]);
          size--;
        }
        i++;
      }
      console.log(arr);
      console.log(userId);
      const response = await axios.post("http://localhost:4000/rooms/addRoom", {
        roomId: roomID,
        password: password,
        roomType: privateOn ? "Private" : "Public",
        host: userId, // objectId of the host from the mongoose
        problems: arr,
        range: {
          lowerLimit: rangeLowerLimit.current.value,
          upperLimit: rangeUpperLimit.current.value,
        },
      });

      // console.log("roomId" + roomID, "user " +user.user.handle);
      socket.emit("join_room", roomID, user.handle);

      setLoading(false);

      navigate(`/room/${roomID}`);
    } else {
      alert(
        "set the range between 800 and 3500 and lowerLimit must be smaller and equal to upperLimit"
      );
      alert(
        `${rangeLowerLimit.current.value}, ${rangeUpperLimit.current.value}, ${numberOfQuestions.current.value}`
      );
    }
  };

  return (
    <div className="home">
      {loading && (
        <div className="center">
          <div id="loading" className="loading1"></div>
          <div id="loading" className="loading2"></div>
          <div id="loading" className="loading3"></div>
        </div>
      )}
      <img src={img} alt="adfdsf" />
      <div className="homeContent">
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
            className={`arrow ${roomID === "" && privateOn === false
              ? "disabled"
              : `${(privateOn === true && password === "") ||
                (privateOn === true && password !== "" && roomID === "")
                ? "disabled"
                : ""
              }`
              }`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />

          {/*  modal here */}
          <form
            className="modal"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            onSubmit={handleCreateRoom}
          >
            <div className="modal-dialog">
              <div
                className="modal-content"
                style={{ backgroundColor: "#171717" }}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Set Room Constraits
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ padding: 0 }}>
                  <div action="" className="homeForm">
                    <label style={{ display: "block" }}>
                      Range <sub>(800 - 3500)</sub> :{" "}
                    </label>
                    <input
                      type="number"
                      min="800"
                      max="3500"
                      required="greater than 800"
                      placeholder="lowerBound"
                      ref={rangeLowerLimit}
                    />
                    {" - "}
                    <input
                      type="number"
                      min="800"
                      max="3500"
                      required="greater than 800"
                      placeholder="upperBound"
                      ref={rangeUpperLimit}
                    />
                    <label style={{ display: "block" }} htmlFor="questionNo">
                      Number of questions:
                    </label>
                    <input
                      name="questionNo"
                      type="number"
                      min="1"
                      max="5"
                      required="greater than 1"
                      placeholder="Questions.."
                      style={{ width: "100%" }}
                      ref={numberOfQuestions}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    ref={buttonRef}
                    data-bs-dismiss={modalDismiss ? "modal" : ""}
                    aria-label={modalDismiss ? "close" : ""}
                    type="submit"
                    className="btn btn-success"
                    onClick={() => setModalDismiss(true)}
                  >
                    Create Room
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
