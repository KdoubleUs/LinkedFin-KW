import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/Github_icon.png";
import "./profile-comp.css";

export default function ProfileComp({ profile, setProfileModal, username }) {
  return (
    <div className="profile-containers">
      <div className="profile-bio">
        <Link to={`/profile/${profile._id}`}>
          <h3 className="profile-component-name">{profile.name}</h3>
        </Link>
        <h3 className="name-heading">{username}</h3>
        <p className="profile-component-bio">{profile.bio}</p>
        <div>
          <a className="profile-component-github" href={`${profile.github}`}>
            Personal GitHub
          </a>
          <img className="github-img" src={image} height={20} width={20} />
        </div>
        <button
          className="buttons"
          id="edit-profilebtn"
          onClick={() => {
            setProfileModal(true);
          }}
        >
          Edit Profile
        </button>
      </div>
      <img className="profile-component-image" src={profile.image} />
    </div>
  );
}
