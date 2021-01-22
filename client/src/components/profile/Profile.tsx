import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { getProfileById } from "../../redux/actions/profile";
import { AppState } from "../../redux/configureStore";
import { AppActions } from "../../types/actions/app.actions";
import { Profile as ProfileTypes } from "../../types/Profile";
import { Loader } from "../layout/Loader";
import { Auth } from "../../types/Auth";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import "../../styles/Profile.scss";

type Props = LinkStateToProps &
  LinkDispatchToProps & {
    match: any;
  };

const Profile: FC<Props> = ({
  auth,
  match,
  profile: { profile, loading },
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  if (profile === null || loading) {
    return <Loader />;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <Link to="/profiles" className="profile_button-back profile_button">
          Back
        </Link>
        {auth.isAuthenticated &&
          !auth.loading &&
          auth.user?._id === profile.user._id && (
            <Link
              to="/edit-profile"
              className="profile_button-edit profile_button"
            >
              Edit
            </Link>
          )}

        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
    </div>
  );
};

interface LinkStateToProps {
  auth: Auth;
  profile: ProfileTypes;
}

interface LinkDispatchToProps {
  getProfileById: (id: string) => any;
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  getProfileById: bindActionCreators(getProfileById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
