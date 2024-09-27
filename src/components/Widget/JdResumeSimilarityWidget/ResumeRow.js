import React from 'react';
import { Badge, ProgressBar, Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import ResumeCardSummary from './ResumeCardSummary';
import SkillsList from './SkillList';
import { useSelector } from 'react-redux';
import SkillPercentCell from './SkillPercentCell';
import { selectLabelsByResumeId, selectSimilarityByResumeId, selectSkillPercentByResumeId, selectCompaniesByResumeId, domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';

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
        showSimilarity,
        showCompanies
    } = useSelector(state => state.widgets.flags)
    const { metadata = {}, id } = resume || {};
    const match = useSelector(state => selectSimilarityByResumeId(state, id))
    const labels = useSelector(state => selectLabelsByResumeId(state, id));
    const skillPercent = useSelector(state => selectSkillPercentByResumeId(state, id));
    const companies = useSelector(state => selectCompaniesByResumeId(state, id));
    console.log(`    ${JSON.stringify(skillPercent)}`, skillPercent);
    // console.log(`match    ${match}`);
    const enabledDomainQueries = useSelector(state => domainsQueryEnabledSelector(state));

    return (
        <>
            <tr onClick={() => toggleRow(index)}>
                {showSimilarity && (<td>
                    {metadata?.name?.[0] || 'Unknown Name'} 
                    {showSimilarity && (<Badge bg="primary">{match || 0} %</Badge>)}
                    {showLabelBadge && (<>{labels.map(label => <Badge bg="success">{label}</Badge>)}</>)}
                </td>)}
                {enabledDomainQueries.includes("front_end") && (
                    <td><SkillPercentCell value={skillPercent["front_end"] || 0} /></td>
                )}
                {enabledDomainQueries.includes("back_end") && (
                    <td><SkillPercentCell value={skillPercent["back_end"] || 0} /></td>
                )}
                {enabledDomainQueries.includes("cloud") && (
                    <td><SkillPercentCell value={skillPercent["cloud"] || 0} /></td>
                )}
                {enabledDomainQueries.includes("devops") && (
                    <td><SkillPercentCell value={skillPercent["devops"] || 0} /></td>
                )}
                {showCompanies &&(<td>
                    {companies.map(company => <Badge bg="primary">{company}</Badge>)}
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
