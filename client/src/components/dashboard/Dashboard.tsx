import React, { FC, useEffect } from "react";

import { connect } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/actions/app.actions";
import { bindActionCreators, Dispatch } from "redux";
import {
  getProfile,
  deleteAccount,
  deleteEducation,
  deleteExperience,
} from "../../redux/actions/profile";
import { Auth } from "../../types/Auth";
import { Profile } from "../../types/Profile";

import { Loader } from "../layout/Loader";
import { Link } from "react-router-dom";

import "../../styles/Dashboard.scss";
import "../../styles/Table.scss";
import userIcon from "../../assets/images/user.png";
import deleteUserIcon from "../../assets/images/delete-user2.png";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

export type DashboardProps = LinkStateToProps & LinkDispatchToProps & {};

const Dashboard: FC<DashboardProps> = ({
  getProfile,
  deleteAccount,
  deleteEducation,
  deleteExperience,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (profile === null && loading) {
    return <Loader />;
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="dash">
        <h1 className="dash-title">Dashboard</h1>
        <div className="dash-welcome">
          <img src={userIcon} alt="user" />
          <p>Welcome {user && user.name}</p>
        </div>

        {profile !== null ? (
          <>
            <DashboardActions />
            <Experience exp={profile.experience} {...{ deleteExperience }} />
            <Education edu={profile.education} {...{ deleteEducation }} />
            <div className="dash-delete_account" onClick={deleteAccount}>
              <img src={deleteUserIcon} alt="delete user" />
              Delete Account
            </div>
          </>
        ) : (
          <>
            <p className="dash-subtitle">
              You have not yet setup a profile, please add some info:
            </p>
            <Link to="/create-profile" className="dash-create_button">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

interface LinkStateToProps {
  auth: Auth;
  profile: Profile;
}

interface LinkDispatchToProps {
  getProfile: () => void;
  deleteExperience: (
    id: string
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
  deleteEducation: (
    id: string
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
  deleteAccount: () => (dispatch: Dispatch<AppActions>) => Promise<void>;
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  deleteExperience: bindActionCreators(deleteExperience, dispatch),
  deleteEducation: bindActionCreators(deleteEducation, dispatch),
  deleteAccount: bindActionCreators(deleteAccount, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
