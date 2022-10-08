//styles
import "./Login.css";
import Bg from "../assets/login-bg.jpeg";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userimg, setImg] = useState("");
  const [Err, setError] = useState(false);

  const {data, isPending, error} = useFetch(`https://codeforces.com/api/user.info?handles=${username}`);
  
  const handleUsername = () => {
      if(error) {
        setError(true);
      }
      if(data) {
        navigate("/home");
        // redux change state

      }
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
        {/* {isPending && <div>Loading...</div>} */}
        {Err && <p className="error">invalid userName</p>}
        <button onClick={handleUsername}>Go</button>
        {/* {error && <div>{error}</div>} */}
      </div>
    </div>
  );
};

export default Login;
