//styles
import "./Login.css";
import Bg from "../assets/login-bg.jpeg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setUserId } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import Typewriter from "typewriter-effect";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [Err, setError] = useState(false);
  const dispatch = useDispatch();

  const handleUsername = (e) => {
    e.preventDefault();
    axios
      .get(`https://codeforces.com/api/user.info?handles=${username}`)
      .then(function (response) {
        // handle success
        console.log(response);
        dispatch(login(response.data.result[0]));
        return { userName: username };
      })
      .then(({ userName }) => {
        // storing the user in db
        axios
          .post("http://localhost:4000/users/registerUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            userName: JSON.stringify(userName),
          })
          .then((res) => {
            console.log(res.data.userData._id);
            dispatch(setUserId(res.data.userData._id));
          });
        navigate("/home");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setError(true);
      });
    axios
      .post("http://localhost:4000/", {
        username: username,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login">
      {/* <img src={Bg} alt="login-bg" /> */}
      {/* below div for background */}
      <div className="wrap">
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
      </div>

      <form className="userHandle">
        <label htmlFor="">
          <Typewriter
            options={{
              strings: "Enter Your CodeForces Handle",
              autoStart: true,
              delay: 75,
              cursor: null,
            }}
          />{" "}
          <input
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        {Err && <p className="error">invalid username</p>}
        <button
          type="submit"
          className="btn btn-outline-success"
          onClick={handleUsername}
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default Login;
