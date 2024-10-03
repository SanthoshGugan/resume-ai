import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Carousel, Image, Card } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    
    const callToAction = () => {
        navigate(`/`);
    }

    const signUp = () => {
        navigate('/login');
    };

    const renderBanner = () => {
        return (
            <Container fluid className="d-flex align-items-center justify-content-between p-5 bg-light" style={{ minHeight: '30rem' }}>
                <Row className="w-100">
                    {/* Left Side - One Liner and Call to Action Button */}
                    <Col md={6} className="d-flex flex-column justify-content-center">
                        <div>
                            <h1>AI-Powered Resume Filtering for Your Needs</h1>
                            <p className="lead">Find the perfect candidate in seconds using our smart filtering system.</p>
                            <Button variant="success" size="lg" onClick={callToAction}>Launch App</Button>
                        </div>
                    </Col>

                    {/* Right Side - GIF or Illustration */}
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <Image
                            src="./banner.png"
                            alt="Illustration showing someone sorting resumes"
                            className="img-fluid"
                            style={{ maxHeight: '25rem' }}
                        />
                    </Col>
                </Row>
            </Container>
        );
    };

    const renderHeader = () => {
        return (
            <Navbar bg="light" expand="lg" className="shadow-sm sticky-top">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src="./logo_blue.png"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Selectly Resumes"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            {/* Subscribe Button */}
                            <Form className="d-none d-lg-block me-3">
                                <Button variant="outline-primary" className="px-4">
                                    Subscribe
                                </Button>
                            </Form>
    
                            {/* Sign Up Button */}
                            <Button variant="primary" onClick={signUp} className="px-4">
                                Sign Up
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    };

    const renderTestimonials = () => {
        return (
            <Container className="my-5">
                <h2 className="text-center mb-4">What Our Clients Say</h2>
                <Carousel indicators={false} interval={3000} controls={false} pause={false}>
                    <Carousel.Item>
                        <Card className="text-center p-4 border-0">
                            <Card.Body>
                                <p className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    "This tool saved us countless hours in screening resumes!"
                                </p>
                                <em>- Hiring Manager at TechCorp</em>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card className="text-center p-4 border-0">
                            <Card.Body>
                                <p className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    "Superb AI filtering system. Helped us find the best candidates."
                                </p>
                                <em>- HR Specialist at SoftWorks</em>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card className="text-center p-4 border-0">
                            <Card.Body>
                                <p className="mb-4" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    "I love how easy it is to use this resume filtering app."
                                </p>
                                <em>- Recruiter at FastHire</em>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                </Carousel>
            </Container>
        );
    };

    return (
        <div>
            {/* Header Section */}
            {renderHeader()}

            {/* Banner Section */}
            {renderBanner()}

            {/* Features Section */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Features</h2>
                <Row>
                    <Col md={4} className="text-center">
                        <i className="bi bi-bar-chart-fill" style={{ fontSize: '2rem' }}></i>
                        <h4>Accurate Matching</h4>
                        <p>Matches resumes with job descriptions using advanced AI algorithms.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <i className="bi bi-lightning-charge" style={{ fontSize: '2rem' }}></i>
                        <h4>Fast & Efficient</h4>
                        <p>Get ranked resumes instantly without manual filtering.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <i className="bi bi-shield-lock" style={{ fontSize: '2rem' }}></i>
                        <h4>Secure & Reliable</h4>
                        <p>Your data is securely processed and handled with care.</p>
                    </Col>
                </Row>
            </Container>

            {/* Testimonials Section */}
            {renderTestimonials()}

            {/* Footer Section */}
            <footer className="bg-dark text-light py-4">
                <Container>
                    <Row>
                        <Col md={6}>
                            <p>© 2024 Selectly Resumes - All Rights Reserved</p>
                            <p><a href="#privacy" className="text-light">Privacy Policy</a></p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <a href="#contact" className="text-light me-3">Contact Us</a>
                            <a href="#facebook" className="text-white">
                                <FaFacebook />
                            </a>
                            <a href="#twitter" className="text-light ms-3">
                                <FaTwitter />
                            </a>
                            <a href="#linkedin" className="text-light ms-3">
                                <FaLinkedin />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default LandingPage;