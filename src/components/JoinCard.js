//styles
import "./JoinCard.css";

const JoinCard = ({id, name}) => {
  return (
    <div className='join-card'>
			<h1>{id}</h1>
			<h1>{name}</h1>
			<button>Join</button>
    </div>
  )
}

export default JoinCard