import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Message.css";
import { getSocket } from "../utils/io.connection";

const Messages = ({ users, roomId }) => {
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.user).handle;
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [messageAdded, setMessageAdded] = useState("");

  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(
        `http://localhost:4000/rooms/getRoomById?roomId=${roomId}`
      );

      console.log("data from room : ", data.data.roomData.messages);
      const socket = getSocket();
      socket.off("chat");
      socket.on("chat", (data) => {
        console.log(data);
        setChats((prev) => {
          return [...prev, data];
        });
      })
      let newChats = [];
      const chatsData = await axios(`http://localhost:4000/rooms/getAllMessages/?roomId=${data.data.roomData._id}`);
      setChats(chatsData.data.chats);
      // console.log("newChats: ", newChats);
      // setChats([...chats, newChats]);
    };
    roomData();
  }, []);

  const handleClick = async () => {
    let message = {
      sender: userId,
      content: newMessage,
      roomId: roomId,
    };
    console.log("new message : ", message);
    try {
      let chat = await axios.post(
        "http://localhost:4000/rooms/newMessage",
        message
      );
      // setMessageAdded(chat);
      // setChats(prev => {
      //   return [...prev,{
      //     sender:userName,
      //     chat:newMessage
      //   }]
      // })
    } catch (error) {
      console.log("error in newMessage request : ", error.message);
    }
    // setNewMessage("");
  };


  console.log("chats : ", chats);


  return (
    <div style={ { color: "white", width:"100%" } }>
      { chats.map(chat => {
        console.log(chats);
        return (
          <div className="chat">
            <span>{chat.sender} : { chat.chat }</span>
          </div>
        )
      }) }
      <div className="messages">
        <input
          type="text"
          onChange={ (e) => setNewMessage(e.target.value) }
          value={ newMessage }
        />
        <button onClick={ handleClick }>Send</button>
      </div>
    </div>
  );
};

export default Messages;
