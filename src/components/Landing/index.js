// Import React and dependencies
import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Carousel, Image, Card } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FaBolt, FaHourglassHalf } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import LandingHeader from '../LandingHeader/LandingHeader';
import { URLs } from '../../utils/urls';

const LandingPage = () => {

    const navigate = useNavigate();
    const Location = useLocation();

    console.log(`location:: ${JSON.stringify(Location)}`)

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
        navigate(URLs.APP_ROOT);
    }

    const signUp = () => {
        navigate(URLs.LOGIN);
    };

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
                                <FaHourglassHalf size="2rem" color='gold' />
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
                                <FaBolt size="2rem" color='gold' />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };

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
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="align-items-center">
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

    const renderDemoVideoSection = () => {
        return (
            <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Row className="justify-content-center align-items-center">
                    {/* Video on the Left */}
                    <Col md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', overflow: 'hidden', borderRadius: '10px' }}>
                            <video
                                src="https://landing-page-assets-8971676609.s3.ap-south-1.amazonaws.com/demo.mp4"
                                autoPlay
                                muted
                                controls
                                loop
                                className="w-100"
                                style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#f8f9fa',
                                }}
                            />
                        </div>
                    </Col>
    
                    {/* Title and Description on the Right, Centered Vertically */}
                    <Col md={5} className="d-flex flex-column justify-content-center text-center" style={{ paddingLeft: '2rem' }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            fontWeight: '600',
                            color: '#4a4a4a',
                            lineHeight: '1.3',
                            marginBottom: '1rem',
                        }}>
                            Experience AI in Action
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6a6a6a',
                            lineHeight: '1.6',
                            fontWeight: '400',
                            maxWidth: '80%',
                            margin: '0 auto',
                        }}>
                            Our AI-powered resume filtering tool analyzes hundreds of resumes in seconds, matching top talent with job descriptions effortlessly. See firsthand how our technology streamlines hiring, saves you time, and enables smarter decisions.
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <div>
            {/* Header Section */}
            <LandingHeader signUp={signUp} />

            {/* Banner Section */}
            {renderBanner()}

            {/* Product Demo Video Section */}
            {renderDemoVideoSection()}

            {/* Features Section */}
            <Container className="my-5 p">
                <h2 className="text-center mb-4">Features</h2>
                {/* First feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Accurate Matching</h4>
                        <p>Using cutting-edge AI, we ensure the right resumes are matched to your job descriptions with precision. Our system understands job-specific skills, helping you quickly find the best-fit candidates, reducing shortlisting time and effort.</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem' }}>
                        <Image src='./robo_resume_bg.png' width="200px" height="200px" alt="AI matching resumes" />
                    </Col>
                </Row>

                {/* Second feature: Flip - Icon on left, text on right */}
                <Row className="align-items-center mb-5 flex-row-reverse">
                    <Col md={6}>
                        <h4>Fast & Efficient</h4>
                        <p>Get results in minutes, not hours. Our AI-driven system swiftly analyzes hundreds of resumes, delivering ranked candidates almost instantly, so you can focus on interviewing the top talent. Accelerate your hiring process without compromising quality, saving both time and resources.</p>
                    </Col>
                    <Col md={6} className="text-center">
                        <Image src='./ranking_bg.png' width="200px" height="200px" alt="Instant resume ranking with AI" />
                    </Col>
                </Row>

                {/* Third feature: Text on left, icon on right */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h4>Secure & Reliable</h4>
                        <p>Your data is in safe hands. Our platform ensures that all resume data is securely processed with end-to-end encryption, protecting sensitive information at every step. Trust our reliable system to deliver consistent, accurate results while maintaining the highest security standards.</p>
                    </Col>

                    <Col md={6} className="d-flex justify-content-start align-items-center" style={{ paddingLeft: '5rem' }}>
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