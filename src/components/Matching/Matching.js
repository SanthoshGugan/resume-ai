import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useMatching from "../../hooks/useMatching";


const Matching = ({ jd_key }) => {

    const { 
        triggerMatching
    } = useMatching({});

    if (!jd_key) return <></>;

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    <Button onClick={() => triggerMatching({ jd_key })}>Match</Button>
                </Col>
            </Row>

        </Container>
    );
};

export default Matching;