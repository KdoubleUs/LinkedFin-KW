import React from "react";
import { useState, useEffect } from "react";
import ProfileComp from "../components/ProfileComp/ProfileComp";
import AddProjModal from "../components/AddProjModal/AddProjModal";
import ProjectComp from "../components/ProjectComp/ProjectComp";
import EditProfileModal from "../components/EditProfileModal/EditProfileModal";
import EditProjModal from "../components/EditProjModal/EditProjModal";
import "./Profile.css";
import Ads from "../components/ads";
function Profile({ user, projects, setToggle, setUser }) {
  const [showModal, setShowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [projectEditModal, setProjectEditModal] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [project, setProject] = useState(null);

  const [profile, setProfile] = useState({
    bio: "",
    github: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        bio: user.profile.bio,
        github: user.profile.github,
        image: user.profile.image,
      });
    }
  }, [user]);

  useEffect(() => {
    let userProjectsData =
      projects &&
      user &&
      projects.filter(project => {
        return project.profile_id === user.profile.id;
      });
    setUserProjects(userProjectsData);
  }, [projects]);

  return (
    <div className="profile-screen-container">
      <div>
        <div className="profilecomp">
          <div className="profilescreen">
            <ProfileComp
              profile={profile}
              setProfileModal={setProfileModal}
              username={user?.username}
            />
          </div>
          <div className="profile-addproject">
            <button id="add-projects" onClick={() => setShowModal(true)}>
              Add Project
            </button>
          </div>
        </div>
        <div className="profile-project">
          <h1 className="profile-title name-heading">
            {" "}
            Welcome to {user?.username} projects{" "}
          </h1>
          {profileModal ? (
            <EditProfileModal
              setProfileModal={setProfileModal}
              user={user}
              setUser={setUser}
              setToggle={setToggle}
            />
          ) : null}
          {showModal ? (
            <AddProjModal
              setShowModal={setShowModal}
              profile_id={user.profile.id}
              setToggle={setToggle}
            />
          ) : null}
          {projectEditModal ? (
            <EditProjModal
              setProjectEditModal={setProjectEditModal}
              profile_id={user.profile.id}
              project={project}
              setToggle={setToggle}
              user={user}
            />
          ) : null}
          <ProjectComp
            setToggle={setToggle}
            projects={userProjects}
            setProject={setProject}
            setProjectEditModal={setProjectEditModal}
          />
        </div>
      </div>
      <Ads />
    </div>
  );
}

export default Profile;
