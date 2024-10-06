// Import React and dependencies
import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Carousel, Image, Card } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaBolt, FaHourglassHalf } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userIdSelector } from '../../store/selectors/userSelector';
import UserProfile from '../UserProfile/UserProfile';

const LandingPage = () => {

    const navigate = useNavigate();

    const userId = useSelector(state => userIdSelector(state));

    // Style for WhatsApp-style message bubble
    const leftBubbleStyle = {
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '15px 20px',
        borderRadius: '20px',
        color: '#333',
        fontWeight: '600',
        fontSize: '1.1rem',
        maxWidth: '250px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
        color: '#333',
        fontWeight: '600',
        fontSize: '1.1rem',
        maxWidth: '250px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
    };

    const callToAction = () => {
        navigate(`/`);
    }

    const signUp = () => {
        navigate('/login');
    };


    const renderLoginLogout = () => {

        if (userId) {

            return (
                <Col md={2} className="d-flex justify-content-center align-items-end">
                    <UserProfile />
                </Col>
            );
        }

        return (
            <Col md={2}>
                <Button>
                    <Link
                        to="/login"
                        style={{ color: "white", fontSize: "1rem", textDecoration: "none" }}>
                        Signup
                    </Link>
                </Button>
            </Col>
        );
    }

    // Add SEO Meta Tags
    React.useEffect(() => {
        document.title = "AI Resume Filtering and Hiring Software | Save Time and Hire Smarter";
        const metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = "Save time and hire the best talent with AI-powered resume sorting. Get accurate candidate matching and streamline your hiring process. No credit card needed, try it for free.";
        document.head.appendChild(metaDescription);

        const metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        metaKeywords.content = "AI resume filtering, resume sorting software, AI hiring tool, candidate matching, automated resume screening";
        document.head.appendChild(metaKeywords);

        return () => {
            document.head.removeChild(metaDescription);
            document.head.removeChild(metaKeywords);
        };
    }, []);

    const renderBanner = () => {
        return (
            <Container fluid className="d-flex align-items-start justify-content-center bg-light position-relative pt-2" style={{ minHeight: '60vh', backgroundImage: 'url("./background-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Row className="w-100 d-flex align-items-start justify-content-center">
                    {/* Left Side - One Liner and Call to Action Button */}
                    <Col md={4} className="d-flex flex-column justify-content-end align-items-center " style={{ paddingTop: '4rem' }}>
                        <div className="text-center text-md-start">
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>Save Time and Hire the Best Talent with AI-Powered Resume Sorting</h1>
                            <p className="lead" style={{ fontSize: '1.5rem' }}>Instantly match top talent with job requirements and streamline your recruitment process.</p>
                            <div className='d-flex justify-content-center flex-column' style={{ minHeight: '10rem' }}>
                                <Button size="lg" onClick={callToAction} className="mt-3" style={{ fontSize: '1.2rem', borderRadius: '2rem', padding: '1rem', width: '20rem', fontWeight: 'bolder' }}>Try AI Resume Sorting for Free Today</Button>
                                <span className='d-flex' style={{ paddingLeft: '4.5rem', fontSize: '0.75rem' }}>No credit card needed, it's free!</span>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side - Image */}
                    <Col md={4} className="position-relative d-none d-md-flex justify-content-center align-items-center">
                        <Image
                            src="./banner_bg.png"
                            alt="Illustration showing AI-powered resume sorting for better candidate matching"
                            className="img-fluid"
                            style={{ maxHeight: '35rem' }}
                        />

                        {/* Left bottom overlay (WhatsApp message bubble style) */}
                        <Row style={leftBubbleStyle}>
                            <Col md={2} style={{ fontSize: '3rem', padding: 0, justifyContent: 'space-between' }} className='d-flex align-items-center'>
                                <FaHourglassHalf size="2rem" color='gold'/>
                            </Col>
                            <Col md={10} style={{ padding: 0, textAlign: 'center' }}>
                                Cut resume filtering by 50%
                            </Col>
                        </Row>

                        {/* Right center overlay (notification text style) */}
                        <div style={rightNotificationStyle}>
                            <Col md={10} style={{ padding: 0, textAlign: 'center' }}>
                                Instantly compare 100s of resumes
                            </Col>
                            <Col md={2} style={{ fontSize: '3rem', padding: 0, justifyContent: 'space-between' }} className='d-flex justify-content-center align-items-center'>
                                <FaBolt size="2rem" color='gold'/>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };

    const renderHeader = () => {
        return (
            <Navbar expand="lg" className="shadow-sm sticky-top" style={{backgroundColor: "rgb(255 255 255)"}}>
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src="./logo5.png"
                            height="65"
                            width="200"
                            className="d-inline-block align-top"
                            alt="Sort My Resumes"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
                            {/* Sign Up Button */}
                            {renderLoginLogout()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    };

    return (
        <div>
            {/* Header Section */}
            {renderHeader()}

            {/* Banner Section */}
            {renderBanner()}

            {/* Features Section */}
            <Container className="my-5 p">
                <h2 className="text-center mb-4">Features</h2>
                {/* First feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Accurate Matching</h4>
                        <p>Matches resumes with job descriptions using advanced AI algorithms.</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem'}}>
                        <Image src='./robo_resume_bg.png' width="200px" height="200px" alt="AI matching resumes" />
                    </Col>
                </Row>

                {/* Second feature: Flip - Icon on left, text on right */}
                <Row className="align-items-center mb-5 flex-row-reverse">
                    <Col md={6}>
                        <h4>Fast & Efficient</h4>
                        <p>Get ranked resumes instantly without manual filtering.</p>
                    </Col>
                    <Col md={6} className="text-center">
                        <Image src='./ranking_bg.png' width="200px" height="200px" alt="Instant resume ranking with AI" />
                    </Col>
                </Row>

                {/* Third feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Secure & Reliable</h4>
                        <p>Your data is securely processed and handled with care.</p>
                    </Col>

                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem'}}>
                        <Image src='./secure_bg.png' width="200px" height="200px" alt="Secure data handling illustration" />
                    </Col>
                </Row>
            </Container>

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