import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { userIdSelector } from "../../store/selectors/userSelector";

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
    }
};

const Header = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => userIdSelector(state));

    const renderLoginLogout = () => {

        if (userId) {
            const userInitial = 'N'; // Get the first letter of the user's email

            return (
                <Col md={2} className="d-flex justify-content-center align-items-end">
                    <UserProfile />
                    {/* <Button onClick={signOut} >Sign Out</Button> */}
                </Col>
            );
        }

        return (
            <Col md={2}>
                <Button>
                    <Link
                        to="/login"
                        style={{ color: "white", fontSize: "1rem", textDecoration: "none" }}>
                        Login
                    </Link>
                </Button>
            </Col>
        );
    }
    return (
        <Row className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fefefe' }}>
            {/* <Col md={2}></Col> */}
            <Col md={9} sm={8} className="d-flex justify-content-start">

                <Image
                    src="./logo5.png"
                    height="65"
                    width="200"
                    className="d-inline-block align-top"
                    alt="Sort My Resumes"
                />
            </Col>
            {renderLoginLogout()}
        </Row>);
};

export default Header;