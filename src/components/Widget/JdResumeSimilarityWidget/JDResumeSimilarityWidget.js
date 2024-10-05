import React from 'react';
import withWidgetWrapper from '../withWidgetWrapper';
import ResumeTable from './ResumeTable';
import StatusBox from '../../StatusBox/StatusBox';

// JD-Resume Similarity Widget Component
const JdResumeSimilarityWidget = ({ queryResults, resumes }) => {

  if (!queryResults || queryResults.result) {
    return <div>No data available.</div>;
  }

  const { label, jd_resume_similarity } = queryResults;
  const rows = queryResults['jd_resume_similarity']?.result || [];

  return (
    <div className="jd-resume-similarity-widget">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <StatusBox />
      </div>
      <ResumeTable resumes={resumes} rows={rows} />
    </div>
  );
};

// Apply HOC to wrap the component
export default withWidgetWrapper(JdResumeSimilarityWidget, ['jd_resume_similarity', 'label']);
