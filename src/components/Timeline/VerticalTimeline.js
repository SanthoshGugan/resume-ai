import React from 'react';
import StepAction from './StepAction';

const VerticalTimeline = ({ steps, activeStep }) => {
  return (
    <div style={timelineContainerStyle}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* StepAction renders each step */}
          <StepAction
            step={step}
            index={index} // Regular order for step index
            activeStep={activeStep}
            onClick={() => console.log(`Navigating to step: ${index}`)}
          />
          {/* Render the connecting dotted line after each step, 
              except after the last step */}
          {index !== steps.length - 1 && (
            <div style={lineStyle(step.status)}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Container style to start the steps from the bottom
const timelineContainerStyle = {
  position: 'fixed',
  left: '20px',
  bottom: '0px', // Ensure the timeline starts from the bottom of the viewport
  display: 'flex',
  flexDirection: 'column', // Normal direction for top-to-bottom layout
  justifyContent: 'flex-end', // Pushes the content to the bottom of the container
  alignItems: 'center',
  height: '100vh', // Full viewport height to allow steps to grow upwards
  paddingBottom: '20px', // Adds some spacing from the bottom of the viewport
};

// Dotted line style, changes color based on status
const lineStyle = (status) => ({
  height: '40px',
  width: '2px',
  backgroundColor: 'transparent',
  borderLeft: `2px dotted ${
    status === 'active'
      ? '#FFA500' // Orange for active
      : status === 'completed'
      ? '#28a745' // Green for completed
      : '#6c757d' // Grey for disabled
  }`,
  margin: '0 auto',
});

export default VerticalTimeline;