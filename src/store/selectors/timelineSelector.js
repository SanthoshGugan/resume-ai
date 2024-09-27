import { createSelector } from "@reduxjs/toolkit";

const selectSteps = state => state.timeline?.steps || [];

const isCurrentStepActive = (state, id) => state.current === id;


const selectStepsSelector = createSelector(
    [
        selectSteps,
        (state, stepId) => stepId
    ],
    (steps, id) => {
        return steps.find(step => step.id === id) || {} ;
    }
);

export {
    selectSteps,
    selectStepsSelector,
    isCurrentStepActive
};