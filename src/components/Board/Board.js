import { Card, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Board = () => {
    return (
        <Container>
            <Card>
                <div style={{ minHeight: '35rem'}}>
                    <Outlet />
                </div>
            </Card>
        </Container>
    );
};

export default Board;