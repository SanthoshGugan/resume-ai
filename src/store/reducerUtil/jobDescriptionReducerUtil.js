export const addSkillToJobDescription = (state, skills, skill, category, categoryName) => {
    const updatedSkills = skills.map(s => {
        if (s.skill !== category) return s; // If the skill category doesn't match, return skill as is

        const newCategories = s.categories.map(c => {
            if (c.category !== categoryName) return c; // If categoryName doesn't match, return category as is

            // Check if skill already exists
            const skillExists = c.attributes.some(attr => attr.core_skill === skill);
            if (skillExists) return c; // If skill exists, no changes

            // Add the new skill to attributes
            const updatedAttributes = [
                ...c.attributes,
                {
                    core_skill: skill,
                    expertise: "intermediate",
                    YoE: null
                }
            ];

            return {
                ...c,
                attributes: updatedAttributes
            };
        });

        return {
            ...s,
            categories: newCategories
        };
    });

    // Update roles and domains in jd
    return updateJobDescription(state.jd, updatedSkills);
};

const updateJobDescription = (jd, updatedSkills) => {
    let { dimensions } = jd;
    let { domains } = dimensions;

    let updatedRoles = domains[0].roles.map(role => ({
        ...role,
        skills: updatedSkills
    }));

    let updatedDomains = domains.map(domain => ({
        ...domain,
        roles: updatedRoles
    }));

    return {
        ...jd,
        dimensions: {
            ...dimensions,
            domains: updatedDomains
        }
    };
};

export const removeSkillFromJobDescription = (state, skills, skill, category, categoryName) => {
    const updatedSkills = skills.map(s => {
        if (s.label !== category) return s; // If the skill category doesn't match, return the skill as is

        const newCategories = s.categories.map(c => {
            if (c.category !== categoryName) return c; // If categoryName doesn't match, return the category as is

            // Filter out the skill to remove
            const updatedAttributes = c.attributes.filter(attr => attr.core_skill !== skill);

            return {
                ...c,
                attributes: updatedAttributes
            };
        });

        return {
            ...s,
            categories: newCategories
        };
    });

    // Update roles and domains in jd
    return updateJobDescription(state.jd, updatedSkills);
};

// Utility function to update domains (Reusable for other updates)
const updateDomain = (domains, updatedDomain) => {
    return domains.map(d => (d.name === updatedDomain.name ? updatedDomain : d));
};

// Utility function to update roles (Reusable for other updates)
const updateRole = (roles, updatedRole) => {
    return roles.map(r => (r.role === updatedRole.role ? updatedRole : r));
};

// Utility function to update skills (Reusable for other updates)
const updateSkill = (skills, updatedSkill) => {
    return skills.map(s => (s.skill === updatedSkill.skill ? updatedSkill : s));
};