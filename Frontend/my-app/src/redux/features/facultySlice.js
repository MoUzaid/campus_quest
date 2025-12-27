import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    facultyId: "",
    name: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    password: "",
  },
  message: {
    type: "",
    text: "",
  },
};

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFacultyField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    resetFacultyForm(state) {
      state.formData = initialState.formData;
    },

    setFacultyMessage(state, action) {
      state.message = action.payload;
    },

    clearFacultyMessage(state) {
      state.message = { type: "", text: "" };
    },
  },
});

export const {
  setFacultyField,
  resetFacultyForm,
  setFacultyMessage,
  clearFacultyMessage,
} = facultySlice.actions;

export default facultySlice.reducer;
