import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Pricing.css';
import LandingHeader from '../LandingHeader/LandingHeader';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from '../Payment/RazorpayButton';

const PricingPlan = () => {
    const navigate = useNavigate();
    const signUp = () => {
        navigate('/login');
    };

    return (
        <div>
            <LandingHeader signUp={signUp} />
            <Container className='my-5'>
                <h2 className="text-center mb-4">Our Pricing Plans</h2>
                <div className="banner-section text-center text-white py-5 my-5" style={{ backgroundColor: '#007bff' }}>
                    <h1 className="mb-3">Choose the Right Plan for You</h1>
                    <p className="lead mb-4">
                        Find the perfect plan that fits your team’s needs. Upgrade anytime with no hassle.
                    </p>
                    <Button variant="light" size="lg">Get Started</Button>
                </div>

                {/* Pricing Cards */}
                <Row>
                    {/* Free Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Free Plan</Card.Title>
                                <h3>$0 <small>/month</small></h3>
                                <Card.Text>For individuals just getting started</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Resumes Processed: 50</div>
                                    <div className="feature"><FaCheckCircle /> Basic AI Queries</div>
                                    <div className="feature"><FaTimesCircle /> Advanced Features</div>
                                </div>
                                <Button variant="secondary" size="md">Your Current Plan</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Basic Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center popular-plan">
                            <div className="popular-badge">Popular</div>
                            <Card.Body>
                                <Card.Title>Basic Plan</Card.Title>
                                <h3>$25 <small>/month</small></h3>
                                <Card.Text>For small teams and growing businesses</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Resumes Processed: 100</div>
                                    <div className="feature"><FaCheckCircle /> Advanced Queries</div>
                                    <div className="feature"><FaCheckCircle /> Export Advanced Results</div>
                                    <div className="feature"><FaCheckCircle /> 24/7 Support</div>
                                </div>
                                <RazorpayButton amount={25} planId={"basic"}/>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Starter Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Starter Plan</Card.Title>
                                <h3>$70 <small>/month</small></h3>
                                <Card.Text>For growing teams</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Resumes Processed: 500</div>
                                    <div className="feature"><FaCheckCircle /> Advanced Queries</div>
                                    <div className="feature"><FaCheckCircle /> 24/7 Support</div>
                                    <div className="feature"><FaCheckCircle /> All Features Included</div>
                                </div>
                                <RazorpayButton amount={70} planId={"starter"}/>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Growth Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Growth Plan</Card.Title>
                                <h3>$210 <small>/month</small></h3>
                                <Card.Text>For large teams</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Resumes Processed: 1,500</div>
                                    <div className="feature"><FaCheckCircle /> Customizable Matching Algorithms</div>
                                    <div className="feature"><FaCheckCircle /> 24/7 Support</div>
                                </div>
                                <RazorpayButton amount={210} planId={"growth"}/>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Scale Plan */}
                    <Col lg={4} md={6} sm={12} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <Card.Title>Scale Plan</Card.Title>
                                <h3>$700 <small>/month</small></h3>
                                <Card.Text>For enterprises</Card.Text>
                                <div className="features-list">
                                    <div className="feature"><FaCheckCircle /> Resumes Processed: 5,000</div>
                                    <div className="feature"><FaCheckCircle /> Customizable Matching Algorithms</div>
                                    <div className="feature"><FaCheckCircle /> 24/7 Support</div>
                                    <div className="feature"><FaCheckCircle /> Priority Support</div>
                                </div>
                                <RazorpayButton amount={700} planId={"scale"}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Feature Comparison Table */}
                <Row className="mt-5">
                    <Col lg={12}>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Free Plan</th>
                                        <th>Basic Plan</th>
                                        <th>Starter Plan</th>
                                        <th>Growth Plan</th>
                                        <th>Scale Plan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Resumes Processed</td>
                                        <td>50</td>
                                        <td>100</td>
                                        <td>500</td>
                                        <td>1,500</td>
                                        <td>5,000</td>
                                    </tr>
                                    <tr>
                                        <td>Basic AI Queries</td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                    </tr>
                                    <tr>
                                        <td>Advanced Queries</td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                    </tr>
                                    <tr>
                                        <td>Export Advanced Results</td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                    </tr>
                                    <tr>
                                        <td>24/7 Support</td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                    </tr>
                                    <tr>
                                        <td>Customizable Matching Algorithms</td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaTimesCircle /></td>
                                        <td><FaCheckCircle /></td>
                                        <td><FaCheckCircle /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PricingPlan;
