import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { isUserPremiumSelector, userIdSelector } from "../../store/selectors/userSelector";
import { FaCrown, FaExclamationCircle } from 'react-icons/fa';
import { URLs } from "../../utils/urls";

const styles = {
    avatarButton: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: '#fff'
    },
    iconBadge: {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: '#f0c14b', // Golden background for premium
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '-20px', // Adjust position as needed
        right: '25px',
    },
    icon: {
        color: '#fff', // White color for the icon itself
        fontSize: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px' // Small space between buttons
    }
};

// Styles moved to variables
const premiumButtonStyles = {
    backgroundColor: '#f0c14b',
    border: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '5px 20px',
    borderRadius: '30px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const Header = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => userIdSelector(state));
    const premiumFlag = useSelector(state => isUserPremiumSelector(state));
    const location = useLocation();
    
    console.log(`premiumflag : ${premiumFlag}`);

    const renderFreeUserBadge = () => (
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="premium-tooltip">
                    Buy Premium Subscription
                </Tooltip>
            }
        >
            <div style={styles.iconBadge}>
                <FaExclamationCircle style={styles.icon} />
            </div>
        </OverlayTrigger>
    );

    const renderLoginLogout = () => {
        if (userId) {
            return (
                <Col className="d-flex justify-content-center align-items-end position-relative">


                    {/* Show Get Premium Button only for free users */}
                    {/* {!premiumFlag && (
                        <Button
                            onClick={() => navigate(URLs.PRICING)}
                            className="premium-badge d-flex align-items-center me-3"
                            style={premiumButtonStyles}
                        >
                            <FaCrown className="me-2" size={20} />
                            Get Premium
                        </Button>
                    )} */}
                    {/* Group UserProfile and Premium Button */}
                    <div style={styles.buttonGroup}>
                        <UserProfile />

                        {/* Conditional rendering for premium or free users */}
                        {premiumFlag ? (
                            <div style={styles.iconBadge}>
                                <FaCrown style={styles.icon} />
                            </div>
                        ) : (
                            renderFreeUserBadge()
                        )}
                    </div>
                </Col>
            );
        }

        const handleLoginRedirect = () => {
            navigate(URLs.LOGIN, { state: { from: location } });
        };

        return (
            <Col md={2}>
                {/* <Button>
                    <Link
                        to={URLs.LOGIN}
                        style={{ color: "white", fontSize: "1rem", textDecoration: "none" }}>
                        Login
                    </Link>
                </Button> */}
                <Button onClick={handleLoginRedirect}>
                    Login
                </Button>
            </Col>
        );
    };

    return (
        <Row
            className="d-flex justify-content-between align-items-center"
            style={{
                backgroundColor: '#fefefe',
                padding: '0.5rem 3rem',
                borderBottom: '1px solid #e0e0e0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '0.5rem'
            }}
        >
            <Col md={7} sm={8} className="d-flex justify-content-start">
                <div onClick={() => navigate(URLs.HOME)} style={{ cursor: 'pointer' }}>
                    <Image
                        src="../logo5.png"
                        height="55"
                        width="189"
                        className="d-inline-block align-top"
                        alt="Sort My Resumes"
                    />
                </div>
            </Col>
            <Col md={5}>
                <Row className="d-flex justify-content-center p-0 m-0">
                    {renderLoginLogout()}
                </Row>
            </Col>
        </Row>
    );
};

export default Header;