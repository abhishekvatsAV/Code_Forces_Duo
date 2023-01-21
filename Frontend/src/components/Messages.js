import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Message.css";

const Messages = ({ users, roomId }) => {
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [messageAdded, setMessageAdded] = useState("");

  useEffect(() => {
    const roomData = async () => {
      const data = await axios.get(
        `http://localhost:4000/rooms/getRoomById?roomId=${roomId}`
      );

      console.log("data from room : ", data.data.roomData.messages);

      setMessages(data.data.roomData.messages);
      let newChats = [];
      messages.map(async (chatId) => {
        console.log("chatId: ", chatId);
        console.log("------------------------------")
        console.log("------------------------------")
        // TODO get the chat content using message call api to get the chat
        const chat = await axios.get(
          `http://localhost:4000/rooms/getAllMessages/?chatId=${chatId}`
        );
        console.log("chat Data : ", chat.data.chatData);
        newChats.push(chat.data.chatData.content);
        setChats((prev) => {
          return [...prev, chat.data.chatData.content];
        });
      });
      // console.log("newChats: ", newChats);
      // setChats([...chats, newChats]);
    };
    roomData();
  }, [messageAdded]);

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
      setMessageAdded(chat);
    } catch (error) {
      console.log("error in newMessage request : ", error.message);
    }
    setNewMessage("");
  };


  console.log("chats : ", chats);


  return (
    <div style={{ color: "red" }}>
      {chats.map(chat =>  <>{chat} {" "}</>)}
      <div className="messages">
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
