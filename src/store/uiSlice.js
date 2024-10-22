import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previousPage: null,
    isPaymentTriggered: false,
    paymentAmount: 0,
    paymentPlanId: null
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setPreviousPage: (state, action) => {
            state.previousPage = action.payload
        },
        uiReset: state => initialState,
        setPaymentTriggered: (state, action) => {
            state.isPaymentTriggered = action.payload;
        },
        setPaymentAmount: (state, action) => {
            state.paymentAmount = action.payload;
        },
        setPaymentPlanId: (state, action) => {
            state.paymentPlanId = action.payload;
        }
    },
})

export const { setPreviousPage, setPaymentTriggered, setPaymentAmount, setPaymentPlanId, uiReset } = uiSlice.actions;
export default uiSlice.reducer;
