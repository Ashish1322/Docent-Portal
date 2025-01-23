import { call, put } from "redux-saga/effects";

import { updatePersons, setMessages } from "../../slices/userslice.js";

import { fetchAllPersons, fetchAllMessages } from "../api_calls/user.js";

function* fetch_all_persons_generator(action) {
  try {
    const { role, token, query } = action.payload;
    let response = yield call(fetchAllPersons, role, token, query);
    let data = yield response.json();

    // 3. Update the store based on result
    if (data.success == true) {
      let persons = [];
      if (role == "patient") {
        persons = data.doctors;
      } else {
        persons = data.patients;
      }
      yield put(updatePersons({ persons: persons }));
    }
  } catch (err) {
    console.log("Error", err);
  }
}

function* fetch_all_messages_generator(action) {
  try {
    const { receiverId, token } = action.payload;
    let response = yield call(fetchAllMessages, receiverId, token);
    let data = yield response.json();

    // 3. Update the store based on result
    if (data.success == true) {
      yield put(setMessages({ messages: data.messages, overWrite: true }));
    }
  } catch (err) {
    console.log("Error", err);
  }
}

export { fetch_all_persons_generator, fetch_all_messages_generator };
