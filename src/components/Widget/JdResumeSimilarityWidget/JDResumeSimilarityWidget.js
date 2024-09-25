import React from 'react';
import { useSelector } from 'react-redux';
import withWidgetWrapper from '../withWidgetWrapper';
import ResumeTable from './ResumeTable';

// JD-Resume Similarity Widget Component
const JdResumeSimilarityWidget = ({ queryResults, resumes }) => {

  // console.log(`queryResults in wrappper:::: ${JSON.stringify(queryResults)}`)
  
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