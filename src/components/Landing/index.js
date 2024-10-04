import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Carousel, Image, Card } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    // Style for WhatsApp-style message bubble
    const leftBubbleStyle = {
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light white/grey with transparency
        padding: '15px 20px',
        borderRadius: '20px',
        color: '#333', // Dark grey text for visibility
        fontWeight: '600', // Semi-bold text similar to ConversionLab
        fontSize: '1.1rem', // Slightly larger font size for readability
        maxWidth: '250px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Softer shadow for a modern look
        display: 'flex',
        alignItems: 'center',
    };

    // Style for notification-style overlay
    const rightNotificationStyle = {
        position: 'absolute',
        top: '20%',
        right: '-10%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 15px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1rem',
        maxWidth: '200px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#333', // Dark grey text for visibility
        fontWeight: '600', // Semi-bold text similar to ConversionLab
        fontSize: '1.1rem', // Slightly larger font size for readability
        maxWidth: '250px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Softer shadow for a modern look
        display: 'flex',
        alignItems: 'center',
    };

    const callToAction = () => {
        navigate(`/`);
    }

    const signUp = () => {
        navigate('/login');
    };


    const renderBanner = () => {
        return (
            <Container fluid className="d-flex align-items-start justify-content-center bg-light position-relative pt-2" style={{ minHeight: '60vh', backgroundImage: 'url("./background-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Row className="w-100 d-flex align-items-start justify-content-center">
                    {/* Left Side - One Liner and Call to Action Button */}
                    <Col md={4} className="d-flex flex-column justify-content-end align-items-center " style={{ paddingTop: '4rem' }}>
                        <div className="text-center text-md-start">
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>Save time, hire smarter with AI-powered resume sorting</h1>
                            <p className="lead" style={{ fontSize: '1.5rem' }}>Instantly match top talent with job requirements and streamline your recruitment process</p>
                            <div className='d-flex justify-content-center flex-column' style={{ minHeight: '10rem' }}>
                                <Button size="lg" onClick={callToAction} className="mt-3" style={{ fontSize: '1.2rem', borderRadius: '2rem', padding: '1rem', width: '20rem', fontWeight: 'bolder' }}>Get Sorted!</Button>
                                <span className='d-flex' style={{ paddingLeft: '4.5rem', fontSize: '0.75rem' }}>No credit card needed, its free!</span>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side - Image */}
                    <Col md={4} className="position-relative d-none d-md-flex justify-content-center align-items-center">
                        <Image
                            src="./banner_bg.png"
                            alt="Illustration showing someone sorting resumes"
                            className="img-fluid"
                            style={{ maxHeight: '35rem' }}
                        />

                        {/* Left bottom overlay (WhatsApp message bubble style) */}
                        <Row style={leftBubbleStyle}>
                            <Col md={10} style={{ padding: 0, textAlign: 'center' }}>
                                Cut resume filtering by 50%
                            </Col>
                            <Col md={2} style={{ fontSize: '3rem', padding: 0 }}>
                                &#x23F1;
                            </Col>
                        </Row>

                        {/* Right center overlay (notification text style) */}
                        <div style={rightNotificationStyle}>
                            <Col md={3} style={{ fontSize: '3rem', padding: 0 }}>
                                &#x1F4CA;
                            </Col>
                            <Col md={9} style={{ padding: 0, textAlign: 'center' }}>
                                Instantly compare 100s of resumes
                            </Col>
                        </div>
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
                            alt="Sort My Resumes"
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
                {/* First feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Accurate Matching</h4>
                        <p>Matches resumes with job descriptions using advanced AI algorithms.</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem'}}>
                        <Image src='./robo_resume_bg.png' width="200px" height="200px" />
                    </Col>
                </Row>

                {/* Second feature: Flip - Icon on left, text on right */}
                <Row className="align-items-center mb-5 flex-row-reverse">
                    <Col md={6}>
                        <h4>Fast & Efficient</h4>
                        <p>Get ranked resumes instantly without manual filtering.</p>
                    </Col>
                    <Col md={6} className="text-center">
                        <Image src='./ranking_bg.png' width="200px" height="200px" />
                    </Col>
                </Row>

                {/* Third feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Secure & Reliable</h4>
                        <p>Your data is securely processed and handled with care.</p>
                    </Col>

                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem'}}>
                    <Image src='./secure_bg.png' width="200px" height="200px" />
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
                            <p>© 2024 Sort My Resumes - All Rights Reserved</p>
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