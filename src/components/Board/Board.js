import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Board = () => {
    return (
        <Container>
            <Card style={{ border: 'none'}}>
                <Row style={{ minHeight: '35rem', display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                    <Col md={11}>
                        <Outlet />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Board;