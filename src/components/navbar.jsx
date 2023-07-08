import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/helper";
import { toast } from "react-hot-toast";
import { AuthoriseContext } from "./contextReducer";

function Navbar() {
  let navigate = useNavigate();

  const { isLoggedIn, toggleLoginStatus } = useContext(AuthoriseContext);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);

      if (response.status === 200) {
        toggleLoginStatus();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/myprofile">
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/project">
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
