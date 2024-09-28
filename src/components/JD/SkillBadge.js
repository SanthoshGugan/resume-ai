import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const SkillBadge = ({ category, tooltipText, label, onRemove }) => {
  // Define colors for categories
  const categoryColors = ["#007bff", "#28a745",  "#dc3545", "#ffc107"];

  return (
    <Badge
      bg={categoryColors[category] || "green"} // Default to light if category not found
      className="d-flex align-items-center"
      style={{ padding: "5px", marginRight: "10px", color: "#fff", fontSize: '16px' }} // Adjust padding
    >
      {/* Label Text */}
      <span style={{ marginRight: "10px" }}>{label}</span>

      {/* Right Side Close Button */}
      <FaTimes
        style={{
          marginLeft: "5px",
          cursor: "pointer",
          transition: "font-weight 0.2s",
        }}
        onClick={onRemove}
        onMouseOver={(e) => (e.currentTarget.style.fontWeight = "bold")}
        onMouseOut={(e) => (e.currentTarget.style.fontWeight = "normal")}
      />
    </Badge>
  );
};

export default SkillBadge;