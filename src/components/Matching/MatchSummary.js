import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ResumeTable from "../match-list/ResumeTable";
import PromptActions from "../match-list/PromptActions";

const resumes = [
    {
      name: 'John Doe',
      domain: 'fullstack',
      frontEnd: 80,
      backEnd: 70,
      companies: ['Infosys', 'Capgemini', 'Tekion'],
      yoe: 10,
      location: 'Chennai',
      phone: '123-456-7890',
      email: 'john@example.com',
      frontEndSkills: [
        { name: 'React', inResume: true },
        { name: 'Vue', inResume: true },
        { name: 'Angular', inResume: true },
        { name: 'Ember', inResume: false }
      ],
      backEndSkills: [
        { name: 'Node.js', inResume: true },
        { name: 'Django', inResume: false },
        { name: 'Spring', inResume: true }
      ],
      details: 'John has 5 years of experience in full stack development...'
    },
    {
      name: 'Jane Smith',
      domain: 'frontend',
      frontEnd: 90,
      backEnd: 40,
      companies: ['Google', 'Facebook'],
      yoe: 8,
      location: 'Bangalore',
      phone: '987-654-3210',
      email: 'jane@example.com',
      frontEndSkills: [
        { name: 'React', inResume: true },
        { name: 'Vue', inResume: true },
        { name: 'Angular', inResume: false }
      ],
      backEndSkills: [
        { name: 'Node.js', inResume: false },
        { name: 'Django', inResume: false },
        { name: 'Spring', inResume: false }
      ],
      details: 'Jane specializes in front end development with a strong focus on UX/UI...'
    },
    // Add more resume objects here
  ];

const MatchSummary = ({ summary }) => {

    const { topResume, topListResume, groupByLabels } = summary || {}; 

    const renderTopResume = () => {
        const {sentence, matchPercent} = topResume;
        return (
            <Card  className="p-3 d-flex justify-content-center">
                <Card.Title>Top Resume</Card.Title>
                <Card.Body>
                    <div>{sentence}</div>
                    <div>{matchPercent}</div>
                </Card.Body>
            </Card>
        );
    }

    const renderList = (list) => {
        return (
            <ul>
                {list.map(({ resume_id, matchPercent }) => <li>{resume_id} matches {matchPercent} %</li> )}
            </ul>
        )
    }
    const renderTopListResume = () => {
        const {sentence, list} = topListResume;
        return (
            <Card  className="p-3 d-flex justify-content-center">
                <Card.Title>Top List</Card.Title>
                <Card.Body>
                    <div>{sentence}</div>
                    <div>{renderList(list)}</div>
                </Card.Body>
            </Card>
        );
    };

    const renderLabelItem = (label, list) => {
        return (
            <Card>
                <Card.Title>{label}</Card.Title>
                <Card.Body>
                    <ul>
                        {list.map(resume_id => <li>{resume_id}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        );
    }
    const renderLabel = () => {

        const labels = Object.keys(groupByLabels);
        return <Card>
            {labels.map(item => renderLabelItem(item, groupByLabels[item]))}
        </Card>
    }

    // if (!summary) return <></>;
    return (
        <Container>
            <h2 className="m-4">Resume JD Match Summary</h2>
            {/* <Row className="d-flex justify-content-center">
                <Col md={5}>
                    {renderTopResume()}
                </Col>
                <Col md={5}>
                    {renderTopListResume()}
                </Col>
                <Col md={4}>
                    {renderLabel()}
                </Col>
            </Row> */}
            <Row>
                <ResumeTable resumes={resumes} />
            </Row>
        </Container>
    );
};

export default MatchSummary;