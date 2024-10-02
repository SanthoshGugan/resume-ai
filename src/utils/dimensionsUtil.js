export const skillListFromCategories = (categories) => {
    const skillList = [];
    for(const category of categories) {
        for(const attr of category?.attributes) {
            skillList.push(attr?.core_skill);
        }
    }
    return skillList;
};