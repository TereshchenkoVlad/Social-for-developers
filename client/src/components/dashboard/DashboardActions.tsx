import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-actions">
      <Link to="/edit-profile" className="dash-actions_item">
        Edit Profile
      </Link>
      <Link to="/add-experience" className="dash-actions_item">
        Add Experience
      </Link>
      <Link to="/add-education" className="dash-actions_item">
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
