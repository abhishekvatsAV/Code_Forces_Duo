// styles
import "./Player.css";

const Player = (user) => {
  console.log("user : ", user);
  return (
    <div className="hostBox">
      <div style={{ marginBottom: "20px", borderBottom: "1px solid gray" }}>
        <img src={user.user.userId.profile.titlePhoto} />
        <h3>{user.user.userId.profile.handle}</h3>
        <p>{user.user.userId.profile.rating}</p>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>score :</p>
      </div>
    </div>
  );
};

export default Player;
