import { configureStore } from "@reduxjs/toolkit";

import quizReducer from "../features/quizSlice";
import courseReducer from "../features/courseSlice";
import departmentReducer from "../features/departmentSlice";
import studentReducer from "../features/studentSlice";
import authReducer from "../features/authSlice";
import facultyReducer from "../features/facultySlice";

import { quizApi } from "../services/quizApi";
import { courseApi } from "../services/coursesApi";
import { departmentApi } from "../services/departmentApi";
import { chatApi } from "../services/chatApi";
import { studentApi } from "../services/studentApi";
import { facultyApi } from "../services/facultyApi";
import { superAdminApi } from "../services/superAdminApi";

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

/* ================= PERSIST CONFIG ================= */

const authPersistConfig = {
  key: "auth",
  storage,
};

const quizPersistConfig = {
  key: "quiz",
  storage,
};

/* ================= PERSISTED REDUCERS ================= */

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer
);

const persistedQuizReducer = persistReducer(
  quizPersistConfig,
  quizReducer
);

/* ================= STORE ================= */

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,     // ✅ persisted
    quiz: persistedQuizReducer,     // ✅ persisted

    course: courseReducer,
    department: departmentReducer,
    student: studentReducer,
    faculty: facultyReducer,

    [quizApi.reducerPath]: quizApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
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
      departmentApi.middleware,
      chatApi.middleware,
      studentApi.middleware,
      facultyApi.middleware,
      superAdminApi.middleware
    ),

  devTools: true,
});

export const persistor = persistStore(store);
