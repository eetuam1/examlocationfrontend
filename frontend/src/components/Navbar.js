import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate=useNavigate();


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

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
               <span>{JSON.parse(localStorage.getItem("user")).email}</span>
              <button onClick={() => handleClick()}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;