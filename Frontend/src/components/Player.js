// styles
import './Player.css';

const Player = (user) => {
  console.log("user : ", user.user);
  return (
    <div className="hostBox">
      <img src={user.user.userId.profile.titlePhoto} />
      <h3>{user.user.userId.profile.handle}</h3>
    </div>
  )
}

export default Player