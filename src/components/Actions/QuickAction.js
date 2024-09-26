import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const QuickAction = ({ isVisible = true, showTick = true, avatarLabel = "Jd", description = "Click to view JD", to }) => {
    const circleStyle = {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#00bfff',  // You can change the color
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    const tickStyle = {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        fontSize: '15px',
        color: 'green',  // Tick mark color
        // backgroundColor: 'white',
        borderRadius: '50%',
        padding: '3px'
    };


    return (
        <>
            {isVisible && (
                // <OverlayTrigger
                //     placement="top"
                //     overlay={
                //         <Tooltip id={`tooltip-top`}>
                //             {description}
                //         </Tooltip>
                //     }
                // >
                    <Link
                        to={to}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div style={circleStyle}>
                            {avatarLabel}
                            {showTick && (
                                <div style={tickStyle}>
                                    <FaCheckCircle color='green' size={20} />
                                </div>
                            )}
                        </div>
                    </Link>
                // </OverlayTrigger>
            )}
        </>
    );
};

export default QuickAction;