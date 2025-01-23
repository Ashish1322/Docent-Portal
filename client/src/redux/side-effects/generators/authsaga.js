import { call, put } from "redux-saga/effects";

import {
  updateUser,
  startLoading,
  stopLoading,
} from "../../slices/authslice.js";

import {
  signup,
  login,
  updateProfile,
  updatePassword,
} from "../api_calls/auth.js";

function* signup_generator(action) {
  try {
    // 1. Start Loading
    yield put(startLoading());

    // 2. Call the API
    let { email, password, gender, name } = action.payload;
    let response = yield call(signup, { email, password, gender, name });
    let data = yield response.json();

    // 3. Update the store based on result
    if (data.success == true) {
      yield put(stopLoading({ type: "signup", success: true, error: "" }));
    } else {
      yield put(
        stopLoading({ type: "signup", success: false, error: data.message })
      );
    }
  } catch (err) {
    yield put(
      stopLoading({ type: "signup", success: false, error: err.message })
    );
  }
}

function* login_generator(action) {
  try {
    // 1. Start Loading
    yield put(startLoading());

    // 2. Call the API
    let { email, password } = action.payload;
    let response = yield call(login, email, password);
    let data = yield response.json();

    // 3. Update the store based on result
    if (data.success == true) {
      yield put(stopLoading({ type: "login", success: true, error: "" }));
      // 4. If login is success update the user values to store
      yield put(updateUser({ user: data.user }));
    } else {
      yield put(
        stopLoading({ type: "login", success: false, error: data.message })
      );
    }
  } catch (err) {
    yield put(
      stopLoading({ type: "login", success: false, error: err.message })
    );
  }
}

function* update_profile_generator(action) {
  try {
    // 1. Start Loading
    yield put(startLoading());

    // 2. Call the API
    let { phone, about, street, city, state, zip, token } = action.payload;
    let response = yield call(
      updateProfile,
      phone,
      about,
      street,
      city,
      state,
      zip,
      token
    );
    let data = yield response.json();
    // 3. Update the store based on result
    if (data.success == true) {
      yield put(
        stopLoading({ type: "updateProfile", success: true, error: "" })
      );
      // 4. Update the value of user in store. API will return the updated user just update it in store.
      yield put(updateUser({ user: data.user }));
    } else {
      yield put(
        stopLoading({
          type: "updateProfile",
          success: false,
          error: data.message,
        })
      );
    }
  } catch (err) {
    yield put(
      stopLoading({ type: "updateProfile", success: false, error: err.message })
    );
  }
}

function* update_password_generator(action) {
  try {
    // 1. Start Loading
    yield put(startLoading());

    // 2. Call the API
    let { currentPassword, newPassword, token } = action.payload;
    let response = yield call(
      updatePassword,
      newPassword,
      currentPassword,
      token
    );
    let data = yield response.json();
    // 3. Update the store based on result
    if (data.success == true) {
      yield put(
        stopLoading({ type: "updatePassword", success: true, error: "" })
      );
    } else {
      yield put(
        stopLoading({
          type: "updatePassword",
          success: false,
          error: data.message,
        })
      );
    }
  } catch (err) {
    yield put(
      stopLoading({
        type: "updatePassword",
        success: false,
        error: err.message,
      })
    );
  }
}

export {
  signup_generator,
  login_generator,
  update_profile_generator,
  update_password_generator,
};
