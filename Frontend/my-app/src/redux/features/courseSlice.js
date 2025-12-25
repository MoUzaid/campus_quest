import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    year:[],
    groups: [],
    loading: false,
    error: null,
};
const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchCoursesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCoursesSuccess(state, action) {
            state.loading = false;
            state.courses = action.payload;
        },
        fetchCoursesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        setCourses(state, action) {
            state.courses = action.payload;
        },
        setYear(state, action) {
            state.year = action.payload;
        },
        setGroups(state, action) {
            state.groups = action.payload;
        },
    },
});

export const {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    setCourses,
    setYear,
    setGroups,
} = courseSlice.actions;

export default courseSlice.reducer;
