//styles
import "./JoinCard.css";

const JoinCard = ({ id, name }) => {
  return (
    <div className="joinCard">
      <h3>{id}</h3>
      <h3>{name}</h3>
      <button className="btn btn-danger btn-sm">Join</button>
    </div>
  );
};

export default JoinCard;
