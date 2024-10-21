import { createSelector } from "@reduxjs/toolkit";

const previousPageSelector = state => state?.ui?.previousPage;
const isPaymentTriggered = state => state?.ui?.isPaymentTriggered;
const paymentPlanIdSelector = state => state?.ui?.paymentPlanId;
const paymentAmountSelector = state => state?.ui?.paymentAmount;

export {
    previousPageSelector,
    isPaymentTriggered,
    paymentPlanIdSelector,
    paymentAmountSelector
}