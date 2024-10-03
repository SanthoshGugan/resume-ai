import React from 'react';
import { Card } from 'react-bootstrap';
import { FaRedo } from 'react-icons/fa'; // For the refresh icon
import { startOver } from '../../store/thunks/commonThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StartOver = ({ onClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // Inline styles for the card
  const cardStyle = {
    width: '150px',
    height: '75px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ccffcc'
  };

  const iconStyle = {
    // marginTop: '1px',
    fontSize: '24px',
  };

  const handleClick = () => {
    dispatch(startOver());
    navigate('/');
  }

  return (
    <Card style={cardStyle} onClick={handleClick }>
      <Card.Body>
        <Card.Title>Start Over</Card.Title>
        <FaRedo style={iconStyle} />
      </Card.Body>
    </Card>
  );
};

export default StartOver;