function updatePersonArray(state, action) {
  state.persons = action.payload.persons;
}

function updateMessages(state, action) {
  console.log(action.payload);
  if (action.payload.overWrite == true) {
    state.messages = action.payload.messages;
  } else {
    state.messages = [...state.messages, ...action.payload.messages];
  }
}

function updateSelectedChatUser(state, action) {
  state.selectedChatUser = action.payload.user;
}
export { updatePersonArray, updateMessages, updateSelectedChatUser };
