import React, { Fragment, useEffect } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import { checkAuthenticated } from "../services/auth";
import { load_user } from "../services/profile";

export default function Layout({
  children,
  isAuthenticated,
  setIsAuthenticated,
  setUser,
}) {
  useEffect(() => {
    let knoxToken = localStorage.getItem("knox");
    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      Authorization: `Token ${knoxToken}`,
    };

    let userOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch("http://localhost:8000/accounts/authenticated", options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error || data.isAuthenticated === "error") {
          setIsAuthenticated(false);
        } else if (data.isAuthenticated === "success") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        fetch("http://localhost:8000/accounts/user", userOptions)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setUser(data);
          });
      });
  }, []);

  return (
    <Fragment>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {children}
    </Fragment>
  );
}
