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

import codingImg from "../assets/codingImg.jpg";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.userId);
  const rangeUpperLimit = useRef(800);
  const rangeLowerLimit = useRef(800);
  const numberOfQuestions = useRef(5);

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

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    console.log(rangeLowerLimit.current.value, rangeUpperLimit.current.value);

    if (rangeLowerLimit.current.value > rangeUpperLimit.current.value) {
      console.log("error");
      // return new Error("Please reset the range");
      return console.error("error range must be checked again");
    }

    // console.log(rangeLowerLimit.current.value, rangeUpperLimit.current.value);

    // if (rangeLowerLimit.current.value > rangeUpperLimit.current.value) {
    //   console.log("error");
    //   // return new Error("Please reset the range");
    //   return console.error("error range must be checked again");
    // }

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
        res?.data?.result?.problems[i]?.rating <= rangeUpperLimit.current.value
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

    setLoading(false);

    navigate(`/room/${roomID}`);
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

          <form
            className=" modal"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            onSubmit={(e) => {
              if (
                rangeLowerLimit.current.value >= 800 &&
                rangeLowerLimit.current.value <= 3500 &&
                rangeUpperLimit.current.value >= 800 &&
                rangeUpperLimit.current.value <= 3500 &&
                rangeLowerLimit.current.value <=
                  rangeUpperLimit.current.value &&
                numberOfQuestions.current.value > 0
              ) {
                handleCreateRoom(e);
              } else {
                alert("set the range between 800 and 3500");
              }
            }}
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
                <div className="modal-body hide" style={{ padding: 0 }}>
                  <div action="" className="homeForm">
                    <label style={{ display: "block" }}>
                      Range <sub>(800 - 3500)</sub> :{" "}
                    </label>
                    <input
                      type="number"
                      min="800"
                      max="3500"
                      required
                      placeholder="lowerBound"
                      ref={rangeLowerLimit}
                    />
                    {" - "}
                    <input
                      type="number"
                      min="800"
                      max="3500"
                      required
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
                    data-bs-dismiss={`${
                      rangeLowerLimit.current.value > 0 &&
                      rangeUpperLimit.current.value > 0 &&
                      rangeLowerLimit.current.value <
                        rangeUpperLimit.current.value &&
                      numberOfQuestions.current.value >= 1 &&
                      "modal"
                    }`}
                    aria-label={`${
                      rangeLowerLimit.current.value > 0 &&
                      rangeUpperLimit.current.value > 0 &&
                      rangeLowerLimit.current.value <
                        rangeUpperLimit.current.value &&
                      numberOfQuestions.current.value >= 1 &&
                      "close"
                    }`}
                    type="submit"
                    className="btn btn-danger"
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
