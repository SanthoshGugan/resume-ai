import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userIdSelector } from "../../store/selectors/userSelector";

const Board = () => {
    const userId = useSelector(state => userIdSelector(state));
    
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