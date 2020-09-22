import React, { FC, useEffect } from "react";

import { connect } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/actions/app.actions";
import { bindActionCreators } from "redux";
import { getProfile } from "../../redux/actions/profile";
import { Auth } from "../../types/Auth";
import { Profile } from "../../types/Profile";

import { Loader } from "../layout/Loader";
import { Link } from "react-router-dom";

export type DashboardProps = LinkStateToProps & LinkDispatchToProps & {};

const Dashboard: FC<DashboardProps> = ({
  getProfile,
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
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}</p>
      {profile === null ? (
        <React.Fragment>has not</React.Fragment>
      ) : (
        <React.Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile">Create Profile</Link>
        </React.Fragment>
      )}
    </div>
  );
};

interface LinkStateToProps {
  auth: Auth;
  profile: Profile;
}

interface LinkDispatchToProps {
  getProfile: () => void;
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  getProfile: bindActionCreators(getProfile, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
