//styles
import "./Room.css";

import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { v4 as uuidv4 } from 'uuid';

const Room = () => {
	const [roomID, setRoomID] = useState(uuidv4());
	const [link, setLink] = useState(roomID);


	return (
		<div className='room'>
			<div className="invite">
				<h3>Invite your friend</h3>
				<p>Copy the link and send it to your friend</p>
				<label>
					<input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
					<CopyToClipboard
						text={link}
						onCopy={() => alert("Copied")}>
						<button > copy </button>
					</CopyToClipboard>
				</label>
			</div>
		</div>
	)
}

export default Room