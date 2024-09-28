import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectSkillsCategories } from "../../store/selectors/jdSkillSelector";
const categoryColors = [
  "#D1E7DD", // Soft Green
  "#F8D7DA", // Soft Red
  "#D6E9F3", // Soft Blue
  "#E2E3E5", // Light Gray
  "#FFF3CD", // Soft Yellow
  "#D1C4E9", // Soft Lavender
  "#B2EBF2", // Light Cyan
  "#E8CFC2", // Soft Peach
];

const SkillBadge = ({ category, tooltipText, label, onRemove }) => {
  
  const categories = useSelector(state => selectSkillsCategories(state));
  const colorIndex = categories.indexOf(category) > -1 ? categories.indexOf(category) : 4;
  const categoryColor = categoryColors[colorIndex];
  console.log(`categories : ${JSON.stringify(categories)}, ${category}, ${categoryColor}`);

  return (
    <div
      className="d-flex align-items-center"
      style={{
        padding: "10px",
        marginRight: "10px",
        fontSize: "16px",
        backgroundColor: categoryColor,
        borderRadius: "12px", // Optional: gives a rounded effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Label Text */}
      <span style={{ }}>{label}</span>

      {/* Right Side Close Button */}
      <OverlayTrigger placement="top" overlay={<Tooltip>{tooltipText}</Tooltip>}>
        <FaTimes
          style={{
            marginLeft: "5px",
            marginTop: "2px",
            cursor: "pointer",
            transition: "font-weight 0.2s",
          }}
          onClick={() => onRemove({ skill: label })}
          onMouseOver={(e) => (e.currentTarget.style.fontWeight = "bold")}
          onMouseOut={(e) => (e.currentTarget.style.fontWeight = "normal")}
        />
      </OverlayTrigger>
    </div>
  );
};

export default SkillBadge;