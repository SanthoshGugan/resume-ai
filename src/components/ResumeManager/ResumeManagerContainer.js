// containers/ResumeManagerContainer.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addResume, uploadResume, updateResumeStatus } from '../../store/resumeSlice';

const ResumeManagerContainer = () => {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);

  // Add a list of resumes to the state
  const handleAddResumes = (resumeList) => {
    resumeList.forEach(resume => {
      dispatch(addResume({ resume }));
    });
  };

  // Upload all resumes and update their status
  const handleUploadResumes = () => {
    resumes.allIds.forEach(resumeId => {
      const resume = resumes.byId[resumeId];
      dispatch(uploadResume(resume));  // Trigger upload for each resume
    });
  };

  // Update status of a specific resume (e.g., during processing or matching)
  const handleProcessingStatus = (resumeId, status) => {
    dispatch(updateResumeStatus({ resumeId, statusKey: 'processStatus', statusValue: status }));
  };

  // Example: Once a resume is processed, update its status
  const handleResumeProcessed = (resumeId) => {
    handleProcessingStatus(resumeId, 'processed');
  };

  return (
    <div>
      {/* Trigger to upload resumes */}
      <button onClick={handleUploadResumes}>Upload Resumes</button>

      <ul>
        {resumes.allIds.map(resumeId => {
          const resume = resumes.byId[resumeId];
          return (
            <li key={resumeId}>
              {resume.name} - Upload Status: {resume.uploadStatus}, Process Status: {resume.processStatus}
              {/* Trigger a manual status update */}
              <button onClick={() => handleResumeProcessed(resumeId)}>Mark Processed</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResumeManagerContainer;