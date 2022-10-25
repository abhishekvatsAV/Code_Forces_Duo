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

import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const rangeUpperLimit = useRef(0);
  const rangeLowerLimit = useRef(0);
  const numberOfQuestions = useRef(0);

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

    const response = await axios.post("http://localhost:4000/rooms/addRoom", {
      roomId: roomID,
      password: password,
      roomType: privateOn ? "Private" : "Public",
      host: `${user[0].handle}`,
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
          className="modal fade"
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
                  <label style={{ display: "block" }}>Range: </label>
                  <input
                    type="number"
                    min="800"
                    max="3500"
                    required="min 800"
                    placeholder="lowerBound"
                    ref={rangeLowerLimit}
                  />
                  {" - "}
                  <input
                    type="number"
                    min="800"
                    max="3500"
                    required="max 3500"
                    placeholder="upperBound"
                    ref={rangeUpperLimit}
                  />
                  <label style={{ display: "block" }} htmlFor="questionNo">
                    Number of questions:
                  </label>
                  <input
                    name="questionNo"
                    type="number"
                    required="min 5 questions"
                    placeholder="Questions.."
                    style={{ width: "100%" }}
                    ref={numberOfQuestions}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {}
                <button
                  data-bs-dismiss={`${
                    numberOfQuestions > 0 &&
                    rangeLowerLimit > 0 &&
                    rangeUpperLimit > 0 &&
                    rangeLowerLimit < rangeUpperLimit
                      ? "modal"
                      : ""
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
  );
}
