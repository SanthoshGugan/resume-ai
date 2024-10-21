import { createSelector } from "@reduxjs/toolkit";

// Access the raw plans state
const plans = state => state?.plan?.plans || [];
const planId = state => state?.plan?.planId;
const tempPlanId = state => state?.plan.tempPlanId;

// Sort plans by pricing
const getSortedPlans = createSelector(
    [plans],
    (plans) => plans.slice().sort((a, b) => a.pricing - b.pricing)
);

// Extract all plans (unsorted)
const getPlans = createSelector(
    [plans],
    (plans) => plans
);

// Extract features for comparison across all plans
const getFeaturesComparison = createSelector(
    [getSortedPlans],
    (plans) => {
        if (!plans.length) return [];

        // Extract unique features from all plans
        const allFeatures = Array.from(
            new Set(
                plans.flatMap(plan => plan.features.map(feature => feature.split(":")[0]))
            )
        );

        // Map the features into a format for rendering the comparison table
        const featureComparison = allFeatures.map((featureName) => {
            return {
                feature: featureName,
                plans: plans.map(plan => ({
                    planName: plan.name,
                    hasFeature: plan.features.some(f => f.startsWith(featureName)),
                    value: plan.features.find(f => f.startsWith(featureName))?.split(": ")[1] || ""
                }))
            };
        });

        return featureComparison;
    }
);

export {
    getPlans,
    getFeaturesComparison,
    getSortedPlans,
    tempPlanId,
    planId
};
