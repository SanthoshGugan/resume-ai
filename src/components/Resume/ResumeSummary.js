import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const ResumeSummary = ({ resumeSummary, resumeDimensions: cards = [] }) => {

    if (cards.length === 0) return <></>;

    // const { cards = [] } = jdDimensions;
    // console.log(`cards ::: ${JSON.stringify(cards)}`)

    const renderListItem  = (heading, items) => {
        return (
            <Container>
                <div>{heading}</div>
                <ul>
                    {items.map(item => <li>{item.name}</li>)}
                </ul>
            </Container>
        )
    };

    const renderItem = (item) => {
        console.log(`Item :::: ${JSON.stringify(item)}`);
        const { type, items, heading } = item;

        if (type === "List") {
            return renderListItem(heading, items);
        }
        return (<></>);
    };

    const renderCard = (card) => {
        const { name, content } = card;
        return (
            <Col md={3}>
                    <Card  className="p-3 d-flex justify-content-center">
                        <Card.Title>{name}</Card.Title>
                        <Card.Body>
                            {content.map((item) => renderItem(item))}
                        </Card.Body>
                    </Card>
            </Col>
        );
    };

    return (
        <Container>
            <div className="m-4">JD</div>
            <Row className="d-flex justify-content-start">
                {cards.map(card => renderCard(card))}
            </Row>
        </Container>
    );
};

export default ResumeSummary;