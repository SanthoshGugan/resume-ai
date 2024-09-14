import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ResumeRow from './ResumeRow';

const ResumeTable = ({ resumes, flags }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    showSkillPercents,
    showLabelBadge,
    showSimilarity
   } = flags;

  const toggleRow = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {showSimilarity && (<th>Candidate Name</th>)}
          {showSkillPercents && (
            <th>Front End</th>
          )} 
          {showSkillPercents && (
            <th>Back End</th>
          )}
        </tr>
      </thead>
      <tbody>
        {resumes.map((resume, index) => (
          <ResumeRow
            key={index}
            resume={resume}
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
