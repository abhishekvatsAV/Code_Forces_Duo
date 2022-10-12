//styles
import "./Home.css";

import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//third party
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";

export default function Home() {
  const navigate = useNavigate();

  const [privateOn, setPrivateon] = useState(false);
  const [roomID, setRoomid] = useState("");
  const handleClick = () => {
    setRoomid(uuidv4);
  }

  
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  dispatch(changePassword(password));

  const handleClick2 = () => {
    setPassword(uuidv4)
  }


  return (
    <div className="home">
      <div className="box1" onClick={() => navigate("/lobby")}>
        <h3>Go to Lobby</h3>
        <p>
          Go to lobby and see how many rooms are open to join and compete with
          them.
        </p>
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
            className="btn btn-outline-secondary" type="button" onClick={handleClick}>generate</button>
          <CopyToClipboard text={roomID} onCopy={() => alert("Copied")}>
            <button className="btn btn-outline-secondary" type="button">copy</button>
          </CopyToClipboard>
        </div>

        <div className="container">
          <p>Private Room</p>
          <input type="checkbox" onClick={() => setPrivateon(privateOn?false:true)} />
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
            >generate</button>
            <CopyToClipboard text={password} onCopy={() => alert("Copied")}>
              <button className="btn btn-outline-secondary" type="button">copy</button>
            </CopyToClipboard>
          </div>
        )}
          <button 
            className={`btn btn-danger roomButton ${
              (roomID==="" && privateOn===false) ? 
                "disabled"
               : `${

              (privateOn===true && password==="" || privateOn===true && password !== "" && roomID==="") ? 
                "disabled"
               : ""
              }`
              }`}
            // {`navbar ${state && "navbar_black"}`}
            onClick={() => navigate(`/room/${roomID}`)}
          >
            Create Room
          </button>
      </div>
    </div>
    // copy this link and send it to the person you want to connect with.Be sure to save it so you can use it later, too.
  );
}
