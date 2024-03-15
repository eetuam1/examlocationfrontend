import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("white"); // State for background color

  const handleClick = () => {
    setIsAuthenticated(false);

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user) {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.removeItem("token");
    }

    navigate("/login");
  };

  const toggleBgColor = () => {
    // Toggle between white and any other color of your choice
    setBgColor(bgColor === "white" ? "lightblue" : "white");
  };

  return (
    <header style={{ backgroundColor: bgColor }}> {/* Set background color */}
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
               <span>{JSON.parse(localStorage.getItem("user")).email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          <button onClick={toggleBgColor}>Color</button> {/* Button to toggle background color */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
