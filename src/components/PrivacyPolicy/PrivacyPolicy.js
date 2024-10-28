import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function PrivacyPolicy() {
    return (
        <Container className="my-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Privacy Policy</h1>
                    <p className="text-muted">Effective Date: October 26, 2024</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Introduction</h2>
                    <p>
                        At <strong>SortMyResumes</strong>, accessible from <a href="https://www.sortmyresumes.com">www.sortmyresumes.com</a>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Information We Collect</h2>
                    <p>We collect various types of information to provide and improve our services:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Includes your name, email address, and other contact details.</li>
                        <li><strong>Job and Resume Data:</strong> When you upload job descriptions and resumes, we store and analyze this data to deliver our resume filtering service.</li>
                        <li><strong>Usage Data:</strong> We collect information on how our service is accessed and used, including device information, browser type, and IP address.</li>
                    </ul>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>How We Use Your Information</h2>
                    <p>We use the collected data for the following purposes:</p>
                    <ul>
                        <li><strong>To Provide and Maintain Our Service:</strong> Using job and resume data to deliver accurate filtering results.</li>
                        <li><strong>To Communicate with You:</strong> Sending updates, support information, and responding to inquiries.</li>
                        <li><strong>To Improve Our Service:</strong> Analyzing usage data to enhance our application features and performance.</li>
                    </ul>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Data Security</h2>
                    <p>
                        We prioritize the security of your data and use various security measures to protect it. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Sharing Your Information</h2>
                    <p>
                        We do not sell or rent your personal data to third parties. We may share data with trusted service providers solely for the purpose of providing and improving our services. These third parties are required to protect your data in compliance with this Privacy Policy.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information stored on our platform. For assistance, please contact us at <a href="mailto:info@sortmyresumes.com">info@sortmyresumes.com</a>.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this Privacy Policy periodically for any updates.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:info@sortmyresumes.com">info@sortmyresumes.com</a>.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default PrivacyPolicy;
