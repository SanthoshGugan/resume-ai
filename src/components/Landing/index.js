import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Carousel, Image } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    
    const callToAction = () => {
        navigate(`/`);
    }

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
    return (
        <div>
            {/* Header Section */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src="./logo_blue.png"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Selectly Resumes"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex" style={{ gap: '10px' }}>
                            <Form className="d-flex">
                                {/* <Form.Control type="email" placeholder="Subscribe" className="me-2" /> */}
                                <Button variant="outline-primary">Subscribe</Button>
                            </Form>
                            {/* <Nav.Link href="#login">Login</Nav.Link> */}
                            <Button variant="primary" href="#signup">Sign Up</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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
            <Container className="my-5">
                <h2 className="text-center mb-4">Testimonials</h2>
                <Carousel>
                    <Carousel.Item>
                        <p>"This tool saved us countless hours in screening resumes!"</p>
                        <em>- Hiring Manager at TechCorp</em>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p>"Superb AI filtering system. Helped us find the best candidates."</p>
                        <em>- HR Specialist at SoftWorks</em>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p>"I love how easy it is to use this resume filtering app."</p>
                        <em>- Recruiter at FastHire</em>
                    </Carousel.Item>
                </Carousel>
            </Container>

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