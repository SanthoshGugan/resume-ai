import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { FaFileCsv } from 'react-icons/fa';
import { downloadCsv } from "../../utils/reports";
import { getResumeIdsForQueries } from "../Widget/wrapperUtils";
import { DOWNLOAD_CSV_HEADER, KEY_DELIMTER } from "../../utils/constants";
import { selectQueryResultsById } from "../../store/selectors/queryResultsByIdsSelector";
import { resumesByIdsSelector } from '../../store/selectors/resumeByIdSelector';
import './DownloadCsv.css'; // Import your custom CSS

const DownloadCsv = () => {
    const [showToast, setShowToast] = useState(false);
    
    const queryIds = ['jd_resume_similarity', 'label'];
    const queryResults = useSelector((state) => selectQueryResultsById(state, queryIds)) || { };
    const resumeIds = getResumeIdsForQueries(queryResults, queryIds);
    const resumes = useSelector((state) => resumesByIdsSelector(state, resumeIds));

    if (!queryResults || queryResults.result) {
        return <div>No data available.</div>;
    }

    const rows = queryResults['jd_resume_similarity']?.result || [];

    const exportRows = rows.map((row) => {
        const resume = resumes[row.resume_id];
        return {
          [DOWNLOAD_CSV_HEADER.CANDIDATE_NAME]: resume.metadata?.name && resume.metadata.name.length > 0 ? resume.metadata.name[0] : 'N/A', // Extract Candidate Name
          [DOWNLOAD_CSV_HEADER.OVERALL_MATCHING]: row.match || 'N/A', // Extract Overall Matching
          [DOWNLOAD_CSV_HEADER.FILENAME]: row.resume_id.split(KEY_DELIMTER)[0] || '' // Extract File Name
        };
    });

    const exportToCSV = () => {
        const headers = [
            DOWNLOAD_CSV_HEADER.CANDIDATE_NAME,
            DOWNLOAD_CSV_HEADER.OVERALL_MATCHING,
            DOWNLOAD_CSV_HEADER.FILENAME
        ]
        downloadCsv(headers, exportRows);
        setShowToast(true); // Show the toast on download success
    };

    return (
        <>
            {rows.length > 0 && (
                <div className="d-flex justify-content-center mb-3">
                    <Button
                        variant="success"
                        onClick={exportToCSV}
                        className="d-flex align-items-center"
                    >
                        <FaFileCsv size={20} className="me-2" />
                        Export to CSV
                    </Button>
                </div>
            )}
            <ToastContainer className="toast-container">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Download</strong>
                    </Toast.Header>
                    <Toast.Body>CSV file downloaded successfully!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default DownloadCsv;
