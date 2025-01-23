import { takeLatest } from "redux-saga/effects";

import {
  signup,
  login,
  updateProfile,
  updatePassword,
} from "./slices/authslice.js";

import { fetchAllPersons, fetchAllMessages } from "./slices/userslice.js";

import {
  signup_generator,
  login_generator,
  update_profile_generator,
  update_password_generator,
} from "./side-effects/generators/authsaga.js";

import {
  fetch_all_persons_generator,
  fetch_all_messages_generator,
} from "./side-effects/generators/usersaga.js";

function* rootSaga() {
  yield takeLatest(signup.type, signup_generator);
  yield takeLatest(login.type, login_generator);
  yield takeLatest(updateProfile.type, update_profile_generator);
  yield takeLatest(updatePassword.type, update_password_generator);
  yield takeLatest(fetchAllPersons.type, fetch_all_persons_generator);
  yield takeLatest(fetchAllMessages.type, fetch_all_messages_generator);
}

export default rootSaga;
