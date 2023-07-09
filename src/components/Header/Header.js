import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="title">
        Trivia Pursuit Quiz Application
      </Link>
      <hr className="divider" />
    </div>
  );
};
export default Header;
