// styles
import "./Player.css";

const Player = ({user,score}) => {
  // console.log("user : ", user);
  // console.log(score);
  return (
    <div className="hostBox">
      <div style={{ marginBottom: "20px", borderBottom: "1px solid gray" }}>
        <img src={user.userId.profile.titlePhoto} />
        <h3>{user.userId.profile.handle}</h3>
        <p>{user.userId.profile.rating}</p>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>score : { score } </p>
      </div>
    </div>
  );
};

export default Player;
