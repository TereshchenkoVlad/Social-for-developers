import React, { FC, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getAllProfiles } from "../../redux/actions/profile";
import { AppState } from "../../redux/configureStore";
import { AppActions } from "../../types/actions/app.actions";
import { Profile as ProfileTypes } from "../../types/Profile";
import { Loader } from "../layout/Loader";

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
    <div>
      <h1>Developers</h1>
      {profiles.length > 0
        ? profiles.map((p) => <div key={p._id}>{p.location}</div>)
        : "No Profiles Found!"}
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
