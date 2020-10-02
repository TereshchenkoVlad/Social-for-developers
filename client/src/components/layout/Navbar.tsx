import React, { FC } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/actions/app.actions";
import { bindActionCreators } from "redux";
import { logOut } from "../../redux/actions/auth";

import "../../styles/Navbar.scss";
import developIcon from "../../assets/images/develop.png";
import logoutIcon from "../../assets/images/logout.png";
import dashIcon from "../../assets/images/dash.png";
import profilesIcon from "../../assets/images/user-multiple.png";

type NavbarProps = LinkStateProps & LinkDispatchProps & {};

const Navbar: FC<NavbarProps> = ({ isAuthenticated, logOut }) => {
  const guestLinks = (
    <ul className="navbar-list">
      <li>
        <Link to="/">Developers</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul className="navbar-list">
      <li>
        <Link to="/profiles">
          <img src={profilesIcon} alt="dashboard" />
          Profiles
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <img src={dashIcon} alt="dashboard" />
          Dashboard
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logOut}>
          <img src={logoutIcon} alt="log out" />
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <Link to="/">
          <img src={developIcon} alt="develop" />
          DevConnector
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean | null;
}

interface LinkDispatchProps {
  logOut: () => void;
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  logOut: bindActionCreators(logOut, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
