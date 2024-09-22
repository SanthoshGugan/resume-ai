import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { longPollQueries, triggerQueries } from '../../store/thunks/queryThunks';
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
import ResumeSummary from "../Resume/ResumeSummary";
import PromptActions from "../match-list/PromptActions";
// import useLongPollQueries from "../../hooks/useLongPollQueries";
import useQueryFunction from "../../hooks/useQueryFunction";

import { addRemainingQuery } from '../../store/queryResultsSlice';
import JDResumeSimilarityWidget from "../Widget/JdResumeSimilarityWidget";

const ResumeAi = () => {

    const dispatch = useDispatch();
    const remainingQueries = useSelector(state => state.queryResults.remainingQueries);
    const queryResults = useSelector(state => state.queryResults.byQueryId);

    const [canShowJDUploadCard, setCanShowJDUploadCard] = useState(false);
    const [canShowJDSummaryCard, setCanShowJDSummaryCard] = useState(false);

    const [canShowResumeUploadCard, setCanShowResumeUploadCard] = useState(false);
    const [canShowResumeSummaryCard, setCanShowResumeSummaryCard] = useState(false);

    const [canShowMatchCard, setCanShowMatchCard] = useState(false);
    const [canShowMatchSummaryCard, setCanShowMatchSummaryCard] = useState(false);

    const [canShowFilterCard, setCanShowFilterCard] = useState(false);

    const [jdKey, setJdKey] = useState(null);
    const [jdSummary, setJDSummary] = useState(null);
    const [jdDimensions, setJDDimensions] = useState(null);


    const [resumeSummary, setResumeSummary] = useState(null);
    const [resumeDimensions, setResumeDimensions] = useState(null);

    const [matchSummary, setMatchSummary] = useState(null);

    // const {
    //     fetchQuerySummary,
    //     queries
    // } = useLongPollQueries({ interval: 30000 }); // keeping long time to avoid over call

    const {
        queryFunctionTriggerApi
    } = useQueryFunction({})

    const {
        handleSubmit,
        onSubmit,
        register
    } = useResumeAI();

    useEffect(() => {
        setCanShowJDUploadCard(true);
    }, []);

    // useEffect(() => {
    //     if (jdKey) {
    //         fetchQuerySummary({ jd_key: jdKey });
    //     }
    // }, [jdKey])


    useEffect(() => {
        setCanShowJDSummaryCard(!!jdSummary);
    }, [jdSummary])

    // hard coding for testing!!!!
    useEffect(() => {
        setJdKey('full_stack_engineer_job_description_1.pdf_jd-assets-008971676609');
    }, [])

    useEffect(() => {
        if (remainingQueries.length > 0) {
          dispatch(longPollQueries(jdKey));
        //   console.log(`triggering long pollling`);
        }
      }, [jdKey, remainingQueries.length]);


    const onSelectPrompt = async (query) => {
        // console.log(`query clicked :::: ${query}`);
        // const response = await queryFunctionTriggerApi({
        //     "queries": [query],
        //     "jd_key": jdKey
        // });
        dispatch(triggerQueries([query], jdKey));
        dispatch(addRemainingQuery(query))
        // console.log(response);
    }

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
                            setJDDimensions={setJDDimensions}
                        />
                    </Questions>
                )}
                <Answers colW={11}>
                    <JDSummary jdSummary={jdSummary} jdDimensions={jdDimensions} />
                </Answers>
                {(canShowResumeUploadCard || true) && (
                    <Questions>
                        <ResumeUpload
                            jd_key={jdKey}
                            setCanShowMatchCard={setCanShowMatchCard}
                            setCanShowResumeSummaryCard={setCanShowResumeSummaryCard}
                            setResumeSummary={setResumeSummary}
                            setResumeDimensions={setResumeDimensions}
                        />
                    </Questions>
                )}
                {(canShowResumeSummaryCard) && (
                    <Answers colW={11}>
                        <ResumeSummary resumeSummary={resumeSummary} resumeDimensions={resumeDimensions} />
                    </Answers>
                )}

                {/* {queries && queries.map((query) => (
                    <div key={query.query_id}>
                        <h4>{query.result.summary}</h4>
                    </div>
                ))} */}

                {canShowMatchCard && (
                    <Questions>
                        <Matching jd_key={jdKey}
                            setMatchSummary={setMatchSummary}
                            setCanShowMatchSummaryCard={setCanShowMatchSummaryCard}
                        />
                    </Questions>
                )}
                {(canShowMatchSummaryCard || true) && (
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
            <Container>
                <JDResumeSimilarityWidget />
            </Container>
            <Container fuild className="flex justify-content-end">

                <Row>
                    <PromptActions
                        onSelectPrompt={onSelectPrompt}
                    />
                </Row>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="my-5">

                        <Col md={9}>
                            <Container>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    {...register("input", {
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