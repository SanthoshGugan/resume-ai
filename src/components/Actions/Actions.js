import { Col, Container, Row } from "react-bootstrap"
import QueryBadge from "../QueryBadge/QueryBadge";
import PromptActions from "../match-list/PromptActions";
import { useSelector } from "react-redux";
import { isJDOnQuickSelect } from "../../store/selectors/jdSelector";
import QuickAction from "./QuickAction";
import HorizontalTimeline from "../Timeline/HorizontalTimeline";

const Actions = () => {
    const isJDOnQuickActionEnabled = useSelector(state => isJDOnQuickSelect(state));

    return (<Container>
        <Row>
            <HorizontalTimeline />
        </Row>
    </Container>);
}

export default Actions;