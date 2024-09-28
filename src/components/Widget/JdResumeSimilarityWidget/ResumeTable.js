import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ResumeRow from './ResumeRow';
import { useSelector } from 'react-redux';
import { domainsQueryEnabledSelector } from '../../../store/selectors/queryResultsByIdsSelector';
import { DOMAINS } from '../../../store/reducerUtil/QueryResultUtil';
import './ResumeTable.css';
import { BsBuilding, BsFilePerson, BsBarChart, BsAward, BsFillQuestionCircleFill } from "react-icons/bs";
import { DomainQueryIcons } from "../../../utils/uiUtils" ;

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
          {showSimilarity && (<th className="nowrap"><BsFilePerson/>Candidate Name</th>)}
          {showSimilarity && (<th className="nowrap"><BsBarChart/>Overall Matching</th>)}
          {showSimilarity && showLabelBadge && (<th className="nowrap"><BsAward/>Expertise</th>)}
          {showSkillPercents && DOMAINS.map(domain => (
            (enabledDomainQueries.includes(domain.value) && (<th className="nowrap">{DomainQueryIcons[domain.value] || <BsFillQuestionCircleFill/>}{domain?.label}</th>))
          ))}
          {/* {showSkillPercents && (<th>Front End</th>)}
          {showSkillPercents && (<th>Back End</th>)} */}
          {showCompanies  && (<th><BsBuilding/>Companies</th>)}
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
