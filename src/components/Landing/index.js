import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Landing = ({}) => {

    const renderHeader = () => {
        return (
            <Row>
                <Col md={1}>Side Nav</Col>
                <Col md={5}>Logo</Col>
                <Col md="auto">Actions</Col>
            </Row>
        );
    };

    const renderBanner = () => {
        return (
            <Row>
                <Col md={10} className="d-flex justify-content-center">
                    <Container style={{ 'minHeight': '300px'}} className="d-flex align-items-center justify-content-center">
                        BANNER
                    </Container>
                </Col>
            </Row>
        );
    }

    const renderFeatures = () => {
        return (
            <Row>Features</Row>
        )
    };

    const renderDemo = () => {
        return (
            <Row>Demo</Row>
        )
    };

    const renderContactUs = () => {
        return (
            <Row>Contact Us</Row>
        );
    };
    return (
        <Container>
            {renderHeader()}
            {renderBanner()}
            {renderFeatures()}
            {renderDemo()}
            {renderContactUs()}
        </Container>
    );
};

export default Landing;