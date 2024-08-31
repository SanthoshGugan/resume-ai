import React from 'react';
import { Card } from 'react-bootstrap';
import './SkillsList.css';

const getBoxColorVariant = (tickCount, totalCount) => {
  const percentage = (tickCount / totalCount) * 100;
  if (percentage >= 75) return 'rgba(255, 223, 0, 0.5)'; // Golden translucent
  if (percentage >= 50) return 'rgba(240, 128, 128, 0.5)'; // Light coral translucent
  return 'rgba(255, 228, 225, 0.5)'; // Misty rose translucent
};

const SkillsList = ({ skills, category }) => {
  const totalCount = skills.length;
  const tickCount = skills.filter(skill => skill.inResume).length;
  const boxColor = getBoxColorVariant(tickCount, totalCount);

  return (
    <Card className="skills-bubble" style={{ backgroundColor: boxColor, margin: '10px', padding: '10px', borderRadius: '20px', position: 'relative', height: '200px', width: '200px' }}>
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{category}</Card.Title>
        <div className="bubble-container">
          {skills.map((skill, i) => (
            <div key={i} className="skill-badge" style={{ backgroundColor: skill.inResume ? '#28a745' : '#dc3545' }}>
              {skill.name} {skill.inResume ? '✔️' : '❌'}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SkillsList;