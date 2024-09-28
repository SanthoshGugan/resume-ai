import React, { useState, useRef } from "react";
import { Form, Dropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobalSkills, selectSkillsFromAllCategory } from "../../store/selectors/jdSkillSelector";
import { addSkill } from "../../store/jobDescriptionSlice";
import SkillBadge from "./SkillBadge";

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
                    show={isDropdownOpen && filteredSkills.length > 0}
                    style={{ position: "absolute", top: "100%", left: 0, width: "100%", zIndex: 1 }}
                >
                    {filteredSkills.map((skill, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation(); // Ensure click propagates correctly
                                handleSelectSkill(skill);
                            }}
                        >
                            {skill?.skill}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Container className="d-flex flex-wrap" style={{ gap: "10px", margin: '1rem' }}>
                {skills.map((item, idx) => (
                    <SkillBadge
                        key={idx}
                        category={item.categoryName} // Use category name for background color
                        tooltipText={item?.categoryName}
                        label={item?.skill}
                        onRemove={(e) => { }} // Add remove functionality if needed
                    />
                ))}
            </Container>

            {/* Legend for Color Codes */}
            <div style={{ marginTop: "20px", fontSize: "14px", display: 'flex' }}>
                <div>
                    <span style={{ backgroundColor: "#007bff", padding: "3px 8px", borderRadius: "3px", color: "#fff", marginRight: "5px" }}></span>
                    Category 1
                </div>
                <div>
                    <span style={{ backgroundColor: "#28a745", padding: "3px 8px", borderRadius: "3px", color: "#fff", marginRight: "5px" }}></span>
                    Category 2
                </div>
                <div>
                    <span style={{ backgroundColor: "#dc3545", padding: "3px 8px", borderRadius: "3px", color: "#fff", marginRight: "5px" }}></span>
                    Category 3
                </div>
                <div>
                    <span style={{ backgroundColor: "#ffc107", padding: "3px 8px", borderRadius: "3px", color: "#fff", marginRight: "5px" }}></span>
                    Category 4
                </div>
            </div>
        </div>
    );
};

export default SkillSelector;