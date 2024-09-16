import React from "react";
import { Container, ProgressBar } from "react-bootstrap";

const getProgressBarVariant = (value) => {
    if (value >= 75) return 'gold';
    if (value >= 50) return 'warning';
    return 'danger';
};

const SkillPercentCell = ({ value }) => {
    if (value === 0) {
        return <Container>0%</Container>
    }

    return ( 
        <ProgressBar
            now={value}
            label={`${value}%`}
            variant={getProgressBarVariant(value)}
    />
    );
};

export default SkillPercentCell;