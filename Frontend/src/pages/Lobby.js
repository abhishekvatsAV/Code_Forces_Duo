import React from 'react'
import Navbar from '../components/Navbar'
import JoinCard from '../components/JoinCard'

//styles
import "./Lobby.css";

const Lobby = () => {
	// just a dummy data
	// TODO: fetch data from server
	const privateCards = [
		{
			id: 1,
			name: "player1",
			players: 2,
			roomID: "123456",
		},
		{
			id: 2,
			name: "player2",
			players: 2,
			roomID: "123456",
		}
	]

	const publicCards = [
		{
			id: 1,
			name: "player1",
			players: 2,
			roomID: "123456",
		},
		{
			id: 2,
			name: "player2",
			players: 2,
			roomID: "123456",
		}
	]

	return (
		<>
			{/* <Navbar /> */}
			<div className='lobby'>
					<h1>Private Rooms</h1>
				<div className="privateRoom">
					{privateCards.map((card) => (
						<JoinCard key={card.id} id={card.id} name={card.name} />
					))}
				</div>
					<h1>Public Rooms</h1>
				<div className="publicRoom">
					{publicCards.map((card) => (
						<JoinCard key={card.id} id={card.id} name={card.name} />
					))}
				</div>
			</div>
		</>
	)
}

export default Lobby