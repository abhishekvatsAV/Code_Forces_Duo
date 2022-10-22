//styles
import "./Room.css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/keySlice";
import axios from "axios";
import { useRef, useEffect } from "react";

const Room = () => {
  const { roomID } = useParams();
  // const ref = useRef(false);

  const { pswd } = useSelector((state) => state.password);
  // useEffect(() => {
  //   ref.current.click();
  // });

  return (
    <div className="room">
      <Navbar />
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
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
                  class="btn-close"
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
      <footer className="roomCreateFooter">
        <button
          type="button"
          class="btn btn-danger"
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
