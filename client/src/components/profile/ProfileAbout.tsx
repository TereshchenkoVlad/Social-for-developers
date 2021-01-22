import React, { FC } from "react";

import { ProfileItem } from "../../types/Profile";
import signIcon from "../../assets/images/down-arrow.png";

interface Props {
  profile: ProfileItem;
}

const ProfileAbout: FC<Props> = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile_about">
      {bio && (
        <>
          <h2 className="profile_about-title">{name} Bio</h2>
          <p className="profile_about-text">{bio}</p>
          <div className="profile_line" />
        </>
      )}
      <h2 className="profile_about-title">Skill Set</h2>
      <div className="profile_about-skills">
        {skills.map((skill) => (
          <div className="profile_about-skill">
            <img src={signIcon} className="profile_about-icon_sign" />
            <p className="profile_about-text">{skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
