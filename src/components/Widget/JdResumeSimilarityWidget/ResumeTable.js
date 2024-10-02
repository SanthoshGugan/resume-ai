import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFilePerson, BsBarChart, BsAward, BsBuilding, BsFillQuestionCircleFill } from 'react-icons/bs';
import ResumeRow from './ResumeRow'; // Assuming you will import the ResumeRow here
import "./ResumeTable.css";
import { domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';
import { DomainQueryIcons } from "../../../utils/uiUtils" ;
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
        {showSimilarity && (
          <div className="flex-header-item">
            <BsFilePerson className='mx-2' /> Candidate Name
          </div>
        )}
        {showSimilarity && (
          <div className="flex-header-item">
            <BsBarChart className='mx-2' /> Overall Matching
          </div>
        )}
        {showSimilarity && showLabelBadge && (
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
        {rows.map(({ resume_id = "" }, index) => (
          <ResumeRow
            key={index}
            resume={resumes[resume_id]}
            index={index}
            openIndex={openIndex}
            toggleRow={toggleRow}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTable;