import React, { useState, useRef } from "react";
import { Form, Dropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobalSkills, selectSkillsFromAllCategory } from "../../store/selectors/jdSkillSelector";
import { addSkill, removeSkill } from "../../store/jobDescriptionSlice";
import SkillBadge from "./SkillBadge";

const dropdownMenuStyles = {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: 1,
};

const notFoundStyles = {
    padding: "8px 16px",
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
};

const SkillSelector = () => {
    const dispatch = useDispatch();
    const skillList = useSelector((state) => selectGlobalSkills(state)) || [];
    const skills = useSelector((state) => selectSkillsFromAllCategory(state, ""));
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const inputRef = useRef(null); // Reference for the input field

    // Update search term and filter skills accordingly
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = skillList
                .filter((skill) => skill?.skill.toLowerCase().includes(term.toLowerCase()))
                .slice(0, 8); // Limit to 8 results
            setFilteredSkills(filtered);
            setIsDropdownOpen(true); // Open the dropdown
        } else {
            setFilteredSkills([]);
            setIsDropdownOpen(false); // Close the dropdown if search is empty
        }
    };

    // Handle skill selection
    const handleSelectSkill = (skill) => {
        dispatch(addSkill(skill));
        setIsDropdownOpen(false); // Close the dropdown after selection
        setSearchTerm(skill.skill); // Update input to show selected skill
        inputRef.current.value = ""; // Reset the input field
        setSearchTerm(""); // Reset the state variable as well
    };

    // Handle key events like Enter and Esc
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setIsDropdownOpen(false); // Close dropdown on Esc
            inputRef.current.blur(); // Deselect the input field
        } else if (e.key === "Enter" && filteredSkills.length > 0) {
            handleSelectSkill(filteredSkills[0]); // Select first skill on Enter
        }
    };

    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center" style={{ width: '80%', padding: 0, margin: '0 2rem' }}>
                <div style={{ fontWeight: 'bolder', marginRight: '1rem', flex: '10% 0' }}>Add Skills</div>
                <div style={{ flex: '1 1' }}>
                    <Dropdown autoClose="outside" show={isDropdownOpen}>
                        <Form.Group controlId="skillSearch" style={{ position: "relative" }}>
                            <Form.Control
                                ref={inputRef}
                                type="text"
                                placeholder="Search for a skill..."
                                value={searchTerm}
                                onChange={handleSearch}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                            />
                        </Form.Group>

                        {/* Dropdown Menu */}
                        <Dropdown.Menu
                            show={isDropdownOpen && filteredSkills.length >= 0}
                            style={dropdownMenuStyles}
                        >
                            {filteredSkills.length > 0 ? (
                                filteredSkills.map((skill, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ensure click propagates correctly
                                            handleSelectSkill(skill);
                                        }}
                                    >
                                        {skill?.skill}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <div style={notFoundStyles}>
                                    No matching skills found. Please type a new skill.
                                </div>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </Container>

            <Container className="d-flex flex-wrap" style={{ gap: "10px", margin: '1rem' }}>
                {skills.map((item, idx) => (
                    <SkillBadge
                        key={idx}
                        category={item.categoryId}
                        tooltipText={item?.categoryName}
                        label={item?.skill}
                        onRemove={(e) => dispatch(removeSkill({ skill: item.skill, categoryName: item.categoryName }))} // Add remove functionality if needed
                    />
                ))}
            </Container>
        </div>
    );
};

export default SkillSelector;