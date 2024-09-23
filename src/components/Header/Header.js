import { Col, Container, Row } from "react-bootstrap"

const Header = () => {
    return (<Container>
        <Row>
            <Col md={2}></Col>
            <Col md={7} sm={8}>Logo</Col>
            <Col md={2} sm={4}>login</Col>
        </Row>
    </Container>);
};

export default Header;