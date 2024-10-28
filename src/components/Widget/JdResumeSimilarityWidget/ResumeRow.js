import React from 'react';
import { Badge, Card, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ResumeCardSummary from './ResumeCardSummary';
import SkillsList from './SkillList';
import { useSelector } from 'react-redux';
import SkillPercentCell from './SkillPercentCell';
import {
  selectLabelsByResumeId,
  selectSimilarityByResumeId,
  selectSkillPercentByResumeId,
  selectCompaniesByResumeId,
  domainsQueryEnabledSelector
} from '../../../store/selectors/queryResultsByIdsSelector';
import "./ResumeRow.css";
import { jdSkillsByCategorySelector } from '../../../store/selectors/jdSkillSelector';
import { resumeSkillListSelector } from '../../../store/selectors/resumeSelector';
import { HiEyeOff } from 'react-icons/hi';

import { FaExclamationCircle, FaEye } from 'react-icons/fa';
import { downloadFile } from '../../../api/s3FileUploadApi';
import { downloadLink } from '../../../utils/reports';


const ResumeRow = ({ resume, index, openIndex, toggleRow }) => {
  const isOpen = openIndex === index;
  const { showSkillPercents, showLabelBadge, showSimilarity, showCompanies } = useSelector(state => state.widgets.flags);
  const { metadata = {}, id } = resume || {};
  const match = useSelector(state => selectSimilarityByResumeId(state, id));
  const labels = useSelector(state => selectLabelsByResumeId(state, id));
  const skillPercent = useSelector(state => selectSkillPercentByResumeId(state, id));
  const companies = useSelector(state => selectCompaniesByResumeId(state, id));
  const enabledDomainQueries = useSelector(state => domainsQueryEnabledSelector(state));

  // skills
  const jdSkillsByCategory = useSelector(state => jdSkillsByCategorySelector(state));
  const resumeSkillsByCategory = useSelector(state => resumeSkillListSelector(state, id));

  const categories = Object.keys(jdSkillsByCategory);
  // console.log(`cateogries key : ${JSON.stringify(jdSkillsByCategory)}`);
  // console.log(`resume cateogries : ${JSON.stringify(resumeSkillsByCategory)}`);

  // Download function
  const handleDownload = async () => {
    // Implement your download logic here.
    // This could involve calling an API or creating a download link for the resume file.
    const url = await downloadFile({
      Bucket: "resume-assets-008971676609",
      Key: id
    })
    downloadLink(url, id);
    console.log('Download clicked for resume ID:', id);
    // Example: window.location.href = `/api/download/${id}`;
  };

  const renderName = () => {
    const name = metadata?.name?.[0];
    if (name) {
      return <>{name}</>;
    }
    if (!id) return <>Unknown File</>;

    const filename = id.split("____").shift() || "Unknown File";

    // Tooltip text for the exclamation mark
    const tooltip = (
      <Tooltip id="tooltip">
        Showing filename as candidate name could not be extracted.
      </Tooltip>
    );

    return (
      <div className='d-flex justify-content-start align-items-center'>
        <div style={{ marginRight: '0.5rem'}}>{filename}</div>
            
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Badge bg="warning" style={{ cursor: 'pointer' }}>
            <FaExclamationCircle />
          </Badge>
        </OverlayTrigger>
      </div>
    );
  };

  return (
    <>
      {/* Flex row */}
      <div className="flex-row" onClick={() => toggleRow(index)}>
        {showSimilarity && (
          <div className="flex-row-item d-flex">
            {isOpen ? <FaEye size={20} className='m-2' /> : <HiEyeOff className='m-2' />}
            {renderName()}
          </div>
        )}
        {showSimilarity && (
          <div className="flex-row-item">
            <Badge bg="primary">{match || 0} %</Badge>
          </div>
        )}
        {showLabelBadge && (
          <div className="flex-row-item">
            {labels?.map(label => (
              <Badge bg="success" key={label} className="me-1">{label}</Badge>
            ))}
          </div>
        )}
        {enabledDomainQueries.includes("front_end") && (
          <div className="flex-row-item">
            <SkillPercentCell value={skillPercent["front_end"] || 0} />
          </div>
        )}
        {enabledDomainQueries.includes("back_end") && (
          <div className="flex-row-item">
            <SkillPercentCell value={skillPercent["back_end"] || 0} />
          </div>
        )}
        {enabledDomainQueries.includes("cloud") && (
          <div className="flex-row-item">
            <SkillPercentCell value={skillPercent["cloud"] || 0} />
          </div>
        )}
        {enabledDomainQueries.includes("devops") && (
          <div className="flex-row-item">
            <SkillPercentCell value={skillPercent["devops"] || 0} />
          </div>
        )}
        {showCompanies && (
          <div className="flex-row-item company-row-item ">
            {companies && companies.length > 0 ? (
              companies.map(company => (
                <Badge bg="info" key={company} className="me-1">{company}</Badge>
              ))
            ) : (
              <Badge bg="warning">Companies not found</Badge>
            )}
          </div>
        )}
      </div>

      {/* Details section, displayed when row is open */}
      {isOpen && (
        <div className="flex-row-details">
          <Card>
            <Card.Header>Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <ResumeCardSummary
                    companies={resume.companies}
                    yoe={resume.yoe}
                    location={resume.location}
                    phone={resume.phone}
                    email={resume.email}
                    id={id}
                  />
                </Col>
                <Col md={12} className="d-flex flex-wrap align-items-start justify-content-center">
                  {categories.map(category => (
                    jdSkillsByCategory[category]?.skills?.length > 0 && (
                      <SkillsList
                        key={category}
                        jdSkills={jdSkillsByCategory[category]?.skills || []}
                        resumeSkills={resumeSkillsByCategory[category]?.skillList || []}
                        category={category}
                        label={jdSkillsByCategory[category]?.label || 'Skill'}
                      />
                    )
                  ))}
                </Col>
              </Row>
              {/* Center the download button */}
              {/* <div className="d-flex justify-content-center mt-3">
                <Button 
                  variant="primary" 
                  onClick={handleDownload}
                >
                  Download Resume
                </Button>
              </div> */}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default ResumeRow;
