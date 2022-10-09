//styles
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const info = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <h3>{info[0].handle}</h3>
      <img src={info[0].avatar} alt="no-avatar" />
    </div>
  );
};

export default Navbar;
