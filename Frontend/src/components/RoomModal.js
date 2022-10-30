import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomModal({ password }) {
  const { roomID } = useParams();
  const notify = () => {
    toast("Copied!");
  };

  return (
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
              <CopyToClipboard text={roomID} onCopy={notify}>
                <button className="btn btn-outline-secondary">copy</button>
              </CopyToClipboard>
            </div>
            {password !== "" && (
              <>
                <h5>Password:</h5>
                <div
                  className="input-group mb-3 inputLink"
                  hidden={password !== "" ? false : true}
                >
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <CopyToClipboard text={password} onCopy={notify}>
                    <button className="btn btn-outline-secondary">copy</button>
                  </CopyToClipboard>
                </div>
              </>
            )}
          </div>
        </div>
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
  );
}

export default RoomModal;
