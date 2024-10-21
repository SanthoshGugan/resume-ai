import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    plans: [],
    planId: null
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, action) => {
            state.plans = action.payload;
        },
        setPlanId: (state, action) => {
            state.planId = action.planId;
        }
    }
});

export const { setPlans, setPlanId } = planSlice.actions;
export default planSlice.reducer;