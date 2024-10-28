import { createSlice } from "@reduxjs/toolkit"
import { URLs } from "../utils/urls";

const initialState = {
    steps: [
        { id: 'jd', title: 'Submit JD', avatar: 'JD', status: 'enabled', url: URLs.JD_UPLOAD },
        { id: 'resume', title: 'Submit Resumes', avatar: 'R', status: 'disabled', url: URLs.RESUME_UPLOAD },
        { id: 'match', title: 'View Matches', avatar: 'M', status: 'disabled', url: URLs.QUERIES },
        { id: 'reports', title: 'Export', avatar: 'D', status: 'disabled', url: URLs.REPORTS }
      ],
    current: 'jd',
    errors: [],
}

const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        timelineReset: state => initialState,
        updateStatusForStep: (state, action) => {
            const { id, status } = action.payload;
            state.steps = state.steps.map(step => {
                const {id: curr, status: _, ...remaining } = step;
                if (curr !== id) return step;
                return {
                    id,
                    ...remaining,
                    status
                }
            })
        },
        updateStepToActive: (state, action) => {
            const { id } = action.payload;
            state.current = id;
        }
    },
});

export const {
    timelineReset,
    updateStatusForStep,
    updateStepToActive
} = timelineSlice.actions;

export default timelineSlice.reducer;