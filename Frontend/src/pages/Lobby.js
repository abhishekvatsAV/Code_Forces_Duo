import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import JoinCard from "../components/JoinCard";

//styles
import "./Lobby.css";

const Lobby = () => {
  // just a dummy data
  // TODO: fetch data from server

  const [privateCards, setPrivateCards] = React.useState([]);
  const [publicCards, setPublicCards] = React.useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("http://localhost:4000/rooms/getAllRooms");
      const data = await response.json();
      // console.log(data.allRooms);
      const privateRooms = [];
      const publicRooms = [];
      data.allRooms.map((room) => {
        if(room.roomType === "Public") {
          publicRooms.push(room);
        }
        else { 
          privateRooms.push(room);
        }
      })
      console.log(publicCards, privateCards);
      setPrivateCards(privateRooms);
      setPublicCards(publicRooms);
    }
    fetchRooms();
    
  }, [])

  

  return (
    <>
      <Navbar />
      <div className="lobby">
        <div className="lobbyContent">
          <div className="publicContent">
            <h3>Public Rooms</h3>
            {publicCards.map((card) => (
              <JoinCard key={card.roomId} id={card.roomId} name={card.host} />
            ))}
          </div>
          <div className="privateContent">
            <h3>Private Rooms</h3>
            {privateCards.map((card) => (
              <JoinCard key={card.roomId} id={card.roomId} name={card.host} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobby;
