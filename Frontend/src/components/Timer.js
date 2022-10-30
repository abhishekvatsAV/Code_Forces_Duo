import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => alert("contest is finished , Please leave the Room"),
  });

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        backgroundColor: "var(--primary_color)",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h5>
        Contest <span>{isRunning ? "Running" : "finished"}</span>
      </h5>
      <div style={{ fontSize: "50px", color: "white" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 7200); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
