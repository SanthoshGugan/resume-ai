import { Button, Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import UserProfile from "../UserProfile/UserProfile";

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

const Header = ({ signOut, user}) => {
    const navigate = useNavigate();

    const renderLoginLogout = () => {
    
        const handleProfileClick = () => {
            navigate('/profile');
        }
    
        if (user) {
            const userInitial = 'N'; // Get the first letter of the user's email
    
            return (
                <Col md={2} className="d-flex justify-content-center align-items-end">
                    <UserProfile signOut={signOut}/>
                    {/* <Button onClick={signOut} >Sign Out</Button> */}
                </Col>
            );
        }
    
        return (
            <Col md={2}></Col>
        );
    }
    return (
        <Row className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fefefe'}}>
            {/* <Col md={2}></Col> */}
            <Col md={9} sm={8} className="d-flex justify-content-start">
                <Image src="./logo_blue.png" />
            </Col>
            {renderLoginLogout()}
        </Row>);
};

export default Header;