import { createSelector } from "@reduxjs/toolkit";

const selectLoaderVisible = state => state?.loader?.isLoading;
const selectLoaderProgress = state => state?.loader?.progress;

const selectStatusMessage = state => state?.loader?.statusMessage;
const selectStatusImage = state => state?.loader?.imagePath;

const loaderSelector = createSelector(
    [
        selectLoaderProgress,
        selectLoaderVisible
    ],
    (progress, isVisible) => {
        return {
            progress,
            isVisible
        }
    }
);

const statusSelector = createSelector(
    [
        selectStatusMessage,
        selectStatusImage
    ],
    (message, image) => {
        return {
            message,
            image
        }
    }
)

export {
    loaderSelector,
    statusSelector
};