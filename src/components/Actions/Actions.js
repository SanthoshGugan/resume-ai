import { Col, Container, Row } from "react-bootstrap"
import QueryBadge from "../QueryBadge/QueryBadge";

const Actions = () => {
    return (<Container>
        <Row>
            <Col md={4}>
                <>Quick Actions</>
            </Col>
            <Col md={8}>
                <Row className="d-flex justify-content-center p-4">
                    <Col md={10}>
                        <QueryBadge to="/home/jd-upload" query="Upload JD"/>
                        <QueryBadge to="/home/resume-upload" query="Upload Resumes"/>
                    </Col>
                   
                </Row>
            </Col>
        </Row>
    </Container>);
}

export default Actions;