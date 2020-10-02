import React from "react";
import { Link } from "react-router-dom";

import editUserIcon from "../../assets/images/edit-user.png";
import experienceIcon from "../../assets/images/experience.png";
import educationIcon from "../../assets/images/mortarboard.png";

const DashboardActions = () => {
  return (
    <div className="dash-actions">
      <Link to="/edit-profile" className="dash-actions_item">
        <img src={editUserIcon} alt="edit user" />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="dash-actions_item">
        <img src={experienceIcon} alt="edexperience" />
        Add Experience
      </Link>
      <Link to="/add-education" className="dash-actions_item">
        <img src={educationIcon} alt="education" />
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
