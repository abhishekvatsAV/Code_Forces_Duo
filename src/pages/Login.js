//styles
import "./Login.css";
import Bg from "../assets/login-bg.jpeg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userimg, setImg] = useState("");
  const [Err, setError] = useState(false);

  const handleUsername = () => {
    axios
      .get(`https://codeforces.com/api/user.info?handles=${username}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setImg(response.data.result[0].avatar);
        navigate("/home");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setError(false);
      });
  };
  return (
    <div className="login">
      <img src={Bg} alt="login-bg" />
      <div className="userHandle">
        <label htmlFor="">
          <p>Enter your CodeForces Handle:</p> <br />
          <input
            type="text"
            placeholder="Enter your codeforces Handle"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {Err && <p>invalid userName</p>}
        <button onClick={handleUsername}>Go</button>
      </div>
    </div>
  );
};

export default Login;
