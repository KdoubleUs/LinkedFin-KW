import { useState, useEffect } from "react";
// import Sidebar from '../components/sidebar/Sidebar.jsx'
import "./feed-style.css";
import { motion } from "framer-motion";
import Ads from "../components/ads";
import Post from "../components/Search/Post";
import Events from "../components/Events";
import FeedUser from "../components/FeedUser";
// import { AiFillLike } from "react-icons/ai";
import { FcComments } from "react-icons/fc";
import { GiTronArrow } from "react-icons/gi";
import defaultimg from "../images/nouser.png";
import gif from "../images/pulse-preloader.gif";
import Pagination from "../pagination.jsx";
export default function Feed({ projects, user }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPost = projects.slice(indexOfFirstPage, indexOfLastPage);

  useEffect(() => {
    if (user) {
      setCurrentUser({
        image: user.profile.image,
      });
    } else if (!user) {
      setCurrentUser({
        image: defaultimg,
      });
    }
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/profile/all")
      .then(res => res.json())
      .then(data => {
        setInterval(() => {
          setProfiles(data);
          setLoading("complete");
        }, 2000);
      });
  }, []);
  let preLoader = <img src={gif} alt="loading" className="preloader" />;
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="feed-container">
      {/* <h1 className="feed-title"> LINKFIN PROJECT</h1> */}
      <div className="projects-container">
        <div className="feed-left">
          <FeedUser userimage={currentUser.image} />
          <Events />
        </div>
        <div className="project-feed">
          <Post />
          <div className="line"></div>
          {!loading
            ? preLoader
            : projects &&
              currentPost.map(project => (
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
                      <h3 className="project-component-name">
                        {project.title}
                      </h3>
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
                        {/* <AiFillLike className="icons" /> Like */}Like
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={projects.length}
            paginate={paginate}
          />
        </div>
        <Ads className="img-container" />
      </div>
    </div>
  );
}
