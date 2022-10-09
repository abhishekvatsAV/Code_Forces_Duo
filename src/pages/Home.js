//styles
import "./Home.css";
import { VscDebugStart } from "react-icons/vsc";
export default function Home() {
  return (
    <div className="home">
      <div className="box1">
        <h3>Go to Lobby</h3>
        <p>
          Go to lobby page and see how many rooms are open to join and compete
          with them.
        </p>
        <VscDebugStart className="homebtn-1" />
      </div>
      <div className="box2">
        <h3>Create a Room</h3>
        <p>
          Create your own room and invite your friend or stranger to compete
          with you.
        </p>
        <VscDebugStart className="homebtn-2" />
      </div>
    </div>
    // copy this link and send it to the person you want to mwwt with.Be sure to save it so you can use it later, too.
  );
}
