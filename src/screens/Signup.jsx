import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/navbar";
import { BASE_URL } from "../services/helper";

export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/new`,
        credentials,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      // console.log(response);
      // console.log(response.cookie.token);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="navigationbar">
        <Navbar />
      </div>
      <div className="container">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>
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
            <div className="mb-3">
              <label className="form-label">Register As :</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="roleEmployee"
                  name="role"
                  value="employee"
                  checked={credentials.role === "employee"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="roleEmployee">
                  Employee
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="roleAdmin"
                  name="role"
                  value="admin"
                  checked={credentials.role === "admin"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="roleAdmin">
                  Admin
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="m-3 btn btn-primary"
              style={{ background: "#0d6efd" }}
            >
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a user
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
