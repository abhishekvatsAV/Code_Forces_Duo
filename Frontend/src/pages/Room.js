//styles
import "./Room.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";

const Room = () => {
  const { roomID } = useParams();

  return (
    <div className="room">
      <Navbar />
      <div className="invite">
        <h3>Here's the link to your meeting</h3>
        <p>Copy the link and send it to people you want to compete with.</p>
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
      </div>
    </div>
  );
};

export default Room;
