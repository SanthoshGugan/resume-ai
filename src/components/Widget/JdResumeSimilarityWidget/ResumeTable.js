import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ResumeRow from './ResumeRow';
import { useSelector } from 'react-redux';

const ResumeTable = ({ resumes, rows = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    showSkillPercents,
    showSimilarity
  } = useSelector(state => state.widgets.flags);
  const toggleRow = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // console.log(`rows in ResumeTable ::: ${JSON.stringify(rows)}`);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {showSimilarity && (<th>Candidate Name</th>)}
          {showSkillPercents && (<th>Front End</th>)}
          {showSkillPercents && (<th>Back End</th>)}
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
