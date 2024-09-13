import React from 'react';
import { useSelector } from 'react-redux';
import withWidgetWrapper from '../withWidgetWrapper';

// JD-Resume Similarity Widget Component
const JdResumeSimilarityWidget = ({ queryResults }) => {

  if (!queryResults) {
    return <div>No data available.</div>;
  }

  const { label, jd_resume_similarity } = queryResults;
  return (
    <div className="jd-resume-similarity-widget">
      <h3>JD-Resume Similarity</h3>

      {/* Display JD-Resume similarity scores */}
      <div className="similarity-section">
        {jd_resume_similarity.data.map((similarity, index) => (
          <div key={index} className="similarity-item">
            <p><strong>Resume ID:</strong> {similarity.resumeId}</p>
            <p><strong>Similarity Score:</strong> {similarity.score}</p>
          </div>
        ))}
      </div>

      <h3>Labels</h3>

      {/* Display label data */}
      <div className="label-section">
        {label.data.map((label, index) => (
          <div key={index} className="label-item">
            <p><strong>Label:</strong> {label.labelName}</p>
            <p><strong>Description:</strong> {label.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Apply HOC to wrap the component
export default withWidgetWrapper(JdResumeSimilarityWidget, ['jd_resume_similarity', 'label']);