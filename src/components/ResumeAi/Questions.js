import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Questions = ({
    children
}) => {

    if (!children) return <></>;

    return (
        <Row className="d-flex justify-content-start mx-2 mb-5">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                                    {children}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    );
};

export default Questions;