import React from "react";
import "./project-comp.css";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProjectComp({
  projects,
  setToggle,
  setProjectEditModal,
  setProject,
}) {
  const [loading, setLoading] = useState(null);
  const handleClick = id => {
    const knoxToken = localStorage.getItem("knox");
    let options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${knoxToken}`,
      },
      credentials: "include",
      body: "",
    };

    fetch(`http://localhost:8000/projects/${id}/`, options).then(response => {
      console.log(response);
      setToggle(prev => !prev);
    });
  };

  return (
    <motion.div className="personal-projects">
      {projects &&
        projects.map(project => (
          <div key={project.id} className="project-div">
            <motion.div
              className="projects"
              whileHover={{ x: -5, y: -5, boxShadow: "5px 2px 5px black" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="project-component-name">{project.title}</h3>
              <a
                className="project-component-github"
                href={`${project.github_link}`}
              >
                GitHub
              </a>
              <h5 className="project-component-publish-date">
                <span className="spanText">Posted On: </span>
                {project.publish_date}{" "}
              </h5>
              <p className="project-component-description">
                {project.description}
              </p>
              <button
                className="buttons"
                id="edit-proj-btn"
                onClick={() => {
                  setProject(project);
                  setProjectEditModal(true);
                }}
              >
                Edit Project
              </button>
              <button
                // className="project-delete-comp"
                className="buttons"
                onClick={() => handleClick(project.id)}
              >
                Delete
              </button>
            </motion.div>
          </div>
        ))}
    </motion.div>
  );
}
