import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useResumeAI from "../../hooks/useResumeAI";
import Answers from "./Answers";
import JD from "../JD/JDSummary";
import Questions from "./Questions";
import Filters from "../Filters/Filters";
import UploadResume from "./UploadResume";
import JDSummary from "../JD/JDSummary";
import JDUpload from "../JD/JDUpload";

const ResumeAi = () => {

    const {
        handleSubmit,
        onSubmit,
        register
     } = useResumeAI();

     const renderText = ({ text = "Hello word"}) => {
        return (
            <Row className="d-flex justify-content-end mx-2 mb-5">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                                    {text}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
     };

     const renderQuestion = ({ q = ""}) => {
        return (
            <Row className="d-flex justify-content-start mx-2 mb-5">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                                    {q}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )

     }

    return (
        <div fuild className="mx-2 my-1">
            <Container fuild className="flex justify-content-start my-5 bg-primary-subtle border-primary-subtle py-5 px-10">
                <Questions>
                    <JDUpload />
                </Questions>
                <Answers colW={11}>
                    <JDSummary />
                </Answers>
                <Answers colW={10}>
                    <Filters />
                </Answers>
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
                                <div>

                                    <UploadResume />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>    
        </div>
    );
};

export default ResumeAi;