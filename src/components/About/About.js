import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function AboutUs() {
    return (
        <Container className="my-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1>About SortMyResumes</h1>
                    <p className="text-muted">Streamlining Your Hiring Process with Intelligent Resume Filtering</p>
                </Col>
            </Row>

            <Row className="align-items-center mb-5">
                <Col md={6} className="text-center">
                    <Image src="/about1.jpg" fluid rounded style={{ maxWidth: '100%', width: '300px', height: '300px' }} />
                </Col>
                <Col md={6}>
                    <h2>Our Mission</h2>
                    <p>
                        At <strong>SortMyResumes</strong>, we aim to simplify and enhance the hiring process for recruiters
                        and HR professionals. Our intelligent resume filtering application enables you to quickly identify
                        top candidates by automatically sorting resumes based on the job description you provide.
                    </p>
                    <p>
                        With our solution, save valuable time, reduce hiring costs, and find the best match for your roles.
                        SortMyResumes is dedicated to transforming resume management into an efficient, hassle-free process.
                    </p>
                </Col>
            </Row>

            <Row className="align-items-center mb-5">
                <Col md={6} className="order-md-2 text-center">
                    <Image src="/about2.jpg" fluid rounded style={{ maxWidth: '100%', width: '300px', height: '300px' }} />
                </Col>
                <Col md={6} className="order-md-1">
                    <h2>How It Works</h2>
                    <p>
                        Our platform uses advanced AI algorithms to analyze resumes and job descriptions, providing you
                        with a sorted list of candidates based on match percentages. Simply:
                    </p>
                    <ul>
                        <li>Upload the job description</li>
                        <li>Upload the list of all resumes</li>
                        <li>Receive resumes ranked by match accuracy</li>
                    </ul>
                    <p>It's that simple, fast, and effective!</p>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions or need more information? Reach out to us at <a href="mailto:info@sortmyresumes.com">info@sortmyresumes.com</a> or visit our website at <a href="https://www.sortmyresumes.com">www.sortmyresumes.com</a>.
                    </p>
                    <Button href="mailto:info@sortmyresumes.com" variant="primary">Contact Us</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutUs;
