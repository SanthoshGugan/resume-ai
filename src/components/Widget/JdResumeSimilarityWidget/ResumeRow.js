import React from 'react';
import { Badge, ProgressBar, Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import ResumeCardSummary from './ResumeCardSummary';
import SkillsList from './SkillList';
import { useSelector } from 'react-redux';
import SkillPercentCell from './SkillPercentCell';
import { selectSimilarityByResumeId } from '../../../store/selectors/queryResultsByIdsSelector';

const domainColors = {
    fullstack: 'primary',
    frontend: 'success',
    backend: 'warning',
};

const getProgressBarVariant = (value) => {
    if (value >= 75) return 'gold';
    if (value >= 50) return 'warning';
    return 'danger';
};

const ResumeRow = ({ resume, index, openIndex, toggleRow }) => {
    const isOpen = openIndex === index;
    const {
        showSkillPercents,
        showLabelBadge,
        showSimilarity
    } = useSelector(state => state.widgets.flags)
    const { metadata = {}, id } = resume || {};
    const match = useSelector(state => selectSimilarityByResumeId(state, id))
    // console.log(`match    ${match}`);
    return (
        <>
            <tr onClick={() => toggleRow(index)}>
                {showSimilarity && (<td>
                    {metadata.name} 
                    {showLabelBadge && (<Badge bg={domainColors[resume.domain]}>{resume.domain}</Badge>)}
                    {showSimilarity && (<Badge bg="primary">{match || 0} %</Badge>)}
                </td>)}
                {showSkillPercents && (<td>
                    <SkillPercentCell value={`75.00%`} />
                </td>)}
                {showSkillPercents &&(<td>
                    <ProgressBar
                        now={resume.backEnd}
                        label={`${resume.backEnd}%`}
                        variant={getProgressBarVariant(resume.backEnd)}
                    />
                </td>)}
            </tr>
            {(isOpen) && (
                <tr>
                    <td colSpan="3">
                        <Card>
                            <Card.Header>
                                Details
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <ResumeCardSummary
                                            companies={resume.companies}
                                            yoe={resume.yoe}
                                            location={resume.location}
                                            phone={resume.phone}
                                            email={resume.email}
                                        />
                                    </Col>
                                    <Col md={6} className="d-flex flex-wrap align-items-start">
                                        <SkillsList skills={resume.frontEndSkills} category="Front End Skills" />
                                        <SkillsList skills={resume.backEndSkills} category="Back End Skills" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ResumeRow;
