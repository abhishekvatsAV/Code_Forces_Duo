//styles
import "./JoinCard.css";

const JoinCard = ({ id, name }) => {
  return (
    <div className="joinCard">
      <h3>{id}</h3>
      <h3>{name}</h3>
      <button
        type="button"
        class="btn btn-danger btn-small"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        join room
      </button>

      {/* modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          style={{ color: "black" }}
        >
          <div class="modal-content" style={{ backgroundColor: "#171717" }}>
            <div class="modal-header" style={{borderBottom:"none"}}>
              <h1
                class="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "white" }}
              >
                Enter Your Password
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: "white" }}
              ></button>
            </div>{" "}
            <input
              class="modal-body modalInput"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "#444444",
                color: "#171717",
                margin: "0",
              }}
              type="text"
            />
            <div class="modal-footer" style={{borderTop:"none"}}>
              <button type="button" class="btn btn-light">
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCard;
