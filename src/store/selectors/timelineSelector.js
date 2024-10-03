import { createSelector } from "@reduxjs/toolkit";

const selectSteps = state => state.timeline?.steps || [];

const isCurrentStepActive = (state, id) => state.current === id;

const stepsSelector = createSelector(
    [selectSteps],
    (steps) => steps
);

const currentStepSelector = createSelector(
    [isCurrentStepActive],
    (b) => b
)

export {
    currentStepSelector,
    stepsSelector
};