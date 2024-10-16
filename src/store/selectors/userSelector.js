import { createSelector } from "@reduxjs/toolkit";
import { PREMIUM_PLANS } from "../../utils/constants";

const userSignOutSelector = state => state?.user?.signOut;
const userIdSelector = state => state?.user.userId;
const selectUserFlags = state => state?.user.flags;
const selectFlagLoading = state => state?.user?.setLoadingFlags;
const selectUserPlan = state => state?.user?.userPlan;

const userFlagsSelector = createSelector(
    [
        selectUserFlags
    ],
    (flags) => flags
);

const isUserPremiumSelector = createSelector(
    [
        selectUserPlan
    ],
    (userPlan) => {

        return PREMIUM_PLANS.includes(userPlan);
    }
);

export {
    userSignOutSelector,
    userIdSelector,
    userFlagsSelector,
    selectFlagLoading,
    isUserPremiumSelector
}