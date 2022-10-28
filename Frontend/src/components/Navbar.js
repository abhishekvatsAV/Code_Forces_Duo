//styles
import "./Navbar.css";

import { useSelector } from "react-redux";

const Navbar = () => {
  const info = useSelector((state) => state.user.user);

  return (
    <div className="navbar">
      <h3>{info.handle}</h3>
      <img src={info.avatar} alt="no-avatar" />
    </div>
  );
};

export default Navbar;
