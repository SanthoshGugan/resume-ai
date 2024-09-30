import { Button, Col, Container, Row } from "react-bootstrap"

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
    return (<Container>
        <Row>
            <Col md={2}></Col>
            <Col md={7} sm={8}>Logo</Col>
            {renderLoginLogout()}
        </Row>
    </Container>);
};

export default Header;