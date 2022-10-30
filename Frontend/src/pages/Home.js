//styles
import "./Home.css";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { CreateRoomModal } from "../components/CreateRoomModal";

//third party
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";
import img from "../assets/hero-img.png";

import axios from "axios";

//socket io
import { getSocket } from "../utils/io.connection";

export default function Home() {
  const socket = getSocket();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const rangeUpperLimit = useRef(800);
  const rangeLowerLimit = useRef(800);
  const numberOfQuestions = useRef(5);
  const [privateOn, setPrivateon] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const notify = () => {
    toast("Copied!");
  };

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
      socket.emit("join_room", roomID, {
        ...user,
        userId
      });

      setLoading(false);
      setShowModal(false);

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

  const privateOnOff = () => {
    if (privateOn) {
      setPassword("");
      setPrivateon(false);
    } else {
      setPrivateon(true);
    }
  };

  return (
    <div className="home">
      {loading && (
        <div className="center" style={{ zIndex: "5" }}>
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
            <CopyToClipboard text={roomID} onCopy={notify}>
              <button className="btn btn-outline-secondary" type="button">
                copy
              </button>
            </CopyToClipboard>
          </div>

          <div className="container">
            <p>Private Room</p>
            <input type="checkbox" onClick={privateOnOff} />
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
              <CopyToClipboard text={password} onCopy={notify}>
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
            onClick={() => setShowModal(true)}
          />

          {/*  modal here */}
          {showModal && (
            <CreateRoomModal
              rangeUpperLimit={rangeUpperLimit}
              rangeLowerLimit={rangeLowerLimit}
              numberOfQuestions={numberOfQuestions}
              handleCreateRoom={handleCreateRoom}
              showModal={setShowModal}
            />
          )}
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
