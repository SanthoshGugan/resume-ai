import React from 'react';
import { Card, Button, Container, Row, Col, Navbar, Image, Nav } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Pricing.css'; // We'll add custom styles here

const PricingPlan = () => {
    const renderHeader = () => {
        return (
            <Navbar expand="lg" className="shadow-sm sticky-top" style={{ backgroundColor: "rgb(255 255 255)" }}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src="./logo5.png"
                            height="55"
                            width="189"
                            className="d-inline-block align-top"
                            alt="Sort My Resumes"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            <Button variant="primary" onClick={() => {}} className="px-4">
                                Sign Up
                            </Button>
                        </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
        );
    };
    return (
        <div>
            {renderHeader()}
            <Container className='my-5'>
                <h2 className="text-center mb-4">Our Pricing Plans</h2>
                <div className="banner-section text-center text-white py-5 my-5" style={{ backgroundColor: '#007bff' }}>
                    <h1 className="mb-3">Choose the Right Plan for You</h1>
                    <p className="lead mb-4">
                        Find the perfect plan that fits your team’s needs. Upgrade anytime with no hassle.
                    </p>
                    <Button variant="light" size="lg">Get Started</Button>
                </div>
                <Row>
                    {/* Free Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Free Plan</Card.Title>
                                <h3>$0 <small>/month</small></h3>
                                <Card.Text>For individuals just getting started</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> 1 Workspace</div>
                                    <div className="feature"><FaCheckCircle /> 100 Records</div>
                                    <div className="feature"><FaCheckCircle /> Basic Support</div>
                                    <div className="feature"><FaTimesCircle /> Advanced Features</div>
                                </div>
                                <Button variant="primary">Get Started</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Plus Plan with Popular Overlay */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center popular-plan">
                            <div className="popular-badge">Popular</div>
                            <Card.Body>
                                <Card.Title>Plus Plan</Card.Title>
                                <h3>$10 <small>/month</small></h3>
                                <Card.Text>For small teams and growing businesses</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> 5 Workspaces</div>
                                    <div className="feature"><FaCheckCircle /> 1,000 Records</div>
                                    <div className="feature"><FaCheckCircle /> Priority Support</div>
                                    <div className="feature"><FaCheckCircle /> Advanced Features</div>
                                </div>
                                <Button variant="primary">Choose Plan</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Premium Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Premium Plan</Card.Title>
                                <h3>$30 <small>/month</small></h3>
                                <Card.Text>For large teams and enterprises</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Unlimited Workspaces</div>
                                    <div className="feature"><FaCheckCircle /> Unlimited Records</div>
                                    <div className="feature"><FaCheckCircle /> 24/7 Support</div>
                                    <div className="feature"><FaCheckCircle /> All Features Included</div>
                                </div>
                                <Button variant="primary">Choose Plan</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PricingPlan;