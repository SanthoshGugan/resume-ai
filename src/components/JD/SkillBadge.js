import React, { useState } from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const SkillBadge = ({ category, tooltipText, label, onRemove }) => {
  return (
    <Badge
      pill
      bg="primary"
      className="d-flex align-items-center"
      style={{ padding: "10px", marginRight: "10px" }}
    >
      {/* Left Side Category Avatar */}
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{tooltipText}</Tooltip>}
      >
        <span
          style={{
            backgroundColor: "#f8f9fa",
            color: "#007bff",
            borderRadius: "50%",
            padding: "5px",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {category}
        </span>
      </OverlayTrigger>

      {/* Label Text */}
      <span>{label}</span>

      {/* Right Side Close Button */}
      <FaTimes
        style={{ marginLeft: "10px", cursor: "pointer" }}
        onClick={onRemove}
      />
    </Badge>
  );
};

export default SkillBadge;