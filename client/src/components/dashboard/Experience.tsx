import React, { FC } from "react";
import moment from "moment";

import { Experience as ExperienceTypes } from "../../types/Profile";
import { AppActions } from "../../types/actions/app.actions";
import { Dispatch } from "redux";

type Props = {
  exp: ExperienceTypes[];
  deleteExperience: (
    id: string
  ) => (dispatch: Dispatch<AppActions>) => Promise<void>;
};

const Experience: FC<Props> = ({ exp, deleteExperience }) => {
  const formatDate = (from: string, to: string | null): string => {
    let first = moment(from).format("L");
    let second = to ? moment(to).format("L") : "Now";
    return `${first} - ${second}`;
  };

  const experiences = exp.map((item) => (
    <tr key={item._id}>
      <td>{item.company}</td>
      <td>{item.title}</td>
      <td>{formatDate(item.from, item.to)} </td>
      <td>
        <button onClick={() => deleteExperience(item._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="dash-table_title">Experience</h2>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

export default Experience;
