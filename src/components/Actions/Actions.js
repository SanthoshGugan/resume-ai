import { Col, Container, Row } from "react-bootstrap"
import QueryBadge from "../QueryBadge/QueryBadge";
import PromptActions from "../match-list/PromptActions";
import { useSelector } from "react-redux";
import { isJDOnQuickSelect } from "../../store/selectors/jdSelector";
import QuickAction from "./QuickAction";
import VerticalTimeline from "../Timeline/VerticalTimeline";
const steps = [
    { title: 'Submit JD', avatar: 'JD', status: 'completed', url: '/home/jd-upload' },
    { title: 'Submit Resumes', avatar: 'R', status: 'completed', url: '/home/resume-upload' },
    { title: 'View Matches', avatar: 'M', status: 'disabled', url: '/home/queries' },
  ];

const Actions = () => {
    const isJDOnQuickActionEnabled = useSelector(state => isJDOnQuickSelect(state));

    return (<Container>
        <Row>
            <Col md={4}>
                <VerticalTimeline steps={steps} activeStep={2} />

                {/* <QueryBadge to="/chatresume" query="Chat" /> */}
                <QuickAction showTick={isJDOnQuickActionEnabled} isVisible={isJDOnQuickActionEnabled} avatarLabel="Jd" description="View Job Description Summary" to="/home/jd-upload" />
                {/* <QuickAction showTick={isJDOnQuickActionEnabled} isVisible={isJDOnQuickActionEnabled} avatarLabel="Rs" description="View Job Description Summary" to="/home/resume-upload" /> */}
                 
            </Col>
            <Col md={8}>
                <Row className="d-flex justify-content-center p-4">
                    <Col md={10}>
                        {!isJDOnQuickActionEnabled && (<QueryBadge to="/home/jd-upload" query="Upload JD" />)}
                        <QueryBadge to="/home/resume-upload" query="Upload Resumes" />
                        <QueryBadge to="/home/queries" query="Queries" />
                        <PromptActions />
                    </Col>

                </Row>
            </Col>
        </Row>
    </Container>);
}

export default Actions;