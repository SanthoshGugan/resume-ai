import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

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

    if (!summary) return <></>;
    return (
        <Container>
            <h2 className="m-4">Resume JD Match Summary</h2>
            <Row className="d-flex justify-content-center">
                <Col md={5}>
                    {renderTopResume()}
                </Col>
                <Col md={5}>
                    {renderTopListResume()}
                </Col>
                <Col md={4}>
                    {renderLabel()}
                </Col>
            </Row>
        </Container>
    );
};

export default MatchSummary;