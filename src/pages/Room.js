//styles
import "./Room.css";


import { CopyToClipboard } from "react-copy-to-clipboard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const Room = () => {
	const { roomID } = useParams();

	return (
		<div className='room'>
			<Navbar />
			<div className="invite">
				<h3>Invite your friend</h3>
				<p>Copy the link and send it to your friend</p>
				<label>
					<input type="text" value={roomID} />
					<CopyToClipboard
						text={roomID}
						onCopy={() => alert("Copied")}>
						<button > copy </button>
					</CopyToClipboard>
				</label>
			</div>
		</div>
	)
}

export default Room