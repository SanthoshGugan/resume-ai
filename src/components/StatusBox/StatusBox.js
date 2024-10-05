import React from 'react';
import { useSelector } from 'react-redux';
import { statusSelector } from '../../store/selectors/loaderSelector';

const StatusBox = () => {
  // Get message and image from the state
  const { message, image } = useSelector(state => statusSelector(state));

  // Show nothing if message or image is missing
  if (!message || !image) {
    return null;
  }

  // Status box styles
  const statusBoxStyle = {
    marginTop: "15px",
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "fit-content",
    gap: '1rem'
  };
  
  const statusImageStyle = {
    border: '2px solid gold',           
    borderRadius: '10px',               
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
    padding: '0.5rem',                  
    background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
  };

  return (
    <div style={statusBoxStyle}>
      <p style={{ margin: "0", marginRight: "10px", color: "#0070f3", textAlign: 'center', fontSize: '1.5rem' }}>
        {message}
      </p>
      <div style={statusImageStyle}>
        <img
          src={image}
          alt="loading"
          style={{ width: "7.5rem", height: "7.5rem" }}
        />
      </div>
    </div>
  );
};

export default StatusBox;
