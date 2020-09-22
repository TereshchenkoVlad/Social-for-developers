import { Profile } from "../../types/Profile";
import { AppActions } from "../../types/actions/app.actions";

const initialState: Profile = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action: AppActions): Profile => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.profile,
        loading: false,
      };
    case "GET_PROFILE_FAIL":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};
