import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ResumeRow from './ResumeRow';
import { useSelector } from 'react-redux';
import { domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';
import { DOMAINS, DOMAIN_ICONS } from '../../../store/reducerUtil/QueryResultUtil';
import './ResumeTable.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ResumeTable = ({ resumes, rows = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    showSkillPercents,
    showSimilarity,
    showCompanies,
    showLabelBadge
  } = useSelector(state => state.widgets.flags);
  const toggleRow = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const enabledDomainQueries = useSelector(state => domainsQueryEnabledSelector(state));
  console.log(`enabled domains`, enabledDomainQueries);

  // console.log(`rows in ResumeTable ::: ${JSON.stringify(rows)}`);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {showSimilarity && (<th className="nowrap"><i className="bi bi-person-circle"></i> Candidate Name</th>)}
          {showSimilarity && (<th className="nowrap"> <i className="bi bi-bar-chart"></i> Overall Matching</th>)}
          {showSimilarity && showLabelBadge && (<th className="nowrap"><i className="bi bi-award"></i> Expertise</th>)}
          {showSkillPercents && DOMAINS.map(domain => (
            (enabledDomainQueries.includes(domain.value) && (<th className="nowrap"> <i className={`bi bi-${DOMAIN_ICONS[domain.value] || 'question-circle'}`}></i> {domain?.label}</th>))
          ))}
          {/* {showSkillPercents && (<th>Front End</th>)}
          {showSkillPercents && (<th>Back End</th>)} */}
          {showCompanies  && (<th><i className="bi bi-building"></i> Companies</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(({resume_id = ""}, index) => (
          <ResumeRow
            key={index}
            resume={resumes[resume_id]}
            index={index}
            openIndex={openIndex}
            toggleRow={toggleRow}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ResumeTable;
