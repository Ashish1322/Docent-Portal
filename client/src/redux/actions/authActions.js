function startLoadingAction(state, action) {
  state.loading = true;
  state.api_result = null;
}

function stopLoadingAction(state, action) {
  state.loading = false;
  state.api_result = action.payload;
}

function logoutAction(state, action) {
  state.user = null;
}

function updateUserAction(state, action) {
  // update the user by populating current user values, then populating the provided new values so new values will override the old one
  console.log(action.payload.user);
  state.user = { ...state.user, ...action.payload.user };
}

export {
  startLoadingAction,
  stopLoadingAction,
  logoutAction,
  updateUserAction,
};
