import React, { FC } from "react";
import moment from "moment";

import { Education as EducationTypes } from "../../types/Profile";
import { Dispatch } from "redux";
import { AppActions } from "../../types/actions/app.actions";

type Props = {
  edu: EducationTypes[];
  deleteEducation: (
    id: string
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
};

const Education: FC<Props> = ({ edu, deleteEducation }) => {
  const formatDate = (from: string, to: string | null): string => {
    let first = moment(from).format("L");
    let second = to ? moment(to).format("L") : "Now";
    return `${first} - ${second}`;
  };

  const educations = edu.map((item) => (
    <tr key={item._id}>
      <td>{item.school}</td>
      <td>{item.degree}</td>
      <td>{formatDate(item.from, item.to)} </td>
      <td>
        <button onClick={() => deleteEducation(item._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="dash-table_title">Education</h2>
      <table className="dash-table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

export default Education;
