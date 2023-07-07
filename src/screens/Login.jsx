import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/navbar";
import { BASE_URL } from "../services/helper";
import { AuthoriseContext } from "../components/contextReducer";

function Login() {
  const { toggleLoginStatus } = useContext(AuthoriseContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        credentials,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      if (response.status === 200) {
        toggleLoginStatus();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div className="container">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="m-3 btn btn-primary">
              Submit
            </button>
            <Link to="/register" className="m-3 btn btn-danger">
              I am a new user
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
