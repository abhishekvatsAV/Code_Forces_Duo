//styles
import "./Login.css";
import Bg from "../assets/login-bg.jpeg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import Typewriter from "typewriter-effect";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [Err, setError] = useState(false);
  const dispatch = useDispatch();

  // const handleUsername = () => {
  //   // axios
  //   //   .get(`https://codeforces.com/api/user.info?handles=${username}`)
  //   //   .then(function (response) {
  //   //     // handle success
  //   //     console.log(response);
  //   //     dispatch(login(response.data.result[0]));
  //   //     navigate("/home");
  //   //   })
  //   //   .catch(function (error) {
  //   //     // handle error
  //   //     console.log(error);
  //   //     setError(true);
  //   //   });
  // };
  const { data, isPending, error } = useFetch(
    `https://codeforces.com/api/user.info?handles=${username}`
  );
  const handleUsername = (e) => {
    console.log(e);
    if (error) {
      setError(true);
    }
    if (data) {
      // redux change state
      dispatch(login(data.result[0]));
      navigate("/home");
    }
  };

  return (
    <div className="login">
      <img src={Bg} alt="login-bg" />
      <div className="userHandle">
        <label htmlFor="">
          <p>
            <Typewriter
              options={{
                strings: "Enter your CodeForces Handle",
                autoStart: true,
                // loop: true,
                cursor: null,
              }}
            />
          </p>{" "}
          {/* <br /> */}
          <input
            type="text"
            placeholder=""
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {Err && <p className="error">invalid username</p>}
        <button onClick={handleUsername}>Go</button>
      </div>
    </div>
  );
};

export default Login;
