import { ProfileError } from "../Profile";

export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
export const CLEAR_PROFILE = "CLEAR_PROFILE";

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  profile: Array<any>;
}

export interface GetProfileFailAction {
  type: typeof GET_PROFILE_FAIL;
  error: ProfileError;
}

export interface ClearProfileFailAction {
  type: typeof CLEAR_PROFILE;
}

export type ProfileActionTypes =
  | GetProfileAction
  | GetProfileFailAction
  | ClearProfileFailAction;
