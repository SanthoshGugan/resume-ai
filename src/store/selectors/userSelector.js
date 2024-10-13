import { createSelector } from "@reduxjs/toolkit";

const userSignOutSelector = state => state?.user?.signOut;
const userIdSelector = state => state?.user.userId;
const selectUserFlags = state => state?.user.flags;
const selectFlagLoading = state => state?.user?.setLoadingFlags;

const userFlagsSelector = createSelector(
    [
        selectUserFlags
    ],
    (flags) => flags
)

export {
    userSignOutSelector,
    userIdSelector,
    userFlagsSelector,
    selectFlagLoading
}