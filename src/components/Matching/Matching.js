import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useMatching from "../../hooks/useMatching";
import useLongPollMatchingSummary from "../../hooks/useLongPollMatchingSummary";


const Matching = ({ jd_key }) => {

    const { 
        triggerMatching
    } = useMatching({});

    const {
        fetchMatchingSummary,
        summary
    } = useLongPollMatchingSummary({ interval: 10000})

    const onTriggerClick = async ({ jd_key }) => {
        await triggerMatching({ jd_key });
        await fetchMatchingSummary({ jd_key });
    }

    if (!jd_key) return <></>;

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    <Button onClick={() => onTriggerClick({ jd_key })}>Match</Button>
                </Col>
            </Row>

        </Container>
    );
};

export default Matching;