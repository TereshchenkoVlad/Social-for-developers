import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { addExperience } from "../../redux/actions/profile";
import { AppActions } from "../../types/actions/app.actions";
import { History } from "history";

export interface AddExperienceFormData {
  company: string;
  title: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export type Props = RouteComponentProps & LinkDispatchToProps & {};

const AddExperience: FC<Props> = ({ history, addExperience }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className="profile">
      <form onSubmit={onSubmit}>
        <h1 className="profile-title">Add Experience</h1>

        <div className="profile-input_block">
          <small>Job title:</small>
          <input
            value={title}
            name="title"
            onChange={onChange}
            type="text"
            placeholder="Job title"
          />
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
          <small>From date:</small>
          <input
            value={from}
            name="from"
            onChange={onChange}
            type="date"
            placeholder="From"
          />
        </div>

        <div className="profile-checkbox_block">
          <small>Current Job:</small>
          <input
            name="to"
            type="checkbox"
            checked={current}
            onChange={(e) => setFormData({ ...formData, current: !current })}
            className="profile-checkbox"
          />
        </div>

        {!current && (
          <div className="profile-input_block">
            <small>To date:</small>
            <input
              value={to}
              name="to"
              onChange={onChange}
              type="date"
              placeholder="To date"
              min={from && from}
            />
          </div>
        )}

        <div className="profile-input_block">
          <small>Job description:</small>
          <textarea
            value={description}
            name="description"
            onChange={onChange}
            placeholder="Job description"
          />
        </div>

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

interface LinkDispatchToProps {
  addExperience: (
    formData: AddExperienceFormData,
    history: History
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  addExperience: bindActionCreators(addExperience, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter<any, any>(AddExperience));
