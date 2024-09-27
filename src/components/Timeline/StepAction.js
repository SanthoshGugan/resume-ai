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
    marginBottom: '20px',
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

  const tooltip = <Tooltip id={`tooltip-${index}`}>{title}</Tooltip>;

  return (
    <>
      <OverlayTrigger placement="right" overlay={tooltip}>
        <Link to={status === 'disabled' ? '#' : url} onClick={onClick}>
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