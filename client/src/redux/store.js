import { configureStore } from "@reduxjs/toolkit";
import authslice from "./slices/authslice";
import userslice from "./slices/userslice";
import rootSaga from "./saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authslice,
    user: userslice,
  },
  middleware: (existingMiddleware) =>
    existingMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
