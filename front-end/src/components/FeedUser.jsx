import React from "react";

function FeedUser({ userimage }) {
  return (
    <div className="event-container" id="feed-profile-container">
      <img
        src={userimage}
        alt="current user"
        height={100}
        width={100}
        id="feed-profile-pic"
      />
      <div className="event-box">
        <p>Recent</p>
        <h3 className="event-h3">Software Engineering</h3>
      </div>
      <div className="event-box">
        <p>Groups</p>
        <h3 className="event-h3">NYC Coder</h3>
      </div>
      <div className="event-box">
        <p>Events</p>
        <h3 className="event-h3">Hackathon 2022</h3>
      </div>
      <div className="event-box">
        <h3 className="event-h3"> Discover More</h3>
      </div>
    </div>
  );
}

export default FeedUser;
