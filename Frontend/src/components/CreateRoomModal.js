//styles
import './CreateRoomModal.css'

export function CreateRoomModal({ rangeUpperLimit, rangeLowerLimit, numberOfQuestions, handleCreateRoom, showModal }) {
  console.log(numberOfQuestions, "gfdhtyfdhteaerhdfg");
  return (
    <div className="modalbackground">
        <div className="modalContainer">
          <form className="modalForm" onSubmit={handleCreateRoom}>
            <div className="modalHead">
              <h3> Set Room Constraits </h3>
              <button onClick={() => showModal(false)}> X </button>
            </div>
            <div className="modalRanges">
              <p>range between (800 -3500) : </p>
              <input
                id="lowerLimit"
                type="number"
                min="800"
                max="3500"
                required="greater than 800"
                placeholder="lowerBound"
                ref={rangeLowerLimit}
              />

              <input
                id="upperLimit"
                type="number"
                min="800"
                max="3500"
                required="greater than 800"
                placeholder="upperBound"
                ref={rangeUpperLimit}
              />
              <label for="questionsInput" style={{ display: "block" }}>
                No of Questions :
              </label>
              <input
                className="questionsInput"
                type="number"
                min="1"
                max="5"
                required="greater than 1"
                placeholder="Questions.."
                ref={numberOfQuestions}
              />
            </div>

            <button className="btn btn-success" type="submit">
              Create Room
            </button>
          </form>
        </div>
      </div>

  );
}


/*

<div>
          <div style={{
            backgroundColor: "#171717"
          }}>
            <div>
              <h1>
                Set Room Constraits
              </h1>
              <button onClick={() => showModal(false)}></button>
            </div>
            <div className="modal-body" style={{
              padding: 0
            }}>
              <div action="" className="homeForm">
                <label style={{
                  display: "block"
                }}>
                  Range <sub>(800 - 3500)</sub> :{" "}
                </label>
                <input type="number" min="800" max="3500" required="greater than 800" placeholder="lowerBound" ref={rangeLowerLimit} />
                {" - "}
                <input type="number" min="800" max="3500" required="greater than 800" placeholder="upperBound" ref={rangeUpperLimit} />
                <label style={{
                  display: "block"
                }} htmlFor="questionNo">
                  Number of questions:
                </label>
                <input name="questionNo" type="number" min="1" max="5" required="greater than 1" placeholder="Questions.." style={{
                  width: "100%"
                }} ref={numberOfQuestions} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success" // onClick={() => setModalDismiss(true)}
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
*/