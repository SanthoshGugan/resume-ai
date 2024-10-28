import React, { useEffect } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { FaCrown } from 'react-icons/fa'; // Crown Icon from React Icons
import { Link, useNavigate } from 'react-router-dom';
import { URLs } from '../../utils/urls';
import { userIdSelector } from '../../store/selectors/userSelector';
import UserProfile from '../UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../../store/selectors/planSelector';
import { fetchPlans } from '../../store/thunks/planThunk';
import { getCurrentUser } from 'aws-amplify/auth';
import { userSync } from '../../store/thunks/userThunk';
import { fetchAllPlans } from '../../api/planApi';
import { setFlags, setUserGuest } from '../../store/userSlice';

const LandingHeader = ({ signUp, buyPremium }) => {
    const userId = useSelector(state => userIdSelector(state));
    const dispatch = useDispatch();

    const setGuestFlags = async () => {
      const { data } = await fetchAllPlans();
      const { plans } = data;
      const guestPlan = plans.find(plan => plan.id === "guest");
      dispatch(setFlags(guestPlan?.flags));
    }

    useEffect(() => {
      const initUser = async () => {
          try {
              const { username, userId, signInDetails } = await getCurrentUser();
              console.log(`userId on changes `, userId);
              dispatch(userSync(userId));
          } catch (err) {
              console.log(`user not logged in`);
              dispatch(setUserGuest());
              await setGuestFlags();
          }
      };
      initUser();
    }, [userId]);


  // Styles moved to variables
  const premiumButtonStyles = {
    backgroundColor: '#f0c14b',
    border: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '30px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  };

  return (
    <Navbar expand="lg" className="shadow-sm sticky-top" style={{ backgroundColor: 'rgb(255 255 255)' }}>
      <Container>
        {/* Left Side: Logo and Nav Links */}
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
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Align Home and Pricing to the left */}
          <Nav className="me-auto align-items-center mx-5 fw-bold">
            <Nav.Link as={Link} to="/" className="me-3">
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/pricing" className="me-3">
              Pricing
            </Nav.Link> */}
             <Nav.Link as={Link} to={URLs.ABOUTUS} className="me-3">
              About us
            </Nav.Link> 
            <Nav.Link as={Link} to={URLs.PRIVACY_POLICY} className="me-3">
              Privacy Policy
            </Nav.Link> 
          </Nav>

          {/* Right Side: Upsell and Sign Up */}
          <Nav className="align-items-center">
            {/* Premium Badge Button */}
            {/* <Button
              onClick={() => navigate(URLs.PRICING)}
              className="premium-badge d-flex align-items-center me-3"
              style={premiumButtonStyles}
            >
              <FaCrown className="me-2" size={20} />
              Get Premium
            </Button> */}
            {
              userId ? (<UserProfile/>) : (
                <Button variant="primary" onClick={signUp} className="px-4">
                  Sign Up
                </Button>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingHeader;