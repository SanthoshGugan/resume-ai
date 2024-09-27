import React from 'react';
import StepAction from './StepAction';
import { useSelector } from 'react-redux';
import { selectSteps } from '../../store/selectors/timelineSelector';

const VerticalTimeline = ({ activeStep }) => {
  // Reverse the steps array to render from bottom to top
  const steps = useSelector(state => selectSteps(state));
  const reversedSteps = [...steps].reverse();

  return (
    <div style={timelineContainerStyle}>
      {reversedSteps.map((step, index) => {
        // Calculate the actual index in the original array
        const originalIndex = steps.length - 1 - index;

        return (
          <React.Fragment key={originalIndex}>
            {/* StepAction renders each step */}
            <StepAction
              step={step}
              index={originalIndex} // Provide the original index
              activeStep={activeStep}
              onClick={() => console.log(`Navigating to step: ${originalIndex}`)}
            />
            {/* Render the connecting dotted line after each step, except after the last step */}
            {index !== reversedSteps.length - 1 && (
              <div style={lineStyle(step.status)}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Container style to start the steps from the bottom
const timelineContainerStyle = {
  position: 'fixed',
  left: '20px',
  bottom: '0px', // Start from the bottom of the viewport
  display: 'flex',
  flexDirection: 'column', // Keep it top-to-bottom, since steps are now reversed
  justifyContent: 'flex-end', // Push the content to the bottom of the container
  alignItems: 'center',
  height: '100vh', // Full viewport height
  paddingBottom: '20px', // Spacing from the bottom of the viewport
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
