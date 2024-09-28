import React from 'react';
import StepAction from './StepAction';
import { useSelector } from 'react-redux';
import { selectSteps } from '../../store/selectors/timelineSelector';

const HorizontalTimeline = ({ activeStep }) => {
  const steps = useSelector(state => selectSteps(state));

  return (
    <div style={timelineContainerStyle}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* StepAction renders each step */}
          <StepAction
            step={step}
            index={index} // Provide the original index
            activeStep={activeStep}
            onClick={() => console.log(`Navigating to step: ${index}`)}
          />
          {/* Render the connecting dotted line after each step, except after the last step */}
          {index !== steps.length - 1 && (
            <div style={lineStyle(step.status)}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Container style for horizontal timeline, fixed at bottom
const timelineContainerStyle = {
  position: 'fixed',
  bottom: '0', // Stick to the bottom of the viewport
  left: '0',   // Stick to the left edge of the viewport
  right: '0',  // Stick to the right edge of the viewport
  display: 'flex',
  flexDirection: 'row', // Horizontal layout
  justifyContent: 'center', // Center the steps horizontally
  alignItems: 'center',
  backgroundColor: 'rgba(240, 240, 240, 0.5)', // Very light greyish white background
  padding: '10px',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)', // Light top border like paper edge
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Light drop shadow
  backdropFilter: 'blur(5px)', // Optional: adds blur effect behind the container
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect

  // Hover styles
  ':hover': {
    backgroundColor: 'rgba(240, 240, 240, 1)', // More solid greyish white on hover
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
  }
};

// Change to opaque on hover
timelineContainerStyle[':hover'] = {
  backgroundColor: 'rgba(255, 255, 255, 1)', // Fully opaque on hover
};

// Dotted line style, changes color based on status
const lineStyle = (status) => ({
  height: '2px', // Thinner line for horizontal layout
  width: '50px', // Length of the connecting line
  backgroundColor: 'transparent',
  borderTop: `2px dotted ${
    status === 'active'
      ? '#FFA500' // Orange for active
      : status === 'completed'
      ? '#28a745' // Green for completed
      : '#6c757d' // Grey for disabled
  }`,
  margin: '0 15px 7px', // Space between steps
});

export default HorizontalTimeline;