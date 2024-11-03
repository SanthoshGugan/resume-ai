import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    // Style variables inside the component
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        color: '#333',
    };

    const iconStyle = {
        color: '#ff6347',
        marginBottom: '1rem',
    };

    const titleStyle = {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        margin: '0.5rem 0',
    };

    const messageStyle = {
        fontSize: '1rem',
        marginBottom: '1.5rem',
        color: '#555',
    };

    const buttonStyle = {
        padding: '0.6rem 1.2rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = '#0056b3';
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = '#007bff';
    };

    return (
        <div style={containerStyle}>
            <FaExclamationTriangle size={70} style={iconStyle} />
            <h1 style={titleStyle}>Oops! Looks like this page is missing.</h1>
            <p style={messageStyle}>
                It seems the page you’re looking for doesn’t exist. Would you like to head back to the homepage?
            </p>
            <button
                style={buttonStyle}
                onClick={() => navigate('/')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;