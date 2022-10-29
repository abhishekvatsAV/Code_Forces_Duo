import { useState, useEffect } from "react";
import "./clock.css";
function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="clock">
      <div className="hourhand">
        <h3>{date.getHours()}</h3>
        <p>Hrs.</p>
      </div>
      <div className="minutehand">
        <h3>{date.getMinutes()}</h3>
        <p>Mins..</p>
      </div>
      <div className="secondhand">
        <h3>{date.getSeconds()}</h3>
        <p>Secs..</p>
      </div>
    </div>
  );
}

export default Clock;
