export const JOB_DESCRIPTION = {
    skills: {
        front_end: [

        ],
        back_end:  [

        ],
        dev_ops: [

        ],
        ai_ml: [
            
        ]
    }
};

export const domainToCardMapper = (domainsStr) => {
    const domainsJSON = JSON.parse(domainsStr);
    const { domains } = domainsJSON;
    const domain = domains[0];
    const fullStackRole = domain?.roles[0];
    const skills = fullStackRole.skills;
    const cards = [];
    for(const skill of skills) {
        const { label, categories = [] } = skill;
        const content = [];
        for(const item of categories) {
            const { category, attributes =[]  } = item;
            const items = []
            for(const attribute of attributes) {
                const { core_skill } = attribute;
                items.push({ name: core_skill });
            }
            const contentItem = {
                type: "List",
                heading: category,
                items
            };
            content.push(contentItem);
        }
        const card = {
            type: "Skill",
            name: label,
            content
        }
        cards.push(card);
    }
    return cards;
}