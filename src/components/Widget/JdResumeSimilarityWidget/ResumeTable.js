import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ResumeRow from './ResumeRow';
import { useSelector } from 'react-redux';
import { domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';
import { DOMAINS } from '../../../store/reducerUtil/queryResultUtil';

const ResumeTable = ({ resumes, rows = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    showSkillPercents,
    showSimilarity,
    showCompanies
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
          {showSimilarity && (<th>Candidate Name</th>)}
          {showSkillPercents && DOMAINS.map(domain => (
            (enabledDomainQueries.includes(domain.value) && (<th>{domain?.label}</th>))
          ))}
          {/* {showSkillPercents && (<th>Front End</th>)}
          {showSkillPercents && (<th>Back End</th>)} */}
          {showCompanies  && (<th>Companies</th>)}
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
