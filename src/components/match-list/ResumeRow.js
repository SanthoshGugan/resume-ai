import React from 'react';
import { Badge, ProgressBar, Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import ResumeCardSummary from './ResumeCardSummary';
import SkillsList from './SkillList';

const domainColors = {
    fullstack: 'primary',
    frontend: 'success',
    backend: 'warning',
};

const getProgressBarVariant = (value) => {
    if (value >= 75) return 'gold';
    if (value >= 50) return 'warning';
    return 'danger';
};

const ResumeRow = ({ resume, index, openIndex, toggleRow }) => {
    const isOpen = openIndex === index;

    return (
        <>
            <tr onClick={() => toggleRow(index)}>
                <td>
                    {resume.name} <Badge bg={domainColors[resume.domain]}>{resume.domain}</Badge>
                </td>
                <td>
                    <ProgressBar
                        now={resume.frontEnd}
                        label={`${resume.frontEnd}%`}
                        variant={getProgressBarVariant(resume.frontEnd)}
                    />
                </td>
                <td>
                    <ProgressBar
                        now={resume.backEnd}
                        label={`${resume.backEnd}%`}
                        variant={getProgressBarVariant(resume.backEnd)}
                    />
                </td>
            </tr>
            {(isOpen) && (
                <tr>
                    <td colSpan="3">
                        <Card>
                            <Card.Header>
                                Details
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <ResumeCardSummary
                                            companies={resume.companies}
                                            yoe={resume.yoe}
                                            location={resume.location}
                                            phone={resume.phone}
                                            email={resume.email}
                                        />
                                    </Col>
                                    <Col md={6} className="d-flex flex-wrap align-items-start">
                                        <SkillsList skills={resume.frontEndSkills} category="Front End Skills" />
                                        <SkillsList skills={resume.backEndSkills} category="Back End Skills" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ResumeRow;