import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { getAllProfiles } from "../../redux/actions/profile";
import { AppState } from "../../redux/configureStore";
import { AppActions } from "../../types/actions/app.actions";
import { Profile as ProfileTypes } from "../../types/Profile";
import { Loader } from "../layout/Loader";
import ProfileItem from "./ProfileItem";
import "../../styles/Profiles.scss";
import connectIcon from "../../assets/images/connection.png";

type Props = LinkStateToProps & LinkDispatchToProps;

const Profiles: FC<Props> = ({
  getAllProfiles,
  profile: { loading, profiles },
}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profiles">
      <div className="profiles-container">
        <h1 className="profiles-title">Profiles</h1>
        <div className="profiles-subtitle_container">
          <img
            src={connectIcon}
            className="profiles-subtitle_icon"
            alt="connect"
          />
          <h5 className="profiles-subtitle">
            Browse and connect with developers
          </h5>
        </div>

        {profiles.length > 0 ? (
          profiles.map((p) => <ProfileItem key={p._id} profile={p} />)
        ) : (
          <h4 className="profiles-subtitle">"No Profiles Found!"</h4>
        )}
      </div>
    </div>
  );
};

interface LinkStateToProps {
  profile: ProfileTypes;
}

interface LinkDispatchToProps {
  getAllProfiles: () => void;
}

const mapStateToProps = (state: AppState) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  getAllProfiles: bindActionCreators(getAllProfiles, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
