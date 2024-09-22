import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SkillBadge from "./SkillBadge";
import { useDispatch, useSelector } from "react-redux";
import { selectSkillsFromAllCategory } from "../../store/selectors/jdSkillSelector";
import Avatar from "../Avatar";
import SkillSelector from "./SkillSelector";
import { fetchGlobalSkills, updateJdThunk } from "../../store/thunks/jdThunks";

const JDSummary = ({ jdSummary, jdDimensions: cards = [] }) => {
    const dispatch = useDispatch();
    const skills = useSelector(state => selectSkillsFromAllCategory(state, ""));
    // console.log(`skills : ${JSON.stringify(skills)}`);
    // if (!cards || cards.length === 0) return <></>;

    // const { cards = [] } = jdDimensions;
    // console.log(`cards ::: ${JSON.stringify(cards)}`)

    useEffect(() => {
        dispatch(fetchGlobalSkills());
    }, [])

    const renderListItem  = (heading, items) => {
        return (
            <Container  className="d-flex flex-wrap">
                    {skills.map(item => 
                    <SkillBadge
                        category={<Avatar initials={item?.categoryName.substring(0,2)} />}
                        tooltipText={item?.categoryName}
                        label={item?.skill }
                        onRemove={(e) => {}}
                    />)}
            </Container>
        )
    };

    const renderItem = (item) => {
        // console.log(`Item :::: ${JSON.stringify(item)}`);
        const { type, items, heading } = item;

        if (type === "List") {
            return renderListItem(heading, items);
        }
        return (<></>);
    };

    const renderCard = (card) => {
        const { name, content } = card;
        return (
            <Col md={6}>
                    <Card  className="p-3 d-flex justify-content-center">
                        <Card.Title>{name}</Card.Title>
                        <Card.Body>
                            {content.map((item) => renderItem(item))}
                        </Card.Body>
                    </Card>
            </Col>
        );
    };

    const renderUpdateSkill = () => {
        return (
            <Col md={9}>
                <Button onClick={() => dispatch(updateJdThunk())}>Update Skill</Button>
            </Col>
        );
    }

    return (
        <Container>
            <div className="m-4">JD</div>
            <Row className="d-flex justify-content-start">
                {/* {cards.map(card => renderCard(card))} */}
                <SkillSelector
                    skills={[]}
                    onSelectSkill={() => {}}
                />
                {renderListItem()}
                {renderUpdateSkill()}
            </Row>
        </Container>
    );
};

export default JDSummary;