import React, { FC } from "react";

import websiteIcon from "../../assets/images/globe-grid.png";
import twitterIcon from "../../assets/images/twitter.png";
import facebookIcon from "../../assets/images/facebook.png";
import instagramIcon from "../../assets/images/instagram.png";
import linkedinIcon from "../../assets/images/linkedin.png";
import youtubeIcon from "../../assets/images/youtube.png";

interface Props {
  url: string;
  type:
    | "website"
    | "twitter"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "youtube";
}

const SocialItem: FC<Props> = ({ url, type }) => {
  const icon =
    type === "website"
      ? websiteIcon
      : type === "twitter"
      ? twitterIcon
      : type === "facebook"
      ? facebookIcon
      : type === "instagram"
      ? instagramIcon
      : type === "linkedin"
      ? linkedinIcon
      : type === "youtube"
      ? youtubeIcon
      : "";

  if (!url || !icon) {
    return <></>;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={icon} className="profile_top-icon" alt="social" />
    </a>
  );
};

export default SocialItem;
