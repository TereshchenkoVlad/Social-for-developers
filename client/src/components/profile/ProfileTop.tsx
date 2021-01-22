import React, { FC } from "react";

import { ProfileItem } from "../../types/Profile";
import SocialItem from "./SocialItem";

interface Props {
  profile: ProfileItem;
}

const ProfileTop: FC<Props> = ({
  profile: {
    user: { avatar, name },
    status,
    company,
    location,
    website,
    social,
  },
}) => {
  return (
    <div className="profile_top">
      <img src={avatar} className="profile_top-avatar" alt="avatar" />
      <h1 className="profile_top-title">{name}</h1>
      <h4 className="profile_top-subtitle">
        {status}
        {company && <span>at {company}</span>}
      </h4>
      {location && <p className="profile_top-text">{location}</p>}
      <div className="profile_top-social">
        <SocialItem url={website} type="website" />
        <SocialItem
          url={social && social.linkedin ? social.linkedin : ""}
          type="linkedin"
        />
        <SocialItem
          url={social && social.twitter ? social.twitter : ""}
          type="twitter"
        />
        <SocialItem
          url={social && social.facebook ? social.facebook : ""}
          type="facebook"
        />
        <SocialItem
          url={social && social.instagram ? social.instagram : ""}
          type="instagram"
        />
        <SocialItem
          url={social && social.youtube ? social.youtube : ""}
          type="youtube"
        />
      </div>
    </div>
  );
};

export default ProfileTop;
