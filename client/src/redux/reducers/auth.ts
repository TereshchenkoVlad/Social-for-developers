import { Auth } from "../../types/Auth";
import { AuthActionTypes } from "../../types/actions/auth.actions";

const initialState: Auth = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action: AuthActionTypes): Auth => {
  switch (action.type) {
    case "USER_LOAD_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.user,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOG_OUT":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "USER_LOAD_FAIL":
    case "ACCOUNT_DELETED":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
