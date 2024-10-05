import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaderSelector } from '../../store/selectors/loaderSelector';

const Loader = () => {
    const { isVisible, progress } = useSelector(state => loaderSelector(state));

    const progressBarStyle = {
        height: '4px',
        background: 'linear-gradient(90deg, rgba(0, 51, 153, 0.9), rgba(0, 153, 255, 0.9), rgba(0, 51, 153, 0.9))',
        backgroundSize: '200% 100%',
        backgroundPosition: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        transition: 'width 0.2s ease',
        width: `${progress}%`, // Controlled by the progress prop
        animation: 'moveGradient 1.5s infinite',
      };
      
      // Keyframes for the background animation
      const keyframes = `
      @keyframes moveGradient {
        0% {
          background-position: left;
        }
        100% {
          background-position: right;
        }
      }`;
      
      // Inject the keyframes into the DOM
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return (
    <>
      {isVisible && <div style={progressBarStyle} />}
    </>
  );
};

export default Loader;