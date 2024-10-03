import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    steps: [
        { id: 'jd', title: 'Submit JD', avatar: 'JD', status: 'enabled', url: '/jd-upload' },
        { id: 'resume', title: 'Submit Resumes', avatar: 'R', status: 'disabled', url: '/resume-upload' },
        { id: 'match', title: 'View Matches', avatar: 'M', status: 'disabled', url: '/queries' },
        { id: 'reports', title: 'Export', avatar: 'D', status: 'disabled', url: '/reports'}
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