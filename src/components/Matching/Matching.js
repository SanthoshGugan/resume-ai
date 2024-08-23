import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useMatching from "../../hooks/useMatching";
import useLongPollMatchingSummary from "../../hooks/useLongPollMatchingSummary";
export const MOCK_MATCHING_SUMMARY = {
    "topResume": "The resume [single-page.pdf_resume-assets-008971676609] is a top match with the job description, showing a similarity of 80.77%. ",
    "topListResume": "Here is the top 2 resumes matching job description.  \n1. Resume [single-page.pdf_resume-assets-008971676609] matches 80.77% \n2. Resume [Profile_2.pdf_resume-assets-008971676609] matches 72.66%",
    "groupByLabels": {
        "full_stack": [
            "Get_Started_With_Smallpdf-output.pdf_resume-assets-008971676609",
            "",
            "Profile.pdf_resume-assets-008971676609", "Profile_2.pdf_resume-assets-008971676609",
            "",
            "single-page.pdf_resume-assets-008971676609"
        ]
    }
}


const Matching = ({ jd_key, setCanShowMatchSummaryCard, setMatchSummary }) => {

    const {
        triggerMatching
    } = useMatching({});

    const {
        fetchMatchingSummary,
        summary
    } = useLongPollMatchingSummary({ interval: 10000 })

    const onTriggerClick = async ({ jd_key }) => {
        await triggerMatching({ jd_key });
        await fetchMatchingSummary({ jd_key });
    }

    useEffect(() => {
        setMatchSummary(summary);
        setCanShowMatchSummaryCard(!!summary)
    }, [summary])

    if (!jd_key) return <></>;

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    <Button onClick={() => onTriggerClick({ jd_key })}>Match</Button>
                </Col>
            </Row>

        </Container>
    );
};

export default Matching;