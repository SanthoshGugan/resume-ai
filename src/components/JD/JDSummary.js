import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const JDSummary = ({ jd }) => {

    return (
        <Container>
            <div className="m-4">JD</div>
            <Row className="d-flex justify-content-center">
                <Col md={3}>
                    <Card  className="p-3 d-flex justify-content-center">
                        <Card.Title>Job Details</Card.Title>
                        <Card.Body>
                            <ul>
                                <li>Experience : 2+ years</li>
                                <li>Contract Type: Full type</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card  className="p-3 d-flex justify-content-center">
                        <Card.Title>Front End</Card.Title>
                        <Card.Body>
                            <ul>
                                <li>React</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card  className="p-3">
                        <Card.Title>Backend End</Card.Title>
                        <Card.Body>
                            <ul>
                                <li>Java</li>
                                <li>NodeJs</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card  className="p-3">
                        <Card.Title>Dev Ops</Card.Title>
                        <Card.Body>
                            <ul>
                                <li>Jenkins</li>
                                <li>Kubernetes</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default JDSummary;