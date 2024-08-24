import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useResumeAI from "../../hooks/useResumeAI";
import Answers from "./Answers";
import JD from "../JD/JDSummary";
import Questions from "./Questions";
import Filters from "../Filters/Filters";
import UploadResume from "./UploadResume";
import JDSummary from "../JD/JDSummary";
import JDUpload from "../JD/JDUpload";
import ResumeUpload from "../Resume/ResumeUpload";
import Matching, { MOCK_MATCHING_SUMMARY } from "../Matching/Matching";
import MatchSummary from "../Matching/MatchSummary";
import { MOCK_JD_SUMMARY } from "../../hooks/useLongPollJDSummary";
import { MOCK_QUERY_SUMMARY } from "../../hooks/useLongPollMatchingSummary";

const ResumeAi = () => {

    const [ canShowJDUploadCard, setCanShowJDUploadCard ] = useState(false);
    const [ canShowJDSummaryCard, setCanShowJDSummaryCard ] = useState(false);
    const [ canShowResumeUploadCard, setCanShowResumeUploadCard ] = useState(false);
    const [ canShowMatchCard, setCanShowMatchCard ] = useState(false);
    const [ canShowMatchSummaryCard, setCanShowMatchSummaryCard ] = useState(false);

    const [ canShowFilterCard, setCanShowFilterCard ] = useState(false);
    const [ jdKey, setJdKey ] = useState(null);
    const [ jdSummary, setJDSummary] = useState(null);
    const [ matchSummary, setMatchSummary] = useState(null);

    const {
        handleSubmit,
        onSubmit,
        register
     } = useResumeAI();

     useEffect(() => {
        setCanShowJDUploadCard(true);
     }, [])

     useEffect(() => {
        setCanShowJDSummaryCard(!!jdSummary); 
     }, [jdSummary])

    return (
        <div fuild className="mx-2 my-1">
            <Container fuild className="flex justify-content-start my-5 bg-primary-subtle border-primary-subtle py-5 px-10">
                {canShowJDUploadCard && (
                    <Questions>
                        <JDUpload
                            setJdKey={setJdKey}
                            setCanShowJDSummaryCard={setCanShowJDSummaryCard}
                            setCanShowResumeUploadCard={setCanShowResumeUploadCard}
                            setJDSummary={setJDSummary}
                            />
                    </Questions>
                )}
                {(canShowJDSummaryCard) && (
                    <Answers colW={11}>
                        <JDSummary jdSummary={jdSummary}/>
                    </Answers>
                )}
                {canShowResumeUploadCard && (
                    <Questions>
                        <ResumeUpload jd_key={jdKey} setCanShowMatchCard={setCanShowMatchCard}/>
                    </Questions>
                )}
                {canShowMatchCard && (
                    <Questions>
                        <Matching jd_key={jdKey}
                            setMatchSummary={setMatchSummary}
                            setCanShowMatchSummaryCard={setCanShowMatchSummaryCard}
                        />
                    </Questions>
                )}
                {(canShowMatchSummaryCard) && (
                    <Questions>
                        <MatchSummary summary={matchSummary} />
                    </Questions>
                )}
                
                {canShowFilterCard && (
                    <Answers colW={10}>
                        <Filters />
                    </Answers>
                )}
            </Container>
            <Container fuild className="flex justify-content-end">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-5">

                        <Col md={9}>
                                <Container>
                                    <Form.Control 
                                        as="textarea"
                                        rows={5}
                                        {...register("input",{
                                            required: true
                                        })}
                                    />
                                </Container>
                            
                        </Col>
                        <Col md={3}>
                            <div className="d-flex flex-column justify-content-center align-items-center " >
                                <div>
                                    <Button type="submit">Submit</Button>
                                </div>
                                {/* <div>

                                    <UploadResume />
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>    
        </div>
    );
};

export default ResumeAi;