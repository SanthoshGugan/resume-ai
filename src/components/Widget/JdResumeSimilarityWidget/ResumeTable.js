import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFilePerson, BsBarChart, BsAward, BsBuilding, BsFillQuestionCircleFill } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import ResumeRow from './ResumeRow'; // Assuming you will import the ResumeRow here
import "./ResumeTable.css";
import { domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';
import { DomainQueryIcons } from "../../../utils/uiUtils";
import { DOMAINS } from '../../../store/reducerUtil/QueryResultUtil';

const ResumeTable = ({ rows = [], resumes }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const { showSkillPercents, showLabelBadge, showSimilarity, showCompanies } = useSelector(state => state.widgets.flags);
  const enabledDomainQueries = useSelector(state => domainsQueryEnabledSelector(state));

  const toggleRow = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-table">
      {/* Header */}
      <div className="flex-table-header">
        {(
          <div className="flex-header-item">
            <BsFilePerson className='mx-2' /> Candidate Name
          </div>
        )}
        {(
          <div className="flex-header-item">
            <BsBarChart className='mx-2' /> Overall Matching
          </div>
        )}
        {(
          <div className="flex-header-item">
            <BsAward className='mx-2' /> Expertise
          </div>
        )}
        {showSkillPercents && DOMAINS.map(domain => (
          enabledDomainQueries.includes(domain.value) &&  
            (<div className="flex-header-item" key={domain.value}>
              {DomainQueryIcons[domain.value] || <BsFillQuestionCircleFill className='mx-2' />} {domain.label}
          </div>)
        ))}
        {showCompanies && (
          <div className="flex-header-item">
            <BsBuilding className='mx-2' /> Companies
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-table-body">
        {
        !showSimilarity ? (
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100px' }}>
            <span className="fw-semibold">Sorting resumes for best fit...</span>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : 
        (
          rows.map(({ resume_id = "" }, index) => (
            <ResumeRow
              key={index}
              resume={resumes[resume_id]}
              index={index}
              openIndex={openIndex}
              toggleRow={toggleRow}
            />
          ))
        )
        }
      </div>
    </div>
  );
};

export default ResumeTable;
