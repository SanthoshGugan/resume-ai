import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const MatchSummary = ({ summary }) => {

    return (
        <Container>
            <div className="m-4">JD</div>
            <Row className="d-flex justify-content-center">
                <Col md={9}>
                    <Card  className="p-3 d-flex justify-content-center">
                        <Card.Title>Resume JD Match Summary</Card.Title>
                        <Card.Body>
                            <div>{summary && JSON.stringify(summary)}</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MatchSummary;