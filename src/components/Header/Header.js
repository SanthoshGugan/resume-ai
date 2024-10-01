import { Button, Col, Container, Image, Row } from "react-bootstrap"

const Header = ({ signOut, user}) => {

    const renderLoginLogout = () => {
        if (user) {
            return (<Col md={2}>
                <Button onClick={signOut}>Sign out</Button>
            </Col>);
            return (
                <Col md={2}></Col>
            )
        }
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