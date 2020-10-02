import { Dispatch } from "redux";
import axios from "axios";
import { History } from "history";

import { AppActions } from "../../types/actions/app.actions";
import { setAlert } from "./alert";
import { CreateProfileFormData } from "../../components/profile-forms/CreateProfile";
import { ErrorType } from "../../types/Error";
import { AddExperienceFormData } from "../../components/profile-forms/AddExperience";
import { AddEducationFormData } from "../../components/profile-forms/AddEducation";

// Get current user profile
export const getProfile = () => async (dispatch: Dispatch<AppActions>) => {
  try {
    const res = await axios.get("/api/profile/mine");
    dispatch({ type: "GET_PROFILE", profile: res.data });
  } catch (e) {
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: e.response.data.msg, status: e.response.status },
    });
  }
};

// Create profile
export const createProfile = (
  formData: CreateProfileFormData,
  history: History,
  edit = false
) => async (dispatch: Dispatch<AppActions>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/profile", formData, config);
    dispatch({ type: "GET_PROFILE", profile: res.data });
    dispatch<any>(
      setAlert(edit ? "Profile updated" : "Profile created", "success")
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((e: ErrorType) => {
        dispatch<any>(setAlert(e.msg, "danger"));
      });
    }
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Add experience
export const addExperience = (
  formData: AddExperienceFormData,
  history: History
) => async (dispatch: Dispatch<AppActions>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({ type: "UPDATE_PROFILE", profile: res.data });
    dispatch<any>(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((e: ErrorType) => {
        dispatch<any>(setAlert(e.msg, "danger"));
      });
    }
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Add education
export const addEducation = (
  formData: AddEducationFormData,
  history: History
) => async (dispatch: Dispatch<AppActions>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({ type: "UPDATE_PROFILE", profile: res.data });
    dispatch<any>(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((e: ErrorType) => {
        dispatch<any>(setAlert(e.msg, "danger"));
      });
    }
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({ type: "UPDATE_PROFILE", profile: res.data });
  } catch (e) {
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: e.response.data.msg, status: e.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({ type: "UPDATE_PROFILE", profile: res.data });
  } catch (e) {
    dispatch({
      type: "GET_PROFILE_FAIL",
      error: { msg: e.response.data.msg, status: e.response.status },
    });
  }
};
