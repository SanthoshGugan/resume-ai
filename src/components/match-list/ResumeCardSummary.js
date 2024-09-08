import React from 'react';

const ResumeCardSummary = ({ companies, yoe, location, phone, email }) => {
  return (
    <div>
      <strong>Companies Worked:</strong> {companies.join(' | ')} <br />
      <strong>YoE:</strong> {yoe} years <br />
      <strong>Location:</strong> {location} <br />
      <strong>Phone:</strong> {phone} | <strong>Email:</strong> {email}
    </div>
  );
};

export default ResumeCardSummary;