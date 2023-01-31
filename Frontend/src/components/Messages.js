import { useEffect, useState, useRef } from "react";
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
  const inputRef = useRef(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log("..,,.,.,..raju")
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chats]);

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
      });
      let newChats = [];
      const chatsData = await axios(
        `http://localhost:4000/rooms/getAllMessages/?roomId=${data.data.roomData._id}`
      );
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
    } catch (error) {
      console.log("error in newMessage request : ", error.message);
    }
    setNewMessage("");
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    console.log("keydown");
    if (event.key === "Enter") {
      // Send the message
      handleClick();
    }
  };

  return (
    <div className="parentMsg">
      <div className="allMessages">
        {chats.map((chat) => {
          console.log(chats);
          return (
            <div className="chat">
              <span className="chatDiv">
                <span className="chatSender">{chat.sender}</span>:
                <span className="chatMessage">{chat.chat}</span>
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="messages">
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "4px 2px 4px 0px",
            cursor: "pointer",
            borderRadius: "0px 20px 20px 0px",
            width: "25%",
            height: "30px",
          }}
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;