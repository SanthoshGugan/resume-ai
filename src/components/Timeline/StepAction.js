import React from 'react';
import { Link } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { currentStepSelector } from '../../store/selectors/timelineSelector';

const StepAction = ({ step, index, onClick }) => {
  const { title, status, url, id } = step;
  const isActive = useSelector(state => currentStepSelector(state, id));
  
  const backgroundColor = 
    status === 'active'
      ? '#FFA500' // Orange for active
      : status === 'completed'
      ? '#28a745' // Green for completed
      : status === 'enabled' 
      ? '#007bff' // Blue for enabled
      : '#6c757d'; // Grey for disabled

  const stepStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    backgroundColor,
    padding: '10px 20px',
    borderRadius: '25px',
    color: 'white',
    fontSize: '16px',
    fontWeight: status != "disabled" ? 'bolder' : 'normal',
    cursor: status === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: status === 'disabled' && '25%',
    position: 'relative',
    marginBottom: '10px',
    width: '250px',
    transition: 'background-color 0.3s ease',
    ...(isActive && {
      backgroundColor: '#ffc107', // Highlight background if active
      transform: 'scale(1.05)', // Slight enlargement if active
    })
  };

  const badgeNumberStyle = {
    backgroundColor: '#007bff', // Blue for badge
    borderRadius: '50%',
    color: 'white',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    marginRight: '10px',
    ...(isActive && {
      backgroundColor: '#ffc107', // Change badge color if active
    })
  };

  const tickStyle = {
    position: 'absolute',
    right: '15px',
    fontSize: '20px',
    color: '#ffffff',
    display: status === 'completed' ? 'block' : 'none' // Only show tick if completed
  };

  return (
    <Link 
      to={status === 'disabled' ? '#' : url} 
      onClick={onClick} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={stepStyle}>
        <span>{`${index + 1}. ${title}`}</span>
        <BsCheckCircle style={tickStyle}/>
      </div>
    </Link>
  );
};

export default StepAction;