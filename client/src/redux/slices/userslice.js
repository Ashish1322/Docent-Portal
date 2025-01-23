import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updatePersonArray,
  updateMessages,
  updateSelectedChatUser,
} from "../actions/userActions";

const userInitialState = {
  persons: [],
  selectedChatUser: null,
  messages: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    updatePersons: updatePersonArray,
    setMessages: updateMessages,
    setSelectedChatUser: updateSelectedChatUser,
    fetchAllPersons: (state, action) => {},
    fetchAllMessages: (state, action) => {},
  },
});

export const {
  updatePersons,
  fetchAllPersons,
  setSelectedChatUser,
  setMessages,
  fetchAllMessages,
} = userSlice.actions;

export default userSlice.reducer;
