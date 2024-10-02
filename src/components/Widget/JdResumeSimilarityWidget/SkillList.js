import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './SkillsList.css';

const getBoxColorVariant = (tickCount, totalCount) => {
  const percentage = (tickCount / totalCount) * 100;
  if (percentage >= 75) return 'rgba(255, 223, 0, 0.5)'; // Golden translucent
  if (percentage >= 50) return 'rgba(240, 128, 128, 0.5)'; // Light coral translucent
  return 'rgba(255, 228, 225, 0.2)'; // Misty rose translucent
};

const SkillsList = ({ jdSkills = [], category, resumeSkills, label }) => {
  const resumeSkillsSet = new Set([...resumeSkills]);

  return (
    <Card className="skills-bubble" style={{ margin: '10px', padding: '2px 10px', borderRadius: '20px', minHeight: '2rem', minWidth: '5rem' }}>
      <Card.Body>
        <Row>
          {/* Left Section for Title and Subtitle */}
          <Col xs={12} md={3} className="d-flex flex-column align-items-center justify-content-center">
            <Card.Title style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{label}</Card.Title>
            {/* <Card.Subtitle style={{ fontSize: '0.9rem', color: 'gray' }}>Skill Category</Card.Subtitle> */}
          </Col>

          {/* Right Section for Skills */}
          <Col xs={12} md={9}>
            <div className="bubble-container d-flex flex-wrap">
              {jdSkills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-badge"
                  style={{
                    backgroundColor: resumeSkillsSet.has(skill) ? '#ccffcc' : '#ffcccc',
                    padding: '5px 10px',
                    borderRadius: '15px',
                    margin: '5px'
                  }}
                >
                  {skill} {resumeSkillsSet.has(skill) ? '✔️' : '❌'}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SkillsList;