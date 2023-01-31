//styles
import "./JoinCard.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getSocket } from "../utils/io.connection";
import { useRef, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";


const JoinCard = ({
  roomId,
  name,
  room,
  noOfQuestions,
  range,
  password,
  setUsers,
}) => {
  const socket = getSocket();
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.user.userId);
  const [psswd, setpsswd] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // for modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("roomIDDDD ; ", roomId);

  const handleClick = async (roomId) => {
    console.log("clicked");
    socket.emit("join_room", roomId, {
      ...user,
      userId,
    });

    const url = "http://localhost:4000/rooms/joinRoom";
    const response = await axios.post(url, {
      roomId: roomId,
      userId: userId,
    });

    socket.emit("join_room", roomId, {
      ...user,
      userId,
    });
    // console.log("roomId - " + roomId,"user - " + user.handle );
    navigate(`/room/${roomId}`);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handlePrivateRoom = async (roomId) => {
    if (password === psswd) {
      console.log("clicked");
      socket.emit("join_room", roomId, {
        ...user,
        userId,
      });
      console.log(" fffffbhanu roomID   : ", roomId);
      const url = "http://localhost:4000/rooms/joinRoom";
      const response = await axios.post(url, {
        roomId: roomId,
        userId: userId,
      });

      onClose();

      socket.emit("join_room", roomId, {
        ...user,
        userId,
      });
      // console.log("roomId - " + roomId,"user - " + user.handle );
      navigate(`/room/${roomId}`);
    } else {
      console.log("incorrect password!", psswd, password);
    }
  };

  return (
    <div className="joinCard">
      <h3>
        {" "}
        <span
          style={{
            display: "block",
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Host
        </span>{" "}
        {name}
      </h3>
      <h4>
        <span
          style={{
            display: "block",
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Range :
        </span>{" "}
        {range.lowerLimit} - {range.upperLimit}{" "}
      </h4>
      <p>
        {" "}
        <span
          style={{
            fontSize: "1rem",
            paddingBottom: "5px",
            color: "gray",
          }}
        >
          Number of Questions :
        </span>{" "}
        {noOfQuestions}{" "}
      </p>
      <button
        type="button"
        className="btn btn-outline-success btn-small"
        onClick={room === "public" ? () => handleClick(roomId) : onOpen}
      >
        join room
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="#ffffff" bg="rgba(0,0,0,0.5)">
          <ModalHeader>Password : </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="flushed"
              onChange={(e) => setpsswd(e.target.value)}
              value={psswd}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handlePrivateRoom(roomId)}
            >
              Join Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JoinCard;
