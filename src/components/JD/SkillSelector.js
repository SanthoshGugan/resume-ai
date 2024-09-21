import React, { useState } from "react";
import { Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobalSkills } from "../../store/selectors/jdSkillSelector";
import { addSkill } from "../../store/jobDescriptionSlice";

const SkillSelector = () => {
    const dispatch = useDispatch();
    const skillList = useSelector(state => selectGlobalSkills(state)) || [];
    // console.log(`skillList ::: ${JSON.stringify(skillList)}`);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkills, setFilteredSkills] = useState(skillList);
    const [selectedSkill, setSelectedSkill] = useState(null);

    // Update search term and filter skills accordingly
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = skillList
                .filter((skill) => skill?.skill.toLowerCase().includes(term.toLowerCase()))
                .slice(0, 8); // Limit to 8 results
            setFilteredSkills(filtered);
        } else {
            setFilteredSkills([]);
        }
    };


    // Handle skill selection
    const handleSelectSkill = (skill) => {
        // const { skill: name, categoryName } = skill;
        setSelectedSkill(skill);
        // onSelectSkill(skill); // Call parent function with selected skill
        dispatch(addSkill(skill))
    };

    return (
        <div style={{ position: "relative", width: "300px" }}>
        <Form.Group controlId="skillSearch">
            <Form.Label>Search for a skill:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter skill..."
                value={searchTerm}
                onChange={handleSearch}
                autoComplete="off"
            />
        </Form.Group>

        {filteredSkills.length > 0 && (
            <Dropdown.Menu show style={{ position: "absolute", top: "100%", left: 0, width: "100%", zIndex: 1 }}>
                {filteredSkills.map((skill, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => handleSelectSkill(skill)}
                    >
                        {skill?.skill}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        )}
    </div>
    );
};

export default SkillSelector;