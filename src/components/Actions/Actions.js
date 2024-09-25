import { Col, Container, Row } from "react-bootstrap"
import QueryBadge from "../QueryBadge/QueryBadge";
import PromptActions from "../match-list/PromptActions";

const Actions = () => {
    return (<Container>
        <Row>
            <Col md={4}>
                
                <QueryBadge to="/chatresume" query="Chat"/>
            </Col>
            <Col md={8}>
                <Row className="d-flex justify-content-center p-4">
                    <Col md={10}>
                        <QueryBadge to="/home/jd-upload" query="Upload JD"/>
                        <QueryBadge to="/home/resume-upload" query="Upload Resumes"/>
                        <QueryBadge to="/home/queries" query="Queries"/>
                        <PromptActions />
                    </Col>
                   
                </Row>
            </Col>
        </Row>
    </Container>);
}

export default Actions;