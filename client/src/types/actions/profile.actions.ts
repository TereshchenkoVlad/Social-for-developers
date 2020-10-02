import { ProfileError, ProfileItem } from "../Profile";

export const GET_PROFILE = "GET_PROFILE";
export const GET_ALL_PROFILES = "GET_ALL_PROFILES";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const SET_LOADING = "SET_LOADING";

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  profile: Array<any>;
}

export interface GetAllProfilesAction {
  type: typeof GET_ALL_PROFILES;
  profiles: ProfileItem[];
}

export interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE;
  profile: Array<any>;
}

export interface GetProfileFailAction {
  type: typeof GET_PROFILE_FAIL;
  error: ProfileError;
}

export interface ClearProfileFailAction {
  type: typeof CLEAR_PROFILE;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

export type ProfileActionTypes =
  | GetProfileAction
  | SetLoadingAction
  | GetAllProfilesAction
  | UpdateProfileAction
  | GetProfileFailAction
  | ClearProfileFailAction;
