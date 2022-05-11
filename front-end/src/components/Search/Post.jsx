import React from "react";
import { HiPhotograph } from "react-icons/hi";
import { FcVideoCall } from "react-icons/fc";
import { MdEmojiEvents } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
function Post() {
  return (
    <div className="post-box">
      <div>
        <input className="feed-input" placeholder="Search a post"></input>
      </div>
      <div className="options">
        <ul className="post-list">
          <li className="select-options">
            <HiPhotograph className="icons" />
            Photo
          </li>
          <li className="select-options">
            <FcVideoCall className="icons" />
            Video
          </li>
          <li className="select-options">
            <MdEmojiEvents className="icons" />
            Events
          </li>
          <li className="select-options">
            <GrArticle className="icons" />
            Write Article
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Post;
