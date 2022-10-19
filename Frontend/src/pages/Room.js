//styles
import "./Room.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";
import axios from 'axios'

const Room = () => {
  const { roomID } = useParams();

  const { pswd } = useSelector((state) => state.password);

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "https://codeforces.com/api/problemset.problems/"
    );
    const arr = [];
    let size = 5;
    let i = 0;
    while (size > 0) {
      if (response?.data?.result?.problems[i]?.rating === 800) {
        arr.push(response.data.result.problems[i]);
        size--;
      }
      i++;
    }
    // console.log(arr);
  }

  return (
    <div className="room">
      <Navbar />
      <div className="invite">
        <h3>Here's the link to your meeting</h3>
        <p>Copy the link and send it to people you want to compete with.</p>
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
                <button className="btn btn-outline-secondary">copy</button>
              </CopyToClipboard>

            </div>
          </>
        )}
      </div>
      <footer className="roomCreateFooter">
        <form action="">
          <div className="range">
            <p>Range: </p>
          </div>
            <input type="number" required placeholder="lowerBound" />
            {" - "}
            <input type="number" required placeholder="upperBound" />
          <div className="questions">
            <p>No of questions: </p>
          </div>
            <input type="number" required placeholder="Questions.." />
          <button onClick={handleClick}>
            SET
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Room;
