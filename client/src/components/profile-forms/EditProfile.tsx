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
      status: loading || !profile || !profile.status ? "" : profile.status,
      company: loading || !profile || !profile.company ? "" : profile.company,
      website: loading || !profile || !profile.website ? "" : profile.website,
      location:
        loading || !profile || !profile.location ? "" : profile.location,
      skills:
        loading || !profile || !profile.skills ? "" : profile.skills.join(","),
      bio: loading || !profile || !profile.bio ? "" : profile.bio,
      githubusername:
        loading || !profile || !profile.githubusername
          ? ""
          : profile.githubusername,
      youtube:
        loading || !profile || !profile.social ? "" : profile.social.youtube,
      facebook:
        loading || !profile || !profile.social ? "" : profile.social.facebook,
      linkedin:
        loading || !profile || !profile.social ? "" : profile.social.linkedin,
      instagram:
        loading || !profile || !profile.social ? "" : profile.social.instagram,
      twitter:
        loading || !profile || !profile.social ? "" : profile.social.twitter,
    });
  }, [loading, getProfile, profile]);

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
    <div className="profile">
      <form onSubmit={onSubmit}>
        <h1 className="profile-title">Edit Profile</h1>
        <div className="profile-input_block">
          <small>Status:</small>
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select professional status:</option>
            <option value="Developer">Developer</option>
            <option value="Junion Developer">Junion Developer</option>
            <option value="Middle Developer">Middle Developer</option>
            <option value="Senior Developer">Senior Developer</option>
          </select>
        </div>

        <div className="profile-input_block">
          <small>Company:</small>
          <input
            value={company}
            name="company"
            onChange={onChange}
            type="text"
            placeholder="Company"
          />
        </div>

        <div className="profile-input_block">
          <small>Website:</small>
          <input
            value={website}
            name="website"
            onChange={onChange}
            type="text"
            placeholder="Website"
          />
        </div>

        <div className="profile-input_block">
          <small>Location:</small>
          <input
            value={location}
            name="location"
            onChange={onChange}
            type="text"
            placeholder="Location"
          />
        </div>

        <div className="profile-input_block">
          <small>Skills:</small>
          <input
            value={skills}
            name="skills"
            onChange={onChange}
            type="text"
            placeholder="Skills"
          />
        </div>

        <div className="profile-input_block">
          <small>Github:</small>
          <input
            value={githubusername}
            name="githubusername"
            onChange={onChange}
            type="text"
            placeholder="Github username"
          />
        </div>

        <div className="profile-input_block">
          <small>BIO:</small>
          <textarea
            value={bio}
            name="bio"
            onChange={onChange}
            placeholder="A short bio"
          />
        </div>

        <p className="profile-social" onClick={() => showSocial(!socialInfo)}>
          Add Social network links
        </p>
        {socialInfo && (
          <>
            <div className="profile-input_block">
              <small>YouTube:</small>
              <input
                value={youtube}
                name="youtube"
                onChange={onChange}
                type="text"
                placeholder="YouTube"
              />
            </div>

            <div className="profile-input_block">
              <small>Facebook:</small>
              <input
                value={facebook}
                name="facebook"
                onChange={onChange}
                type="text"
                placeholder="Facebook"
              />
            </div>

            <div className="profile-input_block">
              <small>Linkedin:</small>
              <input
                value={linkedin}
                name="linkedin"
                onChange={onChange}
                type="text"
                placeholder="Linkedin"
              />
            </div>

            <div className="profile-input_block">
              <small>Instagram:</small>
              <input
                value={instagram}
                name="instagram"
                onChange={onChange}
                type="text"
                placeholder="Instagram"
              />
            </div>

            <div className="profile-input_block">
              <small>Twitter:</small>
              <input
                value={twitter}
                name="twitter"
                onChange={onChange}
                type="text"
                placeholder="Twitter"
              />
            </div>
          </>
        )}

        <div className="profile-button-block">
          <button className="profile-submit" type="submit">
            Submit
          </button>
          <button
            className="profile-back"
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
