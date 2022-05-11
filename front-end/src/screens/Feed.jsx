import { useState, useEffect } from "react";
// import Sidebar from '../components/sidebar/Sidebar.jsx'
import "./feed-style.css";
import { motion } from "framer-motion";
import Ads from "../components/ads";
import Post from "../components/Search/Post";
import { AiFillLike } from "react-icons/ai";
import { FcComments } from "react-icons/fc";
import { GiTronArrow } from "react-icons/gi";
export default function Feed({ projects }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/profile/all")
      .then(res => res.json())
      .then(data => {
        setProfiles(data);
      });
  }, []);

  return (
    <div className="feed-container">
      {/* <h1 className="feed-title"> LINKFIN PROJECT</h1> */}
      <div className="projects-container">
        <div className="project-feed">
          <Post />
          <div className="line"></div>
          {projects &&
            projects.map(project => (
              <motion.div
                key={project.id}
                className="project-feeds"
                whileHover={{
                  x: -10,
                  y: -5,
                  boxShadow: "10px 5px 50px black",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-box">
                  <div className="project-text">
                    {/* <div className="project-component"> */}
                    <h3 className="project-component-name">{project.title}</h3>
                    <a
                      className="project-component-github"
                      href={`${project.github_link}`}
                    >
                      GitHub
                    </a>
                    <h5 className="project-component-publish-date">
                      {project.publish_date}{" "}
                    </h5>
                    <p className="project-component-description">
                      {project.description}
                    </p>
                  </div>
                  <div className="owner-picture">
                    {profiles
                      .filter(profile => {
                        return profile.id === project.profile_id;
                      })
                      .map((userProfile, index) => (
                        <img
                          key={index}
                          src={userProfile.image}
                          height="100px"
                          width="100px"
                          className="projectprofile-img"
                        />
                      ))}
                  </div>
                </div>
                {/* </div> */}
                <div className="line"></div>
                <div className="like-option">
                  <ul className="list-option">
                    <li className="select-options">
                      <AiFillLike className="icons" /> Like
                    </li>
                    <li className="select-options">
                      <FcComments className="icons" />
                      Comment
                    </li>
                    <li className="select-options">
                      {" "}
                      <GiTronArrow className="icons" />
                      Subscribe
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
        </div>
        <Ads className="img-container" />
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}
