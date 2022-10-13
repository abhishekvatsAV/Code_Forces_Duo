import React from "react";
import Navbar from "../components/Navbar";
import JoinCard from "../components/JoinCard";

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
    },
  ];
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
    },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div className="lobby">
        <div className="lobbyContent">
          <div className="publicContent">
            <h3>Public Rooms</h3>
            {publicCards.map((card) => (
              <JoinCard key={card.id} id={card.id} name={card.name} />
            ))}
          </div>
          <div className="privateContent">
            <h3>Private Rooms</h3>
            {privateCards.map((card) => (
              <JoinCard key={card.id} id={card.id} name={card.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
