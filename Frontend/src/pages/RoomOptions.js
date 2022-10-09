//styles
import './RoomOptions.css';

import { VscDebugStart } from "react-icons/vsc";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RoomOptions = () => {
	const roomID = uuidv4();
	const navigate = useNavigate();
  return (
		<>
			<Navbar />
			<div className='room-options'>
				<div className="public">
					<h2>Create a public room:</h2>
					<VscDebugStart className="public-btn" onClick={() => navigate(`/room/${roomID}`)}/>
				</div>
				<div className="private">
					<h2>Create a private room:</h2>
					<VscDebugStart className="private-btn" onClick={() => navigate(`/room/${roomID}`)}/>
				</div>
			</div>
		</>
  )
}

export default RoomOptions