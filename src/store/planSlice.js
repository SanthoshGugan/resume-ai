import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    plans: []
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, action) => {
            state.plans = action.payload;
        }
    }
});

export const { setPlans } = planSlice.actions;
export default planSlice.reducer;