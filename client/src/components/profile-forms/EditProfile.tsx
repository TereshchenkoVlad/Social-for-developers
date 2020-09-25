import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";
import { bindActionCreators, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { createProfile, getProfile } from "../../redux/actions/profile";
import { AppActions } from "../../types/actions/app.actions";
import { Profile } from "../../types/Profile";
import { AppState } from "../../redux/configureStore";

import { CreateProfileFormData } from "./CreateProfile";

import "../../styles/Profile.scss";

export type Props = LinkDispatchToProps &
  LinkStateProps &
  RouteComponentProps & {};

const EditProfile: FC<Props> = ({
  createProfile,
  history,
  getProfile,
  profile: { profile, loading },
}) => {
  const [socialInfo, showSocial] = useState(false);
  const [formData, setFormData] = useState<CreateProfileFormData>({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });
  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    youtube,
    facebook,
    linkedin,
    instagram,
    twitter,
  } = formData;

  useEffect(() => {
    getProfile();
    setFormData({
      status: loading || !profile.status ? "" : profile.status,
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      bio: loading || !profile.bio ? "" : profile.bio,
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
    });
  }, [loading]);

  const onChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className="create-profile">
      <form onSubmit={onSubmit}>
        <h1 className="create-profile-title">Edit Profile</h1>
        <select name="status" value={status} onChange={onChange}>
          <option value="0">* Select professional status:</option>
          <option value="Developer">Developer</option>
          <option value="Junion Developer">Junion Developer</option>
          <option value="Middle Developer">Middle Developer</option>
          <option value="Senior Developer">Senior Developer</option>
        </select>
        <input
          value={company}
          name="company"
          onChange={onChange}
          type="text"
          placeholder="Company"
        />
        <input
          value={website}
          name="website"
          onChange={onChange}
          type="text"
          placeholder="Website"
        />
        <input
          value={location}
          name="location"
          onChange={onChange}
          type="text"
          placeholder="Location"
        />
        <input
          value={skills}
          name="skills"
          onChange={onChange}
          type="text"
          placeholder="Skills"
        />
        <input
          value={githubusername}
          name="githubusername"
          onChange={onChange}
          type="text"
          placeholder="Github username"
        />
        <textarea
          value={bio}
          name="bio"
          onChange={onChange}
          placeholder="A short bio"
        />
        <p
          className="create-profile-social"
          onClick={() => showSocial(!socialInfo)}
        >
          Add Social network links
        </p>
        {socialInfo && (
          <>
            <input
              value={youtube}
              name="youtube"
              onChange={onChange}
              type="text"
              placeholder="YouTube"
            />
            <input
              value={facebook}
              name="facebook"
              onChange={onChange}
              type="text"
              placeholder="Facebook"
            />
            <input
              value={linkedin}
              name="linkedin"
              onChange={onChange}
              type="text"
              placeholder="Linkedin"
            />
            <input
              value={instagram}
              name="instagram"
              onChange={onChange}
              type="text"
              placeholder="Instagram"
            />
            <input
              value={twitter}
              name="twitter"
              onChange={onChange}
              type="text"
              placeholder="Twitter"
            />
          </>
        )}

        <div className="create-profile-button-block">
          <button className="create-profile-submit" type="submit">
            Submit
          </button>
          <button
            className="create-profile-back"
            type="button"
            onClick={history.goBack}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

interface LinkStateProps {
  profile: Profile;
}

interface LinkDispatchToProps {
  createProfile: (
    formData: CreateProfileFormData,
    history: History,
    edit: boolean | undefined
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
  getProfile: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  profile: state.profile,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  createProfile: bindActionCreators(createProfile, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<any, any>(EditProfile));
