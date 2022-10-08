//styles
import "./Login.css";
import Bg from "../assets/login-bg.jpeg";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [userimg, setImg] = useState("");

  const handleUsername = () => {
    axios
      .get(`https://codeforces.com/api/user.info?handles=${username}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setImg(response.data.result[0].avatar);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="login">
      <img src={Bg} alt="login-bg" />
      <div className="userHandle">
        <label htmlFor="">
          <p>Enter your CodeForces Handle:</p> <br />
          <input type="text" placeholder="Enter your codeforces Handle" />
        </label>
        <br />
        <button>Go</button>
      </div>
    </div>
  );
};

export default Login;
