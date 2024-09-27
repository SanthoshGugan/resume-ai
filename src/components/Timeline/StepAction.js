import React from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

const StepAction = ({ step, index, activeStep, onClick }) => {
  const { title, avatar, status, url } = step;

  const backgroundColor =
    status === 'active'
      ? '#FFA500' // Orange for active
      : status === 'completed'
      ? '#28a745' // Green for completed
      : '#6c757d'; // Grey for disabled

  const stepStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    position: 'relative',
    cursor: status === 'disabled' ? 'not-allowed' : 'pointer',
    // marginBottom: '20px',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-10px', // Position the badge at the top left of the circle
    left: '-15px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#007bff', // Blue background for the badge
    color: 'white',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: '60px', // Position it below the circle
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Translucent background
    border: '1px solid #ddd', // Light border
    borderRadius: '5px',
    padding: '5px',
    marginLeft: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow
    color: '#333', // Dark text color
  };

  const tooltip = <Tooltip id={`tooltip-${index}`}>{title}</Tooltip>;

  const overlay = <div style={overlayStyle}><strong>{title}</strong> {/* Bold title */}</div>;

  return (
    <>
      <OverlayTrigger placement="right" overlay={overlay}>
        <Link to={status === 'disabled' ? '#' : url} onClick={onClick} 
                        style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={stepStyle}>
            {status === 'completed' ? <BsCheckCircle /> : avatar}
            <div style={badgeStyle}>{index + 1}</div> {/* Badge with step number */}
          </div>
        </Link>
      </OverlayTrigger>
    </>
  );
};

export default StepAction;