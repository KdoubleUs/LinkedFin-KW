import "./App.css";
import Landing from "./screens/landing.jsx";
import Profile from "./screens/Profile.jsx";
import SignIn from "./screens/SignIn.jsx";
import Feed from "./screens/Feed.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./HOC/Layout.jsx";
import { useState, useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/projects/")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
      });
  }, [user, toggle]);
  useEffect(() => {
    let knoxToken = localStorage.getItem("knox");
    if (knoxToken) {
    }
    let headers = {
      Accept: "application/json",
      Authorization: `Token ${knoxToken}`,
    };
    let options = {
      method: "GET",
      headers: headers,
    };
    fetch(`"http://localhost:8000/accounts/user"`, options)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err));
  });
  return (
    <div className="app">
      <Layout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUser={setUser}
        user={user}
        className="hoc"
      >
        <Routes>
          <Route
            path="/"
            element={<Landing isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile
                  setToggle={setToggle}
                  projects={projects}
                  user={user}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/feed"
            element={<Feed projects={projects} user={user} />}
          />
          <Route
            path="/signin"
            element={
              <SignIn
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
