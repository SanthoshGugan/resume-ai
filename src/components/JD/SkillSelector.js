import React, { useState, useEffect, useRef } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobalSkills } from "../../store/selectors/jdSkillSelector";
import { addSkill } from "../../store/jobDescriptionSlice";

const SkillSelector = () => {
    const dispatch = useDispatch();
    const skillList = useSelector(state => selectGlobalSkills(state)) || [];
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
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
        setSelectedSkill(skill);
        dispatch(addSkill(skill));
        console.log(`skill : ${JSON.stringify(skill)}`);
        setIsDropdownOpen(false); // Close the dropdown after selection
        setSearchTerm(skill.skill); // Update input to show selected skill
        inputRef.current.value = "";  // Reset the input field
        setSearchTerm("");  // Reset the state variable as well, if needed
    };

    // Handle key events like Enter and Esc
    const handleKeyDown = (e) => {
        console.log(`hanfling hey ::::: ${e.key}`);
        if (e.key === "Escape") {
            setIsDropdownOpen(false); // Close dropdown on Esc
            inputRef.current.blur(); // Deselect the input field
        } else if (e.key === "Enter" && filteredSkills.length > 0) {
            handleSelectSkill(filteredSkills[0]); // Select first skill on Enter
        }
    };

    // Close the dropdown if the user clicks outside the component
    // const handleClickOutside = (event) => {
    //     if (inputRef.current && !inputRef.current.contains(event.target)) {
    //         setIsDropdownOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    return (
        <div style={{ position: "relative", width: "300px" }}>
            <Dropdown autoClose="outside" show={isDropdownOpen}>
                <Form.Group controlId="skillSearch">
                    <Form.Label>Search for a skill:</Form.Label>
                    <Form.Control
                        ref={inputRef}
                        type="text"
                        placeholder="Enter skill..."
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                </Form.Group>

                {/* Dropdown Menu */}
                <Dropdown.Menu show={isDropdownOpen && filteredSkills.length > 0} style={{ position: "absolute", top: "100%", left: 0, width: "100%", zIndex: 1 }}>
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
        </div>
    );
};

export default SkillSelector;