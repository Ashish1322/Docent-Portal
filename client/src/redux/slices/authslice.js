import { createSlice } from "@reduxjs/toolkit";
import {
  startLoadingAction,
  stopLoadingAction,
  logoutAction,
  updateUserAction,
} from "../actions/authActions";

const authInitialState = {
  user: null,
  loading: false,
  api_result: null, // { type : "signup", success: false, error: ""}
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: authInitialState,
  reducers: {
    startLoading: startLoadingAction,
    stopLoading: stopLoadingAction,
    logout: logoutAction,
    updateUser: updateUserAction,
    signup: (state, action) => {},
    login: (state, action) => {},
    updateProfile: (state, action) => {},
    updatePassword: (state, action) => {},
    // TODO: You can take ref of signup and create all the features mentioned in the text file
  },
});

export const {
  startLoading,
  stopLoading,
  logout,
  updateUser,
  signup,
  login,
  updateProfile,
  updatePassword,
} = authSlice.actions;

export default authSlice.reducer;
