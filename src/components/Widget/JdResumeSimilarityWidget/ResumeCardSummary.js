import React from 'react';
import { useSelector } from 'react-redux';
import { resumeMetadataByIdSelector, resumeSummaryByIdSelector } from '../../../store/selectors/resumeSelector';
import { Card, Col, Row } from 'react-bootstrap';

const ResumeCardSummary = ({ companies = [], yoe, location, phone, email, id }) => {
  const cardStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    backgroundColor: '#fff',
  };

  const summaryBoxStyle = {
    border: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '5px',
    height: '100%',
  };
  const { summary } = useSelector(state => resumeSummaryByIdSelector(state, id));
  // const { name } = useSelector(state => resumeMetadataByIdSelector(state, id));
  return (
    <Card style={cardStyle}>
      <Card.Body>
        {summary}
      </Card.Body>
    </Card>
  );
};

export default ResumeCardSummary;