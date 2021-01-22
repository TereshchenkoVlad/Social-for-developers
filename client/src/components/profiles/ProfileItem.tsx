import React, { FC } from "react";
import { Link } from "react-router-dom";

import iconSign from "../../assets/images/down-arrow.png";

import { ProfileItem as ProfileItemTypes } from "../../types/Profile";

interface Props {
  profile: ProfileItemTypes;
}

const ProfileItem: FC<Props> = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profiles_item">
      <img src={avatar} alt={_id} className="profiles_item-avatar" />
      <div className="profiles_item-content">
        <h2 className="profiles_item-title">{name}</h2>
        <p className="profiles_item-text">
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="profiles_item-text">
          {location && <span>{location}</span>}
        </p>
        <Link className="profiles_item-button" to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>

      <ul className="profiles_item-skills">
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index}>
            <img src={iconSign} className="profiles_item-sign" alt="sign" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
