import React, { useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import LandingHeader from '../LandingHeader/LandingHeader';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from '../Payment/RazorpayButton';
import { useDispatch, useSelector } from "react-redux";
import { getSortedPlans, getFeaturesComparison } from '../../store/selectors/planSelector';
import { fetchPlans } from '../../store/thunks/planThunk';
import './Pricing.css';

const PricingPlan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plans = useSelector(state => getSortedPlans(state));
    const featureComparison = useSelector(state => getFeaturesComparison(state));

    const signUp = () => {
        navigate('/login');
    };

    useEffect(() => {
        dispatch(fetchPlans());
    }, [dispatch]);

    console.log(`plans:: ${JSON.stringify(plans)}`);

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
                    {plans && plans.map((plan, index) => (
                        <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
                            <Card className={`h-100 text-center ${plan.id === 'basic' ? 'popular-plan' : ''}`}>
                                {plan.id === 'basic' && <div className="popular-badge">Popular</div>}
                                <Card.Body>
                                    <Card.Title>{plan.name}</Card.Title>
                                    <h3>${plan.pricing} <small>/month</small></h3>
                                    <Card.Text>{plan.description}</Card.Text>
                                    <div className="features-list">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="feature">
                                                <FaCheckCircle /> {feature}
                                            </div>
                                        ))}
                                    </div>
                                    {plan.pricing > 0 ? (
                                        <RazorpayButton amount={plan.pricing} planId={plan.id} />
                                    ) : (
                                        <Button variant="secondary" size="md">Your Current Plan</Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Feature Comparison Table */}
                <Row className="mt-5">
                    <Col lg={12}>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        {plans && plans.map((plan, index) => (
                                            <th key={index}>{plan.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureComparison.map((feature, featureIndex) => (
                                        <tr key={featureIndex}>
                                            <td>{feature.feature}</td>
                                            {feature.plans.map((planFeature, planIndex) => (
                                                <td key={planIndex}>
                                                    {planFeature.hasFeature ? (
                                                        planFeature.value ? planFeature.value : <FaCheckCircle />
                                                    ) : <FaTimesCircle />}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
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
