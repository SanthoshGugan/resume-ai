import { createSelector } from "@reduxjs/toolkit";

// const selectSkillsFromFullStackDomain = state => state?.jobDescription?.jd?.domains[0]?.roles[0]?.skills || [];
const selectSkillsFromFullStackDomain = state => state.jobDescription?.jd?.dimensions ? state?.jobDescription?.jd?.dimensions.domains[0]?.roles[0]?.skills : [];

const selectSkillsByCateogry = state => state.jobDescription?.skills?.byCategory;

const selectJDDimensions = state => state.jobDescription?.jd?.dimensions;

const selectSkillsCategories = state => state?.jobDescription.skills?.categories || [];

const selectJdSkillUpdateStatus = state => state?.jobDescription.jdSkillUpdateSkill || '';

const selectSkillsFromAllCategory = createSelector(
    [selectSkillsFromFullStackDomain],
    (skillsByCategoryList) => {
        // console.log(`skillsByCategoryList ::: ${JSON.stringify(skillsByCategoryList)}`);
        return skillsByCategoryList.reduce((acc, skillCategory) => {
            const categoryName = skillCategory?.label;
            const categoryId = skillCategory?.skill;
            const out = [];
            for(const category of skillCategory?.categories) {
                for (const attr of category?.attributes) {
                    out.push({
                        categoryName,
                        categoryId,
                        skill: attr?.core_skill
                    });
                }
            }
            return [
                ...acc,
                ...out
            ]
        }, []);
    }
);


const selectGlobalSkills = createSelector(
    [
        selectSkillsByCateogry,
        selectSkillsFromAllCategory
    ],
    (byCategory, skillExists) => {
        const categorySet = new Set(skillExists.map(skill => skill.skill));
        // console.log(`categorySet ::: ${JSON.stringify(categorySet)}`, categorySet);
        return Object.keys(byCategory).reduce((acc, key) => {
            const skills = byCategory[key];
            const uniqSkills = skills.filter(skill => {
                // console.log(`skill ::: ${JSON.stringify(skill)}`, categorySet.has(skill));
                return !categorySet.has(skill);
            }) || [];
            const out = uniqSkills.map(skill => ({ skill, categoryName: key }))
            return [
                ...acc,
                ...out
            ]
        }, [])
    }
);

const isJdUpdateSkillVisible = createSelector([
    selectJDDimensions
], (
    dimensions
) => {
    if (!dimensions) return false;
    return dimensions?.domains?.length > 0;
});

export { selectSkillsFromAllCategory, selectGlobalSkills, isJdUpdateSkillVisible, selectSkillsCategories, selectJdSkillUpdateStatus } ;

