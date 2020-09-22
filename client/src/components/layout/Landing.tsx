import React, { FC } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import { AppState } from "../../redux/configureStore";
import "../../styles/Landing.scss";

type Props = LinkStateProps & {};

const Landing: FC<Props> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="landing-overlay">
        <div className="landing-inner">
          <h1 className="landing-title">Developer Connector</h1>
          <p className="landing-description">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="landing-buttons">
            <Link className="landing-buttons_signup" to="/signup">
              Sign Up
            </Link>
            <Link className="landing-buttons_login" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean | null;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
