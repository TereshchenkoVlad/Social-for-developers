import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { addEducation } from "../../redux/actions/profile";
import { AppActions } from "../../types/actions/app.actions";
import { History } from "history";

export interface AddEducationFormData {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export type Props = RouteComponentProps & LinkDispatchToProps & {};

const AddEducation: FC<Props> = ({ history, addEducation }) => {
  const [formData, setFormData] = useState<AddEducationFormData>({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addEducation(formData, history);
  };

  return (
    <div className="profile">
      <form onSubmit={onSubmit}>
        <h1 className="profile-title">Add Education</h1>

        <div className="profile-input_block">
          <small>School:</small>
          <input
            value={school}
            name="school"
            onChange={onChange}
            type="text"
            placeholder="School"
          />
        </div>

        <div className="profile-input_block">
          <small>Degree:</small>
          <input
            value={degree}
            name="degree"
            onChange={onChange}
            type="text"
            placeholder="Degree"
          />
        </div>

        <div className="profile-input_block">
          <small>Field of study:</small>
          <input
            value={fieldofstudy}
            name="fieldofstudy"
            onChange={onChange}
            type="text"
            placeholder="Field of study"
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
          <small>Current Shool:</small>
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
          <small>Program description:</small>
          <textarea
            value={description}
            name="description"
            onChange={onChange}
            placeholder="Program description"
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
  addEducation: (
    formData: AddEducationFormData,
    history: History
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchToProps => ({
  addEducation: bindActionCreators(addEducation, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter<any, any>(AddEducation));
