import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CSRFToken from "../components/CSRFToken";
import Cookies from "js-cookie";
import "../style/signin.css";

function SignIn({ isAuthenticated, setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    };

    let userOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch("http://localhost:8000/accounts/login", options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        localStorage.setItem("knox", data["token"]);
      })
      .then(data => {
        let tokenValue = localStorage.getItem("knox");
        fetch(
          "http://localhost:8000/profile/user",

          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            headers: {
              Authorization: `Token ${tokenValue}`,
            },
          }
        )
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(data => {
            setIsAuthenticated(true);
            setUser(data);
          });
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="signinContainer">
      <div className="text-container">
        <h1 className="topText">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="signin-form">
        <CSRFToken />
        <input
          value={formData.username}
          onChange={handleChange}
          name="username"
          id="textfield"
          className="signinField"
          type="text"
          placeholder="Username"
          required
        ></input>
        <input
          id="textfields"
          className="signinField"
          type="password"
          autoComplete="on"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
        ></input>
        <button className="signinButton">Sign in</button>{" "}
      </form>
    </div>
  );
}

export default SignIn;
