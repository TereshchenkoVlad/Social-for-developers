import React, { FC } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { Alert as AlertType } from "../../types/Alert";

import "../../styles/Alert.scss";

type Props = LinkStateProps & {};

const Alert: FC<Props> = ({ alerts }) => (
  <div className="alert-container">
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.alertType} bounceIn`}
        >
          {alert.msg}
        </div>
      ))}
  </div>
);

interface LinkStateProps {
  alerts: AlertType[];
}

const mapStateToProps = (state: AppState) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
