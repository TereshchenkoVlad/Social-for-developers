import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { History } from "history";
import { bindActionCreators, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { createProfile } from "../../redux/actions/profile";
import { AppActions } from "../../types/actions/app.actions";

export interface CreateProfileFormData {
  status: string;
  company: string;
  website: string;
  location: string;
  skills: string;
  bio: string;
  githubusername: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

export type CreateProfileProps = LinkDispatchToProps & RouteComponentProps & {};

const CreateProfile: FC<CreateProfileProps> = ({ createProfile, history }) => {
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

  const onChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className="create-profile">
      <form onSubmit={onSubmit}>
        <h1 className="create-profile-title">Create Profile</h1>
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

interface LinkDispatchToProps {
  createProfile: (
    formData: CreateProfileFormData,
    history: History,
    edit?: boolean | undefined
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  createProfile: bindActionCreators(createProfile, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter<any, any>(CreateProfile));
