import React from 'react';
import { useSelector } from 'react-redux';
import { statusSelector } from '../../store/selectors/loaderSelector';

const StatusBox = () => {
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
    // height: '10rem',
    gap: '1rem'
  };
  const statusImageStyle = {
    border: '2px solid gold',           // Golden border
    borderRadius: '10px',               // Smooth finish with rounded corners
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Deep shadow for depth
    padding: '0.5rem',                  // Optional padding for a smoother look
    background: 'linear-gradient(145deg, #ffffff, #e6e6e6)', // Subtle smooth finish effect
  };
  const { message, image } = useSelector(state => statusSelector(state));

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