import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Answers = ({
    children,
    colW = 8
}) => {

    if (!children) return <></>

    return (
        <Row className="d-flex justify-content-end mx-2 mb-5">
                <Col md={colW}>
                    <Card>
                        <Card.Body>
                                    {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    );
};

export default Answers;