import React from 'react';
import { useSelector } from 'react-redux';
import withWidgetWrapper from '../withWidgetWrapper';
import ResumeTable from './ResumeTable';

const resumes = [
  {
    name: 'John Doe',
    domain: 'fullstack',
    frontEnd: 80,
    backEnd: 70,
    companies: ['Infosys', 'Capgemini', 'Tekion'],
    yoe: 10,
    location: 'Chennai',
    phone: '123-456-7890',
    email: 'john@example.com',
    frontEndSkills: [
      { name: 'React', inResume: true },
      { name: 'Vue', inResume: true },
      { name: 'Angular', inResume: true },
      { name: 'Ember', inResume: false }
    ],
    backEndSkills: [
      { name: 'Node.js', inResume: true },
      { name: 'Django', inResume: false },
      { name: 'Spring', inResume: true }
    ],
    details: 'John has 5 years of experience in full stack development...'
  },
  {
    name: 'Jane Smith',
    domain: 'frontend',
    frontEnd: 90,
    backEnd: 40,
    companies: ['Google', 'Facebook'],
    yoe: 8,
    location: 'Bangalore',
    phone: '987-654-3210',
    email: 'jane@example.com',
    frontEndSkills: [
      { name: 'React', inResume: true },
      { name: 'Vue', inResume: true },
      { name: 'Angular', inResume: false }
    ],
    backEndSkills: [
      { name: 'Node.js', inResume: false },
      { name: 'Django', inResume: false },
      { name: 'Spring', inResume: false }
    ],
    details: 'Jane specializes in front end development with a strong focus on UX/UI...'
  },
  // Add more resume objects here
];

// JD-Resume Similarity Widget Component
const JdResumeSimilarityWidget = ({ queryResults, resumes }) => {

  console.log(`queryResults in wrappper:::: ${JSON.stringify(queryResults)}`)
  
  if (!queryResults || queryResults.result) {
    return <div>No data available.</div>;
  }

  const { label, jd_resume_similarity } = queryResults;
  return (
    <div className="jd-resume-similarity-widget">
        <ResumeTable resumes={resumes} rows={queryResults['jd_resume_similarity']?.result || []}/>
    </div>
  );
};

// Apply HOC to wrap the component
export default withWidgetWrapper(JdResumeSimilarityWidget, ['jd_resume_similarity', 'label']);