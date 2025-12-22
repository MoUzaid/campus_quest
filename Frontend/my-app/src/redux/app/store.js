import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quizSlice";
import courseReducer from "../features/courseSlice";
import departmentReducer from "../features/departmentSlice";

import { quizApi } from "../services/quizApi";
import { courseApi } from "../services/coursesApi";
import { departmentApi } from "../services/departmentApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

/* ✅ Persist only quiz slice */
const persistConfig = {
  key: "quiz",
  storage,
};

const persistedQuizReducer = persistReducer(
  persistConfig,
  quizReducer
);

export const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,
    course: courseReducer,
    department: departmentReducer,

    [quizApi.reducerPath]: quizApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(
      quizApi.middleware,
      courseApi.middleware,
      departmentApi.middleware
    ),

  devTools: true,
});

export const persistor = persistStore(store);
